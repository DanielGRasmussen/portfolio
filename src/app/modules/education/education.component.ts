import { Component, OnInit } from "@angular/core";
import { EducationContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";
import { TitleService } from "../../title.service";

@Component({
	selector: "app-education",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./education.component.html",
	styleUrl: "./education.component.scss",
})
export class EducationComponent implements OnInit {
	content: EducationContent;

	constructor(
		private ContentService: ContentService,
		private TitleService: TitleService
	) {
		this.content = this.ContentService.getContent().education;
	}

	ngOnInit(): void {
		this.TitleService.setTitle("Education");
	}
}
