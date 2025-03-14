import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { ProjectInfoComponent } from "../../projects/project-info/project-info.component";
import { ProjectItem, ProjectsContent } from "../../../models/content.interfaces";
import { ContentService } from "../../../content.service";

@Component({
	selector: "app-featured-project",
	standalone: true,
	imports: [ProjectInfoComponent],
	templateUrl: "./featured-project.component.html",
	styleUrl: "./featured-project.component.scss",
})
export class FeaturedProjectComponent implements AfterViewInit {
	content!: ProjectsContent;
	featuredProject: ProjectItem;

	@ViewChild("featuredProjectInfo") projectInfo!: ElementRef<HTMLDivElement>;
	@ViewChild("featuredProjectDescription") projectDescription!: ElementRef<HTMLDivElement>;

	constructor(protected ContentService: ContentService) {
		this.content = this.ContentService.getContent().projects;
		this.featuredProject = this.content.items.find(project => project.featured)!;
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.updateProjectInfoHeight();
		}, 0);
		setTimeout(() => {
			this.updateProjectInfoHeight();
		}, 50);
	}

	@HostListener("window:resize", ["$event"])
	updateProjectInfoHeight(): void {
		if (this.projectInfo && this.projectDescription) {
			this.projectDescription.nativeElement.style.maxHeight =
				this.projectInfo.nativeElement.offsetHeight + "px";
		}
	}
}
