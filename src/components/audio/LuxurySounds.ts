class LuxuryAudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  public isMuted: boolean = false;
  private lastPlayTimes: Record<string, number> = {};
  
  // Singleton pattern listeners for state updates
  private listeners: Set<(muted: boolean) => void> = new Set();

  public subscribe(listener: (muted: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isMuted));
  }

  public init = () => {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.updateVolume();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  };

  public toggleMute = () => {
    this.isMuted = !this.isMuted;
    this.updateVolume();
    this.notify();
    return this.isMuted;
  };

  private updateVolume = () => {
    if (this.masterGain) {
      // 20% default volume, 0% when muted
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.2, this.ctx?.currentTime || 0, 0.05);
    }
  };

  private preventOverlap(id: string, cooldown: number): boolean {
    const now = Date.now();
    if (this.lastPlayTimes[id] && now - this.lastPlayTimes[id] < cooldown) {
      return true;
    }
    this.lastPlayTimes[id] = now;
    return false;
  }

  // 1. Hover: Soft luxury click
  public playHover = () => {
    if (this.isMuted || this.preventOverlap('hover', 40)) return;
    this.init();
    this.playTone(800, 'sine', 0.015, 0.005);
  };

  // 2. Configurator: Crown click (distinct metallic dual-tick)
  public playCrown = () => {
    if (this.isMuted || this.preventOverlap('crown', 80)) return;
    this.init();
    this.playTone(1400, 'triangle', 0.02, 0.005);
    setTimeout(() => this.playTone(1800, 'triangle', 0.015, 0.005), 40);
  };

  // 3. Hotspot: Metallic tick
  public playTick = () => {
    if (this.isMuted || this.preventOverlap('tick', 100)) return;
    this.init();
    this.playTone(2500, 'square', 0.03, 0.005, 1000);
  };

  // 4. Buttons: Premium tap (deeper sound)
  public playTap = () => {
    if (this.isMuted || this.preventOverlap('tap', 150)) return;
    this.init();
    this.playTone(300, 'sine', 0.05, 0.01);
  };

  private playTone(freq: number, type: OscillatorType, duration: number, attack = 0.01, highpassFreq?: number) {
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    // Envelope for a crisp click
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    if (highpassFreq) {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = highpassFreq;
      osc.connect(filter);
      filter.connect(gain);
    } else {
      osc.connect(gain);
    }
    
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
}

export const luxurySounds = new LuxuryAudioManager();
