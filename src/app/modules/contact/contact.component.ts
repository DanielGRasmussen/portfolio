import { Component, OnInit } from "@angular/core";
import { ContactContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";
import { UrlPipe } from "../../url.pipe";
import { TitleService } from "../../title.service";

@Component({
	selector: "app-contact",
	standalone: true,
	imports: [NgForOf, UrlPipe],
	templateUrl: "./contact.component.html",
	styleUrl: "./contact.component.scss",
})
export class ContactComponent implements OnInit {
	content: ContactContent;

	constructor(
		private ContentService: ContentService,
		private TitleService: TitleService
	) {
		this.content = this.ContentService.getContent().contact;
	}

	ngOnInit(): void {
		this.TitleService.setTitle("Contacts");
	}
}
