import { Component } from "@angular/core";
import { EducationContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";

@Component({
	selector: "app-education",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./education.component.html",
	styleUrl: "./education.component.scss",
})
export class EducationComponent {
	content: EducationContent;

	constructor(private ContentService: ContentService) {
		this.content = this.ContentService.getContent().education;
	}
}
