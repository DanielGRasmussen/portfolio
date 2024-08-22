import { Component, Input } from "@angular/core";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { NgForOf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
	selector: "app-hamburger",
	standalone: true,
	imports: [ThemeToggleComponent, NgForOf, RouterLinkActive, RouterLink],
	templateUrl: "./hamburger.component.html",
	styleUrl: "./hamburger.component.scss",
})
export class HamburgerComponent {
	@Input() links: { name: string; url: string }[] = [];
	isOpen: boolean = false;

	toggle(): void {
		this.isOpen = !this.isOpen;
	}

	onKeyUp(event: KeyboardEvent): void {
		if (event.key === "Enter") {
			this.toggle();
		}
	}
}
