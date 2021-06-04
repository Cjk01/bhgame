import Bullet from "../Bullet.js";
export default class SinewaveBullet extends Bullet {
	constructor(scene, x, y, texture, A, B, C, D) {
		super(scene, x, y, texture, 0, 0);
		this.amplitude = A || 1;
		this.period = B || 1;
		this.phaseShift = C || 0;
		this.verticalShift = D || 0;
		this.setStepLimit(0);
		this.setStepLimit(360);
	}
	currentSinValue() {
		let A = this.getAmplitude();
		let B = this.getPeriod();
		let C = this.getPhaseShift();
		let D = this.getVerticalShift();
		return A * Math.sin((B * (this.getStepCount() + C) * Math.PI) / 180) + D;
	}
	update() {
		if (this.getStepCount() >= this.getStepLimit()) {
			this.setStepCount(0);
		}
		this.x += this.currentSinValue();
	}
	getAmplitude() {
		return this.amplitude;
	}
	setAmplitude(amp) {
		this.amplitude = amp;
	}
	getPeriod() {
		return this.period;
	}
	setPeriod(period) {
		this.period = period;
	}
	getPhaseShift() {
		return this.phaseShift;
	}
	setPhaseShift(phaseShift) {
		this.phaseShift = phaseShift;
	}
	getVerticalShift() {
		return this.verticalShift;
	}
	setVerticalShift(verticalShift) {
		this.verticalShift = verticalShift;
	}
}
