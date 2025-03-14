import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	QueryList,
	ViewChildren,
} from "@angular/core";
import Content, { ProjectItem } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TitleService } from "../../title.service";
import { UrlPipe } from "../../url.pipe";
import { debounceTime, fromEvent, startWith } from "rxjs";
import { TechnologiesComponent } from "./technologies/technologies.component";
import { FeaturedProjectComponent } from "./featured-project/featured-project.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		NgForOf,
		RouterLink,
		TechnologiesComponent,
		UrlPipe,
		TechnologiesComponent,
		FeaturedProjectComponent,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, AfterViewInit {
	content!: Content;
	featuredProject: ProjectItem;

	@ViewChildren("section") sections!: QueryList<ElementRef<HTMLElement>>;
	activeSection: string = "intro";

	constructor(
		private ContentService: ContentService,
		private TitleService: TitleService
	) {
		this.content = this.ContentService.getContent();
		this.featuredProject = this.content.projects.items.find(project => project.featured)!;
	}

	ngOnInit(): void {
		this.TitleService.setTitle("Home");
	}

	ngAfterViewInit(): void {
		fromEvent(window, "scroll")
			.pipe(
				debounceTime(100),
				startWith(null) // Initial check
			)
			.subscribe(() => this.updateActiveSection());
	}

	updateActiveSection(): void {
		const sections: ElementRef<HTMLElement>[] = this.sections.toArray();
		// Get height of the h2 inside so we know the offset to still count it as active
		const introHeight: number = document.querySelector("h2")?.clientHeight ?? 0;

		// Check if the scroll position is within the bounds of each section
		const scrollPosition: number = window.scrollY + introHeight;
		const activeSection: ElementRef<HTMLElement> | undefined = sections.find(section => {
			const sectionTop: number = section.nativeElement.offsetTop - introHeight;
			const sectionBottom: number =
				sectionTop + section.nativeElement.offsetHeight - introHeight;
			return scrollPosition >= sectionTop - 90 && scrollPosition < sectionBottom;
		});

		// Get the anchor element that has the id of the active section
		if (activeSection) {
			const activeAnchor: HTMLAnchorElement | null =
				activeSection.nativeElement.querySelector("a");
			if (activeAnchor) {
				// Set the active section to the id of the anchor element after timeout to avoid ExpressionChangedAfterItHasBeenCheckedError
				setTimeout(() => {
					this.activeSection = activeAnchor.id;
				}, 0);
			}
		} else {
			this.activeSection = "intro";
		}
	}
}
