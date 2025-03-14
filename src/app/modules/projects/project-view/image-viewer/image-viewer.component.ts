import { Component, HostListener, Input, OnInit, ViewChild } from "@angular/core";
import { NgForOf, NgIf } from "@angular/common";
import { OverlayComponent } from "./overlay/overlay.component";

@Component({
	selector: "app-image-viewer",
	standalone: true,
	imports: [NgForOf, NgIf, OverlayComponent],
	templateUrl: "./image-viewer.component.html",
	styleUrl: "./image-viewer.component.scss",
})
export class ImageViewerComponent implements OnInit {
	@Input() images: string[] = [];
	activeIndex: number = 0;
	startX: number = 0;
	isMobile: boolean = false;
	touchStartTime: number = 0;
	touchEndTime: number = 0;

	@ViewChild(OverlayComponent) overlayComponent!: OverlayComponent;

	ngOnInit() {
		this.checkIfMobile();
	}

	@HostListener("window:resize")
	checkIfMobile() {
		this.isMobile = window.innerWidth < 768;
	}

	goToImage(index: number): void {
		if (index >= 0 && index < this.images.length) {
			this.activeIndex = index;
		}
	}

	nextImage(event: MouseEvent | null = null): void {
		if (event) {
			event.stopPropagation();
		}
		if (this.activeIndex < this.images.length - 1) {
			this.activeIndex++;
		}
	}

	previousImage(event: MouseEvent | null = null): void {
		if (event) {
			event.stopPropagation();
		}
		if (this.activeIndex > 0) {
			this.activeIndex--;
		}
	}

	onTouchStart(event: TouchEvent): void {
		this.startX = event.touches[0].clientX;
		this.touchStartTime = new Date().getTime();
	}

	onTouchMove(event: TouchEvent): void {
		event.preventDefault(); // Prevent scrolling while swiping
	}

	onTouchEnd(event: TouchEvent): void {
		const endX = event.changedTouches[0].clientX;
		const diffX = this.startX - endX;
		this.touchEndTime = new Date().getTime();

		// Check if it was a swipe (fast enough and far enough)
		const touchDuration = this.touchEndTime - this.touchStartTime;

		if (touchDuration < 500) {
			if (diffX > 30) {
				this.nextImage();
			} else if (diffX < -30) {
				this.previousImage();
			}
		}
	}

	trackByFn(index: number): number {
		return index;
	}
}
