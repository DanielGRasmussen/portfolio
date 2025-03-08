import { Component, HostListener, OnInit } from "@angular/core";
import { ProjectItem, ProjectsContent, TechnologiesItem } from "../../models/content.interfaces";
import { ContentService } from "../../content.service";
import { NgForOf, NgOptimizedImage, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ProjectInfoComponent } from "./project-info/project-info.component";
import { ProjectFilterComponent } from "./project-filter/project-filter.component";

@Component({
	selector: "app-projects",
	standalone: true,
	imports: [
		NgForOf,
		RouterLink,
		NgOptimizedImage,
		FormsModule,
		ProjectInfoComponent,
		NgStyle,
		ProjectFilterComponent,
	],
	templateUrl: "./projects.component.html",
	styleUrl: "./projects.component.scss",
})
export class ProjectsComponent implements OnInit {
	content: ProjectsContent;
	sidebar: boolean = false; // If we should use a sidebar (<1024px)
	types: string[] = [];
	technologies: TechnologiesItem[] = [];

	selectedTypes: string[] = [];
	selectedTechnologies: TechnologiesItem[] = [];

	visibleProjects: ProjectItem[] = [];

	constructor(private ContentService: ContentService) {
		this.content = this.ContentService.getContent().projects;

		this.content.items.forEach(project => {
			if (!this.types.includes(project.projectType)) {
				this.types.push(project.projectType);
			}
			project.technologies.forEach(technology => {
				if (!this.technologies.some(tech => tech.name === technology.name)) {
					this.technologies.push(technology);
				}
			});
		});

		this.visibleProjects = this.content.items;
	}

	ngOnInit(): void {
		this.sidebar = window.innerWidth >= 1024;
	}

	@HostListener("window:resize")
	onWindowResize(): void {
		this.sidebar = window.innerWidth >= 1024;
	}

	typeChange(selectedTypes: string[]): void {
		this.selectedTypes = selectedTypes;
		this.filterProjects();
	}

	technologyChange(selectedTechnologies: TechnologiesItem[]): void {
		this.selectedTechnologies = selectedTechnologies;
		this.filterProjects();
	}

	filterProjects(): void {
		// If no filters are selected, show all projects
		if (this.selectedTypes.length === 0 && this.selectedTechnologies.length === 0) {
			this.visibleProjects = this.content.items;
			return;
		} else if (this.selectedTypes.length === 0) {
			// If no types are selected, show all projects with selected technologies
			this.visibleProjects = this.content.items.filter(project => {
				return project.technologies.some(technology =>
					this.selectedTechnologies.some(
						selectedTechnology => selectedTechnology.name === technology.name
					)
				);
			});
			return;
		} else if (this.selectedTechnologies.length === 0) {
			// If no technologies are selected, show all projects with selected types
			this.visibleProjects = this.content.items.filter(project => {
				return this.selectedTypes.includes(project.projectType);
			});
			return;
		}
		// If both types and technologies are selected, show projects with both
		this.visibleProjects = this.content.items.filter(project => {
			return (
				this.selectedTypes.includes(project.projectType) &&
				project.technologies.some(technology =>
					this.selectedTechnologies.some(
						selectedTechnology => selectedTechnology.name === technology.name
					)
				)
			);
		});
	}
}
