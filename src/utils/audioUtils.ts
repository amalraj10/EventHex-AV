// Audio utilities for EventHex AV Team
export class AudioManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private dummyAudio: HTMLAudioElement | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeAudioContext();
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512; // Increased for better frequency resolution
      this.analyser.smoothingTimeConstant = 0.3; // Reduced for more responsive animation
      this.analyser.minDecibels = -90;
      this.analyser.maxDecibels = -10;
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  // Get audio frequency data for visualization
  getFrequencyData(): Uint8Array | null {
    if (!this.analyser) return null;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  // Get audio amplitude data for wave animation
  getAmplitudeData(): number[] {
    if (!this.analyser) return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    
    const frequencyData = this.getFrequencyData();
    if (!frequencyData) return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    // Convert frequency data to amplitude data for 10 wave bars
    const amplitudes: number[] = [];
    const chunkSize = Math.floor(frequencyData.length / 10);
    
    for (let i = 0; i < 10; i++) {
      let sum = 0;
      for (let j = 0; j < chunkSize; j++) {
        sum += frequencyData[i * chunkSize + j];
      }
      const average = sum / chunkSize;
      
      // Enhanced normalization with better sensitivity
      // Boost lower frequencies and add some variation
      const boost = i < 3 ? 1.5 : 1.0; // Boost bass frequencies
      const normalized = Math.max(0.3, Math.min(3.0, 0.5 + (average / 255) * 2.5 * boost));
      amplitudes.push(normalized);
    }
    
    return amplitudes;
  }

  // Get time domain data for more responsive wave animation
  getTimeDomainData(): Uint8Array | null {
    if (!this.analyser) return null;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  // Get enhanced amplitude data using both frequency and time domain
  getEnhancedAmplitudeData(): number[] {
    if (!this.analyser) return [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]; // Return flat baseline
    
    const frequencyData = this.getFrequencyData();
    const timeData = this.getTimeDomainData();
    
    if (!frequencyData || !timeData) return [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

    // Calculate overall audio level to detect silence
    let totalAudioLevel = 0;
    let totalTimeLevel = 0;
    
    for (let i = 0; i < frequencyData.length; i++) {
      totalAudioLevel += frequencyData[i];
    }
    
    for (let i = 0; i < timeData.length; i++) {
      totalTimeLevel += Math.abs(timeData[i] - 128);
    }
    
    const avgAudioLevel = totalAudioLevel / frequencyData.length;
    const avgTimeLevel = totalTimeLevel / timeData.length;
    
    // If audio level is very low, return flat baseline (ECG-like behavior)
    if (avgAudioLevel < 3 && avgTimeLevel < 2) { // Lower threshold for better sensitivity
      return [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    }
    
    const amplitudes: number[] = [];
    const chunkSize = Math.floor(frequencyData.length / 10);
    
    for (let i = 0; i < 10; i++) {
      let freqSum = 0;
      let timeSum = 0;
      
      for (let j = 0; j < chunkSize; j++) {
        freqSum += frequencyData[i * chunkSize + j];
        timeSum += Math.abs(timeData[i * chunkSize + j] - 128);
      }
      
      const freqAverage = freqSum / chunkSize;
      const timeAverage = timeSum / chunkSize;
      
      // More aggressive response to audio
      const combined = (freqAverage * 0.6 + timeAverage * 0.4);
      
      // Much more sensitive scaling
      const boost = i < 3 ? 2.5 : 1.2; // Higher boost for bass
      const normalized = Math.max(0.5, Math.min(4.0, 0.5 + (combined / 100) * 3.5 * boost));
      amplitudes.push(normalized);
    }
    
    return amplitudes;
  }

  // Lightweight average level check to detect when voice actually starts
  getAverageLevel(): number {
    if (!this.analyser) return 0;

    const bufferLength = this.analyser.frequencyBinCount;
    const freq = new Uint8Array(bufferLength);
    const time = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(freq);
    this.analyser.getByteTimeDomainData(time);

    let freqSum = 0;
    let timeSum = 0;
    for (let i = 0; i < bufferLength; i++) {
      freqSum += freq[i];
      timeSum += Math.abs(time[i] - 128);
    }
    const freqAvg = freqSum / bufferLength;
    const timeAvg = timeSum / bufferLength;
    return Math.max(freqAvg, timeAvg);
  }

  // Start microphone access for Go Live
  async startMicrophone(): Promise<boolean> {
    try {
      if (!this.audioContext || !this.analyser) {
        await this.initializeAudioContext();
      }

      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      if (this.audioContext && this.analyser) {
        this.microphone = this.audioContext.createMediaStreamSource(this.stream);
        this.microphone.connect(this.analyser);
      }

      return true;
    } catch (error) {
      console.error('Failed to access microphone:', error);
      return false;
    }
  }

  // Stop microphone access
  stopMicrophone() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
  }

  // Play dummy AI audio for Sound Check
  async playDummyAudio(onComplete?: () => void): Promise<boolean> {
    try {
      // Create dummy audio using Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = "Welcome to EventHex, the premier platform for live event management and streaming. Our advanced audio visual technology ensures crystal clear sound quality and seamless user experience. You are now connected to our state-of-the-art AV system. Sound check complete.";
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        
        // Use a more natural voice if available
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Alex')
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        return new Promise((resolve) => {
          utterance.onend = () => {
            onComplete?.(); // Call the completion callback
            resolve(true);
          };
          utterance.onerror = () => {
            onComplete?.(); // Call completion even on error
            resolve(false);
          };
          speechSynthesis.speak(utterance);
        });
      } else {
        // Fallback: create a simple audio element with a tone
        this.createFallbackAudio();
        setTimeout(() => onComplete?.(), 2000); // Call completion after 2 seconds
        return true;
      }
    } catch (error) {
      console.error('Failed to play dummy audio:', error);
      onComplete?.(); // Call completion even on error
      return false;
    }
  }

  // Fallback audio for browsers without speech synthesis
  private createFallbackAudio() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 2);
  }

  // Stop dummy audio
  stopDummyAudio() {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }

  // Check if audio context is ready
  isReady(): boolean {
    return this.isInitialized && this.audioContext !== null;
  }

  // Resume audio context if suspended
  async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Cleanup
  destroy() {
    this.stopMicrophone();
    this.stopDummyAudio();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Singleton instance
export const audioManager = new AudioManager();
