import { Component, OnInit } from "@angular/core";
import { ContentService } from "../../content.service";
import { ContactContent } from "../../models/content.interfaces";
import { NgForOf } from "@angular/common";
import { UrlPipe } from "../../url.pipe";

@Component({
	selector: "app-footer",
	standalone: true,
	imports: [NgForOf, UrlPipe],
	templateUrl: "./footer.component.html",
	styleUrl: "./footer.component.scss",
})
export class FooterComponent implements OnInit {
	content!: ContactContent;
	year: number = new Date().getFullYear();

	constructor(private ContentService: ContentService) {}

	ngOnInit(): void {
		this.content = this.ContentService.getContent().contact;
	}
}
