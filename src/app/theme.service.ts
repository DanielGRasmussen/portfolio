import { Injectable } from "@angular/core";
import { Theme } from "./models/theme.type";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	theme: Theme = Theme.LIGHT;

	constructor() {
		this.theme = this.#getThemePreference();
		this.#setTheme();
	}

	toggleTheme(): void {
		this.theme = this.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
		localStorage.setItem("theme", this.theme);
		this.#setTheme();
	}

	#getThemePreference(): Theme {
		// Check local storage
		const theme: string | null = localStorage.getItem("theme");
		if (theme && (theme === Theme.DARK || theme === Theme.LIGHT)) {
			return theme as Theme;
		}

		// Check user preference
		const prefersDark: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
		return prefersDark.matches ? Theme.DARK : Theme.LIGHT;
	}

	#setTheme(): void {
		document.body.classList.toggle("theme-dark", this.theme === Theme.DARK);
		document.body.classList.toggle("theme-light", this.theme === Theme.LIGHT);
	}
}
