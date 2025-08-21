import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	QueryList,
	ViewChildren,
	ViewChild,
	inject,
} from "@angular/core";
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";

import { HamburgerComponent } from "./hamburger/hamburger.component";
import Content, { Links } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { UrlPipe } from "../../url.pipe";
import { LayoutService } from "../../layout.service";

@Component({
	selector: "app-header",
	imports: [ThemeToggleComponent, RouterLink, RouterLinkActive, HamburgerComponent, UrlPipe],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
	private router = inject(Router);
	private ContentService = inject(ContentService);
	private LayoutService = inject(LayoutService);

	@ViewChildren("link") linkElements!: QueryList<ElementRef>;
	@ViewChild("hamburger") hamburger!: HamburgerComponent;
	content: Content;
	activeIndex: number = 0;
	isHidden: boolean = false;
	private previousScrollPosition: number = 0;
	private firstLoad: boolean = true;

	// Creates the links in the header
	links: Links;

	constructor() {
		this.content = this.ContentService.getContent();
		this.links = this.content.links;
	}

	ngOnInit(): void {
		this.updateActiveIndex();
		this.router.events.subscribe(this.updateActiveIndex.bind(this));
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

		return activeElement.offsetHeight - 25 + "px";
	}

	isSubpage(): boolean {
		return this.router.url.split("/").length > 2;
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
			this.LayoutService.setHeaderVisibility(true);
			this.previousScrollPosition = currentScrollPosition;
			return;
		}

		// If the scroll is going up, show the header
		if (currentScrollPosition < this.previousScrollPosition - 10) {
			this.isHidden = false;
			this.LayoutService.setHeaderVisibility(true);
			this.previousScrollPosition = currentScrollPosition;
			return;
		} else if (currentScrollPosition > this.previousScrollPosition + 10) {
			this.isHidden = true;
			this.LayoutService.setHeaderVisibility(false);
			this.previousScrollPosition = currentScrollPosition;
			return;
		}
	}
}
