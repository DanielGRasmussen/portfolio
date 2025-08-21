import { Component, Input, OnInit, inject } from "@angular/core";
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
	protected ContentService = inject(ContentService);
	protected themeService = inject(ThemeService);

	@Input() invertedText: boolean = false;
	content!: Content;

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
