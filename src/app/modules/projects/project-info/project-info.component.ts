import { Component, Input } from "@angular/core";
import { NgForOf } from "@angular/common";
import { ProjectItem } from "../../../models/content.interfaces";

@Component({
	selector: "app-project-info",
	standalone: true,
	imports: [NgForOf],
	templateUrl: "./project-info.component.html",
	styleUrl: "./project-info.component.scss",
})
export class ProjectInfoComponent {
	@Input() project!: ProjectItem;
}
