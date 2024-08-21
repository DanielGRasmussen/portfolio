import { Component, HostListener, OnInit } from "@angular/core";
import { ThemeService } from "../../../theme.service";
import { Theme } from "../../../models/theme.type";
import Content from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";

@Component({
	selector: "app-theme-toggle",
	standalone: true,
	imports: [],
	templateUrl: "./theme-toggle.component.html",
	styleUrl: "./theme-toggle.component.scss",
})
export class ThemeToggleComponent implements OnInit {
	content!: Content;

	constructor(
		protected contentService: ContentService,
		protected themeService: ThemeService
	) {}

	ngOnInit(): void {
		this.content = this.contentService.getContent();
	}

	@HostListener("click", ["$event"])
	toggleTheme(event: MouseEvent): void {
		// This prevents the checkbox from automatically toggling, but also prevents it from being called twice.
		// Not sure why it's being called twice, but this fixes it.
		event.preventDefault();
		this.themeService.toggleTheme();
	}

	protected readonly Theme = Theme;
}
