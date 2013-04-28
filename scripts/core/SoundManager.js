SoundManager = {
	//General variables
	offsetVolume: 0.1,
	
	globalMute: false,
	
	audioType: 'ogg',
	
	//Sound Variables
	effectsVolume: 0.15,
	
	sounds: [],
	
	soundsLoaded: [],
	
	context: null,
	
	volumeNode: null,
	
	soundBuffers: {},
	
	soundArrays: {},
	
	counters: {},
	
	//Init Function	
	init: function(){
	
		//Define the type of audio supported.
		var audio =  new Audio();
		
		if (audio.canPlayType('audio/ogg; codecs="vorbis"'))
			this.audioType = 'ogg';
		else
			this.audioType = 'mp3';
		
		//Create AudioContext
		if (typeof AudioContext !== "undefined")
			this.context = new AudioContext();
		else if (typeof webkitAudioContext !== "undefined")
			this.context = new webkitAudioContext();
		else
			console.log('AudioContext not supported. :(');	
	
		//If AudioContext is supported
		if(this.context != null){
			
			//Create a volumeNode of AudioContext
			this.volumeNode = this.context.createGainNode();
			
			this.volumeNode.gain.value = this.effectsVolume;
			
			this.volumeNode.connect(this.context.destination);
		}
		
	},
	
		
	//Preload sounds -DRAFT - Loaded must do this job
	loadSounds: function(soundsArray, timeArray){
		for(var i = 0; i < soundsArray.length; i++)
			this._loadSound(soundsArray[i],timeArray[i]);
	},
	
	//Play sound, if loaded - DRAFT
	playSound: function(src){
		//DRAFT
		if(this.context != null){// return;
		
			var res = this._searchSound(src);
			//DRAFT
			if(res == -1){
				console.log('Not Loaded Yet');
				return;
			}
			
			var source = this.context.createBufferSource();
			source.buffer = this.soundBuffers[this.sounds[res]];
			source.loop = false;
			source.connect(this.volumeNode);
			source.noteOn(0);
		}
		else{
			var res = this._searchSound(src);
			//DRAFT
			if(res == -1){
				console.log('Not Loaded Yet');
				return;
			}
			var counter = this.counters[src];
			var audio = this.soundArrays[src][counter];
			audio.autoplay = false;
			audio.muted = this.globalMute;
			audio.volume = this.effectsVolume;
			audio.play();
			this.counters[src] = (this.counters[src] + 1) % this.soundArrays[src].length;
		}
	},
	
	//Return the index of src in sounds if loaded
	_searchSound: function(src){
		return this.sounds.indexOf(src);
	},
	
	//Send a request - DRAFT
	_sendXMLHttpRequest: function(src){
		var request = new XMLHttpRequest();
		request.open('GET', src + '.' + this.audioType, true);
		request.responseType = 'arraybuffer';
		request.addEventListener('load',SoundManager._functionCreateSounds, false);
		request.send();
	},
	
	//Function when the sound loads
	_functionCreateSounds: function(event){
		var request = event.target;
		var buffer = SoundManager.context.createBuffer(request.response, false);
		SoundManager.soundBuffers[src] = buffer;
		SoundManager.sounds.push(src);
		SoundManager.soundsLoaded.push(true);		
	},
	
	//Load the sounds
	_loadSound: function(src, sps){ //sps = Sounds per second
		if(this.context != null){
			this._sendXMLHttpRequest(src);
		}
		else{
			var audio = Loader.load(src + '.' + SoundManager.audioType);
			audio.addEventListener("loadeddata", function(){
				var length = Math.ceil(sps * this.duration);
				var array = new Array(length);
				for(var i = 0; i < length; i++){
					array[i] = Loader.load(src + '.' + SoundManager.audioType);
					array[i].autoplay = false;
					array[i].muted = SoundManager.globalMute;
					array[i].volume = SoundManager.effectsVolume;
				}
				SoundManager.soundArrays[src] = array;
				SoundManager.counters[src] = 0;
				SoundManager.sounds.push(src);
			});
		}
	},
	
	/*   Music Player   */
	
	//Array to hold the links of the music
	srcArray: new Array(),
	
	//The music volume
	musicVolume: 1,
	
	//The primary music
	primaryAudio: new Audio(),
	
	//The secondary (temporary) music
	secondaryAudio: new Audio(),
	
	//Counter for the srcArray
	counter: 0,
	
	//Fade in/out time
	fadeTime: 5,
	
	//If tracks are changing
	nextTrackInProgress: false,
	
	//Set the playlist of the songs
	setMusic: function(srcArray){
		this.srcArray = srcArray;
	},
	
	//Start the playlist, from the beginning.
	startMusic: function(){
		//Set the counter to zero
		this.counter = 0;
		//Start Loading the new track
		this.primaryAudio = Loader.load(this.srcArray[this.counter] + '.' + this.audioType);
		//Set the parameters
		this.primaryAudio.autoplay = false;
		this.primaryAudio.muted = this.globalMute;
		this.primaryAudio.volume = this.musicVolume;
		//Flag that indicates if a track is changing
		this.primaryAudio.next = false;
		//When this audio ends. Set when the track is loaded.
		this.primaryAudio.end = null;
		//Constantly check volume and time to play next track
		this.primaryAudio.addEventListener("timeupdate",function(){
			var d = this.end - this.currentTime;
			var c = this.currentTime;
			if(d <= SoundManager.fadeTime){//Time to start the next song.
				if(d < 0){//If already ended
					this.currentTime = this.duration;
				}
				else{
					//Fade Out
					this.volume = (d / SoundManager.fadeTime) * SoundManager.musicVolume;
					//If not in prccess of changing track.
					if(this.next === false){
						this.next = true;
						SoundManager.nextTrack(); //Change Track
					}
				}
			}
			if(c <= SoundManager.fadeTime)//Fade in
				this.volume = (c / SoundManager.fadeTime) * SoundManager.musicVolume;	
			if(c > SoundManager.fadeTime && d > SoundManager.fadeTime)//Set the volume of music
				this.volume = SoundManager.musicVolume;
		});
		//On end
		this.primaryAudio.addEventListener("ended",function(){
			SoundManager.primaryAudio = SoundManager.secondaryAudio; //Change the secondary track to primary
			SoundManager.secondaryAudio = null; //Set the secondary track a null track
			SoundManager.nextTrackInProgress = false; //Track changed
		});
		//When the music loads, play it.
		this.primaryAudio.addEventListener("loadeddata", function(){
			this.end = this.duration;
			this.play();
		});
	},
	
	//Next track please!
	nextTrack: function(){
		if(SoundManager.nextTrackInProgress === false){
			SoundManager.nextTrackInProgress = true;
			//In order to change whenever we want
			if(!this.primaryAudio.next){
				this.primaryAudio.next = true;
				this.primaryAudio.end = this.primaryAudio.currentTime + SoundManager.fadeTime;
			}
			//Increase the counter
			this.counter = (this.counter + 1) % this.srcArray.length;
			//Start Loading the new track
			this.secondaryAudio = Loader.load(this.srcArray[this.counter] + '.' + this.audioType);
			//Set the parameters
			this.secondaryAudio.autoplay = false;
			this.secondaryAudio.muted = this.globalMute;
			this.secondaryAudio.volume = this.musicVolume;
			//Flag that indicates if a track is changing
			this.secondaryAudio.next = false;
			//When this audio ends. Set when the track is loaded.
			this.secondaryAudio.end = null;
			//Constantly check volume and time to play next track
			this.secondaryAudio.addEventListener("timeupdate",function(){
				var d = this.end - this.currentTime;
				var c = this.currentTime;
				if(d <= SoundManager.fadeTime){//Time to start the next song.
					if(d < 0){//If already ended
						this.currentTime = this.duration;
					}
					else{
						//Fade Out
						this.volume = (d / SoundManager.fadeTime) * SoundManager.musicVolume;
						//If not in prccess of changing track.
						if(this.next === false){
							this.next = true;
							SoundManager.nextTrack(); //Change Track
						}
					}
				}
				if(c <= SoundManager.fadeTime)//Fade in
					this.volume = (c / SoundManager.fadeTime) * SoundManager.musicVolume;	
				if(c > SoundManager.fadeTime && d > SoundManager.fadeTime)//Set the volume of music
					this.volume = SoundManager.musicVolume;
			});
			//On end
			this.secondaryAudio.addEventListener("ended",function(){
				SoundManager.primaryAudio = SoundManager.secondaryAudio; //Change the secondary track to primary
				SoundManager.secondaryAudio = null; //Set the secondary track a null track
				SoundManager.nextTrackInProgress = false; //Track changed
			});
			//When the music loads, play it.
			this.secondaryAudio.addEventListener("loadeddata", function(){
				this.end = this.duration;
				this.play();
			});
		}
	},
	
	disableSound: function(){
		try{
			//Stop the primary music
			SoundManager.primaryAudio.pause();
			SoundManager.primaryAudio.src = "";
			//Stop the secondary music
			SoundManager.secondaryAudio.pause();
			SoundManager.secondaryAudio.src = "";
			console.log('Music Didabled :(');
		}
		catch(e){
		}
	},
	
	//Play the music
	playMusic: function(){
		this.primaryAudio.play();	
	},
	
	//Volume up the effects
	volumeUpEffects: function(){
		if(this.effectsVolume + this.offsetVolume <= 1)
			this.volumeNode.gain.value += this.offsetVolume ;
		else
			this.volumeNode.gain.value = 1;	
	},
	
	//Volume down the effects
	volumeDownEffects: function(){
		if(this.effectsVolume - this.offsetVolume >=0)
			this.volumeNode.gain.value -= this.offsetVolume;
		else
			this.volumeNode.gain.value = 0;
	},
	
	//Volume up the music
	volumeUpMusic: function(){
		if(this.musicVolume + this.offsetVolume <= 1)
			this.musicVolume += this.offsetVolume;
		else
			this.musicVolume = 1;
		this.primaryAudio.volume = this.musicVolume;	
	},
	
	//Volume down the music
	volumeDownMusic: function(){
		if(this.musicVolume - this.offsetVolume >=0)
			this.musicVolume -= this.offsetVolume;
		else
			this.musicVolume = 0;
		this.primaryAudio.volume = this.musicVolume;	
	},
	
	//Mute the sound
	muteAll: function(){
		this.volumeNode.gain.value = 0;
		this.primaryAudio.muted = true;
	},
	
	//Unmute the sound
	umuteAll: function(){
		this.volumeNode.gain.value = this.effectsVolume;
		this.primaryAudio.muted = false;
	},
	
	//Optional functions
	
	//Global volume up
	globalVolumeUp: function(){
		this.volumeUpMusic();
		this.volumeUpEffects();
	},
	
	//Global volume down
	globalVolumeUp: function(){
		this.volumeUpMusic();
		this.volumeUpEffects();
	},
	
	//Effects volume
	volumeEffects: function(){
		return Math.floor(this.effectsVolume * 100);
	},
	
	//Music volume
	volumeMusic: function(){
		return Math.floor(this.volumeMusic * 100);
	},
	
	//Global volume
	globalVolume: function(){
		var diff = Math.abs(this.effectsVolume - this.volumeMusic);
		diff = Math.floor(diff * 100);	
		
		if(diff == 0) 
			return Math.floor(this.volumeMusic * 100);
		else
			return  Math.floor((this.effectsVolume + this.volumeMusic) * 100 / 2);
	},
	
	//Supported audio type
	soundType: function(){
		return this.audioType;
	}	
}
//Draft
SoundManager.init();
SoundManager.loadSounds(['sounds/die', 'sounds/transition'], [2, 3]);
SoundManager.setMusic(['sounds/Nature_Dreams', 'sounds/New_World_Order']);
SoundManager.startMusic();
//SoundManager.playMusic();