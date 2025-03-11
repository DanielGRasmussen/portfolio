import { Component, inject, OnInit } from "@angular/core";
import { ProjectItem, ProjectsContent } from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";
import { ActivatedRoute } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { ProjectInfoComponent } from "../project-info/project-info.component";
import { AccordionComponent } from "./acordian/accordion.component";
import { TitleService } from "../../../title.service";

@Component({
	selector: "app-project-view",
	standalone: true,
	imports: [NgForOf, ProjectInfoComponent, AccordionComponent, NgIf],
	templateUrl: "./project-view.component.html",
	styleUrl: "./project-view.component.scss",
})
export class ProjectViewComponent implements OnInit {
	project!: ProjectItem;
	route: ActivatedRoute = inject(ActivatedRoute);
	id: string;
	images: string[] = [];

	currentIndex: number = 0;

	useOverlay: boolean = false;
	closingOverlay: boolean = false;
	overlayClickStarted: boolean = false;

	constructor(
		private ContentService: ContentService,
		private TitleService: TitleService
	) {
		const id: string | null = this.route.snapshot.paramMap.get("id");
		if (!id) {
			// Handle error
			throw new Error("No project ID provided");
		}
		this.id = id;

		const projects: ProjectsContent = this.ContentService.getContent().projects;
		const project: ProjectItem | undefined = projects.items.find(project => project.id === id);

		if (!project) {
			// Handle error
			throw new Error("Project not found");
		}

		this.project = project;
		this.images = project.images;
	}

	ngOnInit(): void {
		this.TitleService.setTitle("Projects - " + this.project.title);
	}

	goToImage(index: number): void {
		if (index < 0 || index >= this.images.length) {
			return;
		}

		this.currentIndex = index;
	}

	nextImage(): void {
		if (this.currentIndex < this.images.length - 1) {
			this.currentIndex++;
		}
	}

	previousImage(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
		}
	}

	getActive(type: "next" | "previous"): boolean {
		if (type === "next") {
			return !(this.currentIndex >= this.images.length - 1);
		}
		return this.currentIndex > 0;
	}

	keybindings(event: KeyboardEvent): void {
		if (!this.useOverlay) {
			return;
		}
		if (event.key === "ArrowRight") {
			this.nextImage();
		} else if (event.key === "ArrowLeft") {
			this.previousImage();
		} else if (event.key === "Escape") {
			this.closeOverlay();
		}
		event.stopPropagation();
		event.preventDefault();
	}

	onOverlayMouseDown(event: MouseEvent): void {
		// Check if the event target is the overlay container itself
		if (event.target === event.currentTarget) {
			this.overlayClickStarted = true;
		}
	}

	onOverlayMouseUp(event: MouseEvent): void {
		// Check that the mouseup is on the overlay and that the click started on the overlay
		if (event.target === event.currentTarget && this.overlayClickStarted) {
			this.closeOverlay();
		}

		this.overlayClickStarted = false;
	}

	openOverlay(): void {
		this.useOverlay = true;
		// Add overlay keybindings
		document.addEventListener("keydown", this.keybindings.bind(this));
	}

	closeOverlay(): void {
		this.closingOverlay = true;
		setTimeout(() => {
			this.useOverlay = false;
			this.closingOverlay = false;
		}, 200);
	}
}
