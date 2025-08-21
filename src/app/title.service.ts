import { Injectable, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
	providedIn: "root",
})
export class TitleService {
	private titleService = inject(Title);

	siteName = "Portfolio";

	setTitle(pageTitle: string): void {
		this.titleService.setTitle(`${pageTitle} | ${this.siteName}`);
	}
}
