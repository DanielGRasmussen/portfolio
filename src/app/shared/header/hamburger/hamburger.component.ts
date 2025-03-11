import { Component } from "@angular/core";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { NgForOf } from "@angular/common";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Links } from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";
import { filter } from "rxjs";

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

	constructor(
		private ContentService: ContentService,
		private router: Router
	) {
		this.links = this.ContentService.getContent().links;

		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
			// If the window is bigger than 840px, close the hamburger menu
			if (window.innerWidth > 840) {
				this.isOpen = false;
			}
		});
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
