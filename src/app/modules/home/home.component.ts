import { Component, OnInit } from "@angular/core";
import { HomeContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TitleService } from "../../title.service";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [NgForOf, RouterLink],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
	content!: HomeContent;

	constructor(
		private ContentService: ContentService,
		private TitleService: TitleService
	) {
		this.content = this.ContentService.getContent().home;
	}

	ngOnInit(): void {
		this.TitleService.setTitle("Home");
	}
}
