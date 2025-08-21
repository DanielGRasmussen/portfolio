import { Component, OnInit, inject } from "@angular/core";
import { ContentService } from "../../content.service";
import { ContactContent } from "../../models/content.interfaces";

import { UrlPipe } from "../../url.pipe";

@Component({
	selector: "app-footer",
	imports: [UrlPipe],
	templateUrl: "./footer.component.html",
	styleUrl: "./footer.component.scss",
})
export class FooterComponent implements OnInit {
	private ContentService = inject(ContentService);

	content!: ContactContent;
	year: number = new Date().getFullYear();

	ngOnInit(): void {
		this.content = this.ContentService.getContent().contact;
	}
}
