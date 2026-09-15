/**
 * A very quiet generative pad. Four detuned voices through a slow-moving
 * lowpass and a long delay. No percussion, no transition stings — the only
 * thing that changes as you move through the chapters is the root note.
 *
 * Peak master gain is 0.11, which sits well under a music track. It is off
 * by default and only ever starts from a user gesture.
 */

type Voice = { osc: OscillatorNode; ratio: number };

class Ambient {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private delay: DelayNode | null = null;
  private voices: Voice[] = [];
  private bellTimer: number | null = null;
  private root = 110;

  enabled = false;

  private build() {
    if (this.ctx) return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;

    const ctx = new AC();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.master = master;

    // long, soft space
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.72;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;
    const wet = ctx.createGain();
    wet.gain.value = 0.26;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(master);
    this.delay = delay;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    filter.Q.value = 0.4;
    filter.connect(master);
    filter.connect(delay);

    // slow filter drift so the pad breathes instead of sitting still
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.03;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 150;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    [1, 1.5, 2.005, 2.997].forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = this.root * ratio;
      osc.detune.value = (i - 1.5) * 5;
      const gain = ctx.createGain();
      gain.gain.value = i === 0 ? 0.13 : 0.05;
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.voices.push({ osc, ratio });
    });

    this.scheduleBell();
  }

  /** One soft bell every 14–26 seconds. Sparse on purpose. */
  private scheduleBell() {
    if (this.bellTimer) window.clearTimeout(this.bellTimer);
    this.bellTimer = window.setTimeout(() => {
      if (this.enabled && this.ctx && this.master && this.delay) {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.value =
          this.root * [4, 5, 6][Math.floor(Math.random() * 3)];
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.022, t + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 4.5);
        osc.connect(gain);
        gain.connect(this.delay);
        osc.start(t);
        osc.stop(t + 4.6);
      }
      this.scheduleBell();
    }, 14000 + Math.random() * 12000);
  }

  /** Move the pad to a new root. Slow enough that you feel it, not hear it. */
  setRoot(root: number) {
    this.root = root;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.voices.forEach((v) => {
      v.osc.frequency.cancelScheduledValues(t);
      v.osc.frequency.linearRampToValueAtTime(root * v.ratio, t + 2.6);
    });
  }

  toggle(): boolean {
    this.build();
    if (!this.ctx || !this.master) return false;
    void this.ctx.resume();
    this.enabled = !this.enabled;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(this.enabled ? 0.11 : 0, t + 1.6);
    return this.enabled;
  }

  dispose() {
    if (this.bellTimer) window.clearTimeout(this.bellTimer);
    this.voices.forEach((v) => {
      try {
        v.osc.stop();
      } catch {
        /* already stopped */
      }
    });
    this.voices = [];
    void this.ctx?.close();
    this.ctx = null;
    this.enabled = false;
  }
}

export const ambient = new Ambient();
