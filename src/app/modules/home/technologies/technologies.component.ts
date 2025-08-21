import { Component } from "@angular/core";
import { TechnologiesContent } from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";

@Component({
	selector: "app-technologies",
	imports: [],
	templateUrl: "./technologies.component.html",
	styleUrl: "./technologies.component.scss",
})
export class TechnologiesComponent {
	content!: TechnologiesContent;

	constructor(protected ContentService: ContentService) {
		this.content = this.ContentService.getContent().technologies;
	}
}
