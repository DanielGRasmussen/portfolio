import { Component, Input } from "@angular/core";

import { ProjectItem } from "../../../models/content.interfaces";

@Component({
	selector: "app-project-info",
	imports: [],
	templateUrl: "./project-info.component.html",
	styleUrl: "./project-info.component.scss",
})
export class ProjectInfoComponent {
	@Input() project!: ProjectItem;
}
