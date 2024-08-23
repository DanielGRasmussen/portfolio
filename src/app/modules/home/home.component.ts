import { Component } from "@angular/core";
import { HomeContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [NgForOf, RouterLink],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {
	content!: HomeContent;

	constructor(private ContentService: ContentService) {
		this.content = this.ContentService.getContent().home;
	}
}
