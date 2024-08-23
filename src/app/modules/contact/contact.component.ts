import { Component } from "@angular/core";
import { ContactContent } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";
import { UrlPipe } from "../../url.pipe";

@Component({
	selector: "app-contact",
	standalone: true,
	imports: [NgForOf, UrlPipe],
	templateUrl: "./contact.component.html",
	styleUrl: "./contact.component.scss",
})
export class ContactComponent {
	content: ContactContent;

	constructor(private ContentService: ContentService) {
		this.content = this.ContentService.getContent().contact;
	}
}
