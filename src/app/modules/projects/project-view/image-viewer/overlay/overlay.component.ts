import { Component, Input } from "@angular/core";

@Component({
	selector: "app-overlay",
	standalone: true,
	imports: [],
	templateUrl: "./overlay.component.html",
	styleUrl: "./overlay.component.scss",
})
export class OverlayComponent {
	@Input() nextImage: () => void = () => {};
	@Input() previousImage: () => void = () => {};
	@Input() images: string[] = [];
	@Input() activeIndex: number = 0;

	useOverlay: boolean = false;
	closingOverlay: boolean = false;
	overlayClickStarted: boolean = false;

	listener: (event: KeyboardEvent) => void = this.keybindings.bind(this);

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

	public openOverlay(): void {
		this.useOverlay = true;

		// Add overlay keybindings
		document.addEventListener("keydown", this.listener);
	}

	closeOverlay(): void {
		this.closingOverlay = true;
		setTimeout(() => {
			this.useOverlay = false;
			this.closingOverlay = false;
		}, 200);

		// Remove overlay keybindings
		document.removeEventListener("keydown", this.listener);
	}
}
