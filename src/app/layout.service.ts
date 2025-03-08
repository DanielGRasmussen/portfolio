import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LayoutService {
	private isHeaderVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	isHeaderVisible$: Observable<boolean> = this.isHeaderVisible.asObservable();

	private footerOffset: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	footerOffset$: Observable<number> = this.footerOffset.asObservable();

	constructor() {
		window.addEventListener("scroll", () => this.calculateFooterOffset());
		window.addEventListener("resize", () => this.calculateFooterOffset());
		this.calculateFooterOffset();
	}

	setHeaderVisibility(isVisible: boolean): void {
		this.isHeaderVisible.next(isVisible);
	}

	calculateFooterOffset(): void {
		const footer = document.querySelector("footer");
		if (footer) {
			const footerRect = footer.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			// Calculate the visible height of the footer
			const visibleHeight = Math.max(0, viewportHeight - footerRect.top);

			this.footerOffset.next(visibleHeight);
		}
		console.log("Footer offset: ", this.footerOffset.value);
	}

	getFooterOffset(): number {
		return this.footerOffset.value;
	}
}
