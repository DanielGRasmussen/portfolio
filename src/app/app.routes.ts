import { Routes } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";
import { ProjectsComponent } from "./modules/projects/projects.component";
import { EducationComponent } from "./modules/education/education.component";
import { TechnologiesComponent } from "./modules/technologies/technologies.component";
import { ContactComponent } from "./modules/contact/contact.component";

export const routes: Routes = [
	{ path: "home", component: HomeComponent },
	{ path: "projects", component: ProjectsComponent },
	{ path: "education", component: EducationComponent },
	{ path: "technologies", component: TechnologiesComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "", redirectTo: "/home", pathMatch: "full" },
];
