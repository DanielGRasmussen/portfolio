import { Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { NgForOf } from "@angular/common";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [ThemeToggleComponent, RouterLink, NgForOf, RouterLinkActive],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
	@ViewChildren("link") linkElements!: QueryList<ElementRef>;

	links: { name: string; url: string }[] = [
		{ name: "Home", url: "/home" },
		{ name: "Projects", url: "/projects" },
		{ name: "Education", url: "/education" },
		{ name: "Technologies", url: "/technologies" },
		{ name: "Contact Info", url: "/contact" },
	];

	activeIndex: number = 0;

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.updateActiveIndex();
		this.router.events.subscribe(this.updateActiveIndex.bind(this));
	}

	updateActiveIndex(): void {
		this.activeIndex = this.links.findIndex(link => this.router.url.startsWith(link.url));
	}

	getUnderlineOffset(): string {
		if (!this.linkElements || this.linkElements.length === 0) return "0";
		const activeElement = this.linkElements.toArray()[this.activeIndex].nativeElement;
		// Get offset from left of the active element with left padding of the element
		const style: CSSStyleDeclaration = window.getComputedStyle(activeElement);
		const offset = activeElement.offsetLeft + parseFloat(style.paddingLeft);
		return offset + "px";
	}

	getUnderlineWidth(): string {
		if (!this.linkElements || this.linkElements.length === 0) return "0";
		const activeElement = this.linkElements.toArray()[this.activeIndex].nativeElement;
		// Get width without padding
		const style: CSSStyleDeclaration = window.getComputedStyle(activeElement);
		const width: number =
			activeElement.offsetWidth -
			parseFloat(style.paddingLeft) -
			parseFloat(style.paddingRight);
		return width + "px";
	}

	getUnderlineBottom(): string {
		if (!this.linkElements || this.linkElements.length === 0) return "0";
		const activeElement = this.linkElements.toArray()[this.activeIndex].nativeElement;
		return activeElement.offsetHeight - 34 + "px";
	}
}
