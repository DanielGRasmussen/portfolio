import { Component, Input } from "@angular/core";
import { NgForOf } from "@angular/common";

@Component({
	selector: "app-image-viewer",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./image-viewer.component.html",
	styleUrl: "./image-viewer.component.scss",
})
export class ImageViewerComponent {
	@Input() images: string[] = [];
	currentIndex: number = 0;

	useOverlay: boolean = false;
	closingOverlay: boolean = false;
	overlayClickStarted: boolean = false;

	goToImage(index: number): void {
		if (index < 0 || index >= this.images.length) {
			return;
		}

		this.currentIndex = index;
	}

	nextImage(): void {
		if (this.currentIndex < this.images.length - 1) {
			this.currentIndex++;
		}
	}

	previousImage(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
		}
	}

	getActive(type: "next" | "previous"): boolean {
		if (type === "next") {
			return !(this.currentIndex >= this.images.length - 1);
		}
		return this.currentIndex > 0;
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
