// Music Player JavaScript

class MusicPlayer {
    constructor() {
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isAutoplay = true;
        
        // Sample playlist (in real app, these would be actual audio files)
        this.playlist = [
            {
                title: "Demo Song",
                artist: "Demo Artist",
                duration: 225, // 3:45 in seconds
                emoji: "🎵"
            },
            {
                title: "Another Track", 
                artist: "Another Artist",
                duration: 198, // 3:18 in seconds
                emoji: "🎶"
            },
            {
                title: "Third Song",
                artist: "Third Artist", 
                duration: 267, // 4:27 in seconds
                emoji: "🎤"
            }
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.loadSong(0);
        this.simulateProgress();
    }
    
    initializeElements() {
        // Get DOM elements
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progress = document.getElementById('progress');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.songTitle = document.getElementById('songTitle');
        this.artistName = document.getElementById('artistName');
        this.albumArt = document.getElementById('albumArt');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeDisplay = document.getElementById('volumeDisplay');
        this.playlistItems = document.querySelectorAll('.playlist-item');
    }
    
    bindEvents() {
        // Control buttons
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        
        // Progress bar
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        
        // Volume control
        this.volumeSlider.addEventListener('input', (e) => this.changeVolume(e));
        
        // Playlist items
        this.playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => this.loadSong(index));
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    loadSong(index) {
        this.currentSongIndex = index;
        const song = this.playlist[index];
        
        // Update UI
        this.songTitle.textContent = song.title;
        this.artistName.textContent = song.artist;
        this.albumArt.textContent = song.emoji;
        this.durationEl.textContent = this.formatTime(song.duration);
        
        // Update playlist active state
        this.playlistItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Reset progress
        this.currentTime = 0;
        this.updateProgress();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.isPlaying = true;
        this.playBtn.textContent = '⏸️';
        this.albumArt.classList.add('playing');
        
        // In a real app, you would call audioPlayer.play() here
        console.log('Playing:', this.playlist[this.currentSongIndex].title);
    }
    
    pause() {
        this.isPlaying = false;
        this.playBtn.textContent = '▶️';
        this.albumArt.classList.remove('playing');
        
        // In a real app, you would call audioPlayer.pause() here
        console.log('Paused');
    }
    
    previousSong() {
        let newIndex = this.currentSongIndex - 1;
        if (newIndex < 0) {
            newIndex = this.playlist.length - 1;
        }
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    nextSong() {
        let newIndex = this.currentSongIndex + 1;
        if (newIndex >= this.playlist.length) {
            newIndex = 0;
        }
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    seek(e) {
        const clickX = e.offsetX;
        const totalWidth = this.progressBar.offsetWidth;
        const percentage = clickX / totalWidth;
        const song = this.playlist[this.currentSongIndex];
        
        this.currentTime = percentage * song.duration;
        this.updateProgress();
        
        // In a real app, you would set audioPlayer.currentTime here
        console.log('Seeking to:', this.formatTime(this.currentTime));
    }
    
    changeVolume(e) {
        const volume = e.target.value;
        this.volumeDisplay.textContent = volume + '%';
        
        // In a real app, you would set audioPlayer.volume = volume / 100 here
        console.log('Volume changed to:', volume + '%');
    }
    
    updateProgress() {
        const song = this.playlist[this.currentSongIndex];
        const percentage = (this.currentTime / song.duration) * 100;
        
        this.progress.style.width = percentage + '%';
        this.currentTimeEl.textContent = this.formatTime(this.currentTime);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' + secs : secs);
    }
    
    handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlay();
                break;
            case 'ArrowLeft':
                this.previousSong();
                break;
            case 'ArrowRight':
                this.nextSong();
                break;
        }
    }
    
    // Simulate audio progress for demo
    simulateProgress() {
        setInterval(() => {
            if (this.isPlaying) {
                const song = this.playlist[this.currentSongIndex];
                this.currentTime += 1;
                
                if (this.currentTime >= song.duration) {
                    if (this.isAutoplay) {
                        this.nextSong();
                    } else {
                        this.pause();
                        this.currentTime = 0;
                    }
                }
                
                this.updateProgress();
            }
        }, 1000);
    }
}

// Initialize the music player when page loads
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
    
    // Make player globally available for debugging
    window.musicPlayer = player;
});

// Copy code functionality for the demo
function copyCode(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const button = element.parentElement.querySelector('.copy-btn');
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#4299e1';
        }, 2000);
    });
}