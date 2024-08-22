import { Component, OnInit } from "@angular/core";
import Content from "../../models/content.interfaces";
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
export class HomeComponent implements OnInit {
	content!: Content;

	constructor(private contentService: ContentService) {}

	ngOnInit(): void {
		this.content = this.contentService.getContent();
	}
}
