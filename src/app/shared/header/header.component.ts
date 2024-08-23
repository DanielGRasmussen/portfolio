import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	QueryList,
	ViewChildren,
	AfterViewInit,
	ViewChild,
} from "@angular/core";
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { NgForOf } from "@angular/common";
import { HamburgerComponent } from "./hamburger/hamburger.component";
import Content, { Links } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { UrlPipe } from "../../url.pipe";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		ThemeToggleComponent,
		RouterLink,
		NgForOf,
		RouterLinkActive,
		HamburgerComponent,
		UrlPipe,
	],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, AfterViewInit {
	@ViewChildren("link") linkElements!: QueryList<ElementRef>;
	@ViewChild("hamburger") hamburger!: HamburgerComponent;
	content: Content;
	activeIndex: number = 0;
	isHidden: boolean = false;
	useHamburger: boolean = false;
	hamburgerWidth: number = 0;
	private previousScrollPosition: number = 0;
	private firstLoad: boolean = true;

	// Creates the links in the header
	links: Links;

	constructor(
		private router: Router,
		private ContentService: ContentService
	) {
		this.content = this.ContentService.getContent();
		this.links = this.content.links;
	}

	ngOnInit(): void {
		this.updateActiveIndex();
		this.router.events.subscribe(this.updateActiveIndex.bind(this));
	}

	ngAfterViewInit(): void {
		this.onWindowResize();
	}

	// Underline logic
	updateActiveIndex(): void {
		this.activeIndex = this.links.findIndex(link => this.router.url.startsWith(link.url));
	}

	getNativeElement(index: number): HTMLElement | null {
		if (!this.linkElements || this.linkElements.length === 0) return null;
		const element = this.linkElements.toArray()[index];
		return element ? element.nativeElement : null;
	}

	getUnderlineOffset(): string {
		const activeElement: HTMLElement | null = this.getNativeElement(this.activeIndex);
		if (!activeElement) return "0";

		// Get offset from left of the active element with left padding of the element
		const style: CSSStyleDeclaration = window.getComputedStyle(activeElement);
		const offset: number = activeElement.offsetLeft + parseFloat(style.paddingLeft);
		return offset + "px";
	}

	getUnderlineWidth(): string {
		const activeElement: HTMLElement | null = this.getNativeElement(this.activeIndex);
		if (!activeElement) return "0";

		// Get width without padding
		const style: CSSStyleDeclaration = window.getComputedStyle(activeElement);
		const width: number =
			activeElement.offsetWidth -
			parseFloat(style.paddingLeft) -
			parseFloat(style.paddingRight);
		return width + "px";
	}

	getUnderlineBottom(): string {
		const activeElement: HTMLElement | null = this.getNativeElement(this.activeIndex);
		if (!activeElement) return "0";

		return activeElement.offsetHeight - 35 + "px";
	}

	// Sticky logic
	@HostListener("window:scroll")
	handleStickyHeader(): void {
		if (this.hamburger.isOpen) return;

		if (this.firstLoad) {
			this.previousScrollPosition = window.scrollY || document.documentElement.scrollTop;
			this.firstLoad = false;
			return;
		}

		const currentScrollPosition: number = window.scrollY || document.documentElement.scrollTop;

		// Get header height
		const header: HTMLElement | null = document.querySelector("header");
		if (!header) return;
		const headerHeight: number = header.offsetHeight;

		// If the scroll height is less than the header height, show the header
		if (currentScrollPosition < headerHeight) {
			this.isHidden = false;
			this.previousScrollPosition = currentScrollPosition;
			return;
		}

		// If the scroll is going up, show the header
		if (currentScrollPosition < this.previousScrollPosition - 10) {
			this.isHidden = false;
			this.previousScrollPosition = currentScrollPosition;
			return;
		} else if (currentScrollPosition > this.previousScrollPosition + 10) {
			this.isHidden = true;
			this.previousScrollPosition = currentScrollPosition;
			return;
		}
	}

	// Check for if hamburger button should be used
	@HostListener("window:resize")
	onWindowResize(): void {
		if (
			this.useHamburger &&
			this.hamburgerWidth !== 0 &&
			window.innerWidth > this.hamburgerWidth
		) {
			this.useHamburger = false;
			return;
			// While the user may load in on a small screen and 320px -> 321px isn't gonna fix anything, it won't
			// help to check again as they are still display: none.
			// This causes flickering on the hamburger button when resizing from a small screen to a large screen.
		} else if (!this.useHamburger) {
			// Get theme toggle left
			const themeToggle: HTMLElement | null = document.querySelector("app-theme-toggle");
			if (!themeToggle) return;

			const themeToggleLeft: number = themeToggle.getBoundingClientRect().left;

			// Get nav right
			const nav: HTMLElement | null = document.querySelector("nav");
			if (!nav) return;

			const navRight: number = nav.getBoundingClientRect().right;

			// If the nav is within 10 pixels of the theme toggle, activate hamburger
			this.useHamburger = navRight > themeToggleLeft - 10;

			if (this.useHamburger) {
				this.hamburgerWidth = window.innerWidth;
			}
		}
	}
}
