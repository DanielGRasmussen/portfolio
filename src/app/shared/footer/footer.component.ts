import { Component, OnInit } from "@angular/core";
import { ContentService } from "../../content.service";
import Content from "../../models/content.interfaces";
import { NgForOf } from "@angular/common";

@Component({
	selector: "app-footer",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./footer.component.html",
	styleUrl: "./footer.component.scss",
})
export class FooterComponent implements OnInit {
	content!: Content;
	year: number = new Date().getFullYear();

	links: { url: string; class: string; label: string }[] = [];

	constructor(private contentService: ContentService) {}

	ngOnInit(): void {
		this.content = this.contentService.getContent();
		this.links = [
			{ url: `mailto:${this.content.info["email"]}`, class: "email", label: "Email" },
			{ url: this.content.info["linkedin"], class: "linkedin", label: "LinkedIn" },
			{ url: this.content.info["github"], class: "github", label: "GitHub" },
			{ url: this.content.info["resume"], class: "resume", label: "Resume" },
		];
	}
}
