import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
	providedIn: "root",
})
export class TitleService {
	siteName = "Portfolio";

	constructor(private titleService: Title) {}

	setTitle(pageTitle: string): void {
		this.titleService.setTitle(`${pageTitle} | ${this.siteName}`);
	}
}
