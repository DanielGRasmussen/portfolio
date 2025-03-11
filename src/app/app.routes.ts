import { Routes } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";
import { ProjectsComponent } from "./modules/projects/projects.component";
import { ProjectViewComponent } from "./modules/projects/project-view/project-view.component";

export const routes: Routes = [
	{ path: "home", component: HomeComponent },
	{ path: "projects", component: ProjectsComponent },
	{ path: "projects/:id", component: ProjectViewComponent },
	{ path: "", redirectTo: "/home", pathMatch: "full" },
];
