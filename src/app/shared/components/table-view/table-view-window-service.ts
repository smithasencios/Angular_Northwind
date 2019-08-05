import { Injectable } from "@angular/core";

@Injectable()
export class WindowService {
	currentWidth: number;

	constructor() {}

	getWindowWidth(): number {
		return this.currentWidth;
	}

	setWindowWidth(width: number): void {
		this.currentWidth = width;
	}
}
