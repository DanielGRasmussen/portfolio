import { Component, Input, OnInit } from "@angular/core";
import { ThemeService } from "../../../theme.service";
import { Theme } from "../../../models/theme.type";
import Content from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";

@Component({
	selector: "app-theme-toggle",
	imports: [],
	templateUrl: "./theme-toggle.component.html",
	styleUrl: "./theme-toggle.component.scss",
})
export class ThemeToggleComponent implements OnInit {
	@Input() invertedText: boolean = false;
	content!: Content;

	constructor(
		protected ContentService: ContentService,
		protected themeService: ThemeService
	) {}

	ngOnInit(): void {
		this.content = this.ContentService.getContent();
	}

	onKeyUp(event: KeyboardEvent): void {
		if (event.key === "Enter") {
			this.themeService.toggleTheme();
		}
	}

	protected readonly Theme = Theme;
}
