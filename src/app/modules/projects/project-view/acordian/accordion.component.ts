import { Component, Input, ElementRef, AfterViewInit } from "@angular/core";

import { DescriptionsItem } from "../../../../models/content.interfaces";

@Component({
	selector: "app-accordion",
	imports: [],
	templateUrl: "./accordion.component.html",
	styleUrl: "./accordion.component.scss",
})
export class AccordionComponent implements AfterViewInit {
	@Input() description!: DescriptionsItem;
	isOpen: boolean = false;
	private contentHeight: number = 0;

	constructor(private elementRef: ElementRef) {}

	ngAfterViewInit(): void {
		// Calculate the height of the content when the component is initialized
		const contentElement = this.elementRef.nativeElement.querySelector(".accordion-content");
		this.contentHeight = contentElement.scrollHeight;
	}

	toggleAccordion(): void {
		this.isOpen = !this.isOpen;

		// Update the max-height dynamically
		const contentElement = this.elementRef.nativeElement.querySelector(".accordion-content");
		if (this.isOpen) {
			contentElement.style.maxHeight = `${this.contentHeight}px`;
		} else {
			contentElement.style.maxHeight = "0";
		}
	}
}
