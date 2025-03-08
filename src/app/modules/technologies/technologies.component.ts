import { Component, OnInit } from "@angular/core";
import { TechnologiesContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";
import { TitleService } from "../../title.service";

@Component({
	selector: "app-technologies",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./technologies.component.html",
	styleUrl: "./technologies.component.scss",
})
export class TechnologiesComponent implements OnInit {
	content!: TechnologiesContent;

	constructor(
		protected ContentService: ContentService,
		private TitleService: TitleService
	) {
		this.content = this.ContentService.getContent().technologies;
	}

	ngOnInit(): void {
		this.TitleService.setTitle("Technologies");
	}
}
