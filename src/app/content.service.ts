import { Injectable } from "@angular/core";
import * as content from "../assets/content.json";
import Content from "./models/content.interfaces";

@Injectable({
	providedIn: "root",
})
export class ContentService {
	content: Content = content;

	constructor() {
		this.setProperties();
	}

	getContent(): Content {
		return content;
	}

	setProperties(): void {
		document.body.style.setProperty("--logo-src", `url(${content.images.logo})`);
		document.body.style.setProperty("--email-src", `url(${content.images.email})`);
		document.body.style.setProperty("--linkedin-src", `url(${content.images.linkedin})`);
		document.body.style.setProperty("--github-src", `url(${content.images.github})`);
		document.body.style.setProperty("--resume-src", `url(${content.images.resume})`);
	}
}
