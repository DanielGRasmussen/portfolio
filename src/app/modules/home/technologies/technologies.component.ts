import { Component, inject } from "@angular/core";
import { TechnologiesContent } from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";

@Component({
	selector: "app-technologies",
	imports: [],
	templateUrl: "./technologies.component.html",
	styleUrl: "./technologies.component.scss",
})
export class TechnologiesComponent {
	protected ContentService = inject(ContentService);

	content!: TechnologiesContent;

	constructor() {
		this.content = this.ContentService.getContent().technologies;
	}
}
