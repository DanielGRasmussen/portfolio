import { Component, inject, OnInit } from "@angular/core";
import { ProjectItem, ProjectsContent } from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";
import { ActivatedRoute } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { ProjectInfoComponent } from "../project-info/project-info.component";
import { AccordionComponent } from "./acordian/accordion.component";
import { TitleService } from "../../../title.service";
import { ImageViewerComponent } from "./image-viewer/image-viewer.component";

@Component({
	selector: "app-project-view",
	standalone: true,
	imports: [NgForOf, ProjectInfoComponent, AccordionComponent, NgIf, ImageViewerComponent],
	templateUrl: "./project-view.component.html",
	styleUrl: "./project-view.component.scss",
})
export class ProjectViewComponent implements OnInit {
	project!: ProjectItem;
	route: ActivatedRoute = inject(ActivatedRoute);
	id: string;
	images: string[] = [];

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
}
