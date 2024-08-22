import { Component, OnInit } from "@angular/core";
import Content, { TechnologiesContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";

@Component({
	selector: "app-technologies",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./technologies.component.html",
	styleUrl: "./technologies.component.scss",
})
export class TechnologiesComponent implements OnInit {
	content!: Content;
	technologies!: TechnologiesContent;

	constructor(protected ContentService: ContentService) {}

	ngOnInit(): void {
		this.content = this.ContentService.getContent();
		this.technologies = this.content.content.technologies;
	}
}
