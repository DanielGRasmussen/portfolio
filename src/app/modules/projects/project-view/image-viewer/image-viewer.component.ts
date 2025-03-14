import { Component, HostListener, Input, OnInit } from "@angular/core";
import { NgForOf, NgIf } from "@angular/common";

@Component({
	selector: "app-image-viewer",
	standalone: true,
	imports: [NgForOf, NgIf],
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

	useOverlay: boolean = false;
	closingOverlay: boolean = false;
	overlayClickStarted: boolean = false;

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
		console.log("Touch start", this.startX);
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

	keybindings(event: KeyboardEvent): void {
		if (!this.useOverlay) {
			return;
		}
		if (event.key === "ArrowRight") {
			this.nextImage();
		} else if (event.key === "ArrowLeft") {
			this.previousImage();
		} else if (event.key === "Escape") {
			this.closeOverlay();
		}
		event.stopPropagation();
		event.preventDefault();
	}

	onOverlayMouseDown(event: MouseEvent): void {
		// Check if the event target is the overlay container itself
		if (event.target === event.currentTarget) {
			this.overlayClickStarted = true;
		}
	}

	onOverlayMouseUp(event: MouseEvent): void {
		// Check that the mouseup is on the overlay and that the click started on the overlay
		if (event.target === event.currentTarget && this.overlayClickStarted) {
			this.closeOverlay();
		}

		this.overlayClickStarted = false;
	}

	openOverlay(): void {
		this.useOverlay = true;
		// Add overlay keybindings
		document.addEventListener("keydown", this.keybindings.bind(this));
	}

	closeOverlay(): void {
		this.closingOverlay = true;
		setTimeout(() => {
			this.useOverlay = false;
			this.closingOverlay = false;
		}, 200);
	}
}
