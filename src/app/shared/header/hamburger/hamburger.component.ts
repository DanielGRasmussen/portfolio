import { Component } from "@angular/core";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { NgForOf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Links } from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";

@Component({
	selector: "app-hamburger",
	standalone: true,
	imports: [ThemeToggleComponent, NgForOf, RouterLinkActive, RouterLink],
	templateUrl: "./hamburger.component.html",
	styleUrl: "./hamburger.component.scss",
})
export class HamburgerComponent {
	links: Links;
	isOpen: boolean = false;

	constructor(private ContentService: ContentService) {
		this.links = this.ContentService.getContent().links;
	}

	toggle(): void {
		this.isOpen = !this.isOpen;
	}

	onKeyUp(event: KeyboardEvent): void {
		if (event.key === "Enter") {
			this.toggle();
		}
	}
}
