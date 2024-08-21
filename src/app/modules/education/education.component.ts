import { Component, OnInit } from "@angular/core";
import Content, { EducationContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";

@Component({
	selector: "app-education",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./education.component.html",
	styleUrl: "./education.component.scss",
})
export class EducationComponent implements OnInit {
	content!: Content;
	education!: EducationContent;

	constructor(private contentService: ContentService) {}

	ngOnInit(): void {
		this.content = this.contentService.getContent();
		this.education = this.content.content.education;
	}
}
