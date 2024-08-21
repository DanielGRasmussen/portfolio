import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	QueryList,
	ViewChildren,
} from "@angular/core";
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
	activeIndex: number = 0;
	isHidden: boolean = false;
	private previousScrollPosition: number = 0;

	// Creates the links in the header
	links: { name: string; url: string }[] = [
		{ name: "Home", url: "/home" },
		{ name: "Projects", url: "/projects" },
		{ name: "Education", url: "/education" },
		{ name: "Technologies", url: "/technologies" },
		{ name: "Contact Info", url: "/contact" },
	];

	constructor(private router: Router) {}

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

		return activeElement.offsetHeight - 34 + "px";
	}

	// Sticky logic
	@HostListener("window:scroll")
	onWindowScroll(): void {
		this.handleStickyHeader();
	}

	handleStickyHeader(): void {
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
}
