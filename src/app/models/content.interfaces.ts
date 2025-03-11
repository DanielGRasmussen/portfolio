export default interface Content {
	intro: IntroContent;
	projects: ProjectsContent;
	education: EducationContent;
	technologies: TechnologiesContent;
	contact: ContactContent;
	general: GeneralContent;
	links: Links;
}

export interface IntroContent {
	profile: string;
	bio: string[];
}

export interface ProjectsContent {
	items: ProjectItem[];
}

export interface ProjectItem {
	id: string;
	title: string;
	projectType: string;
	featured: boolean;
	images: string[];
	technologies: TechnologiesItem[];
	descriptions: DescriptionsItem[];
	link: string;
}

export interface TechnologiesItem {
	name: string;
	icon: string;
}

export interface DescriptionsItem {
	name: string;
	content: string[];
}

export type EducationContent = string[];

export type TechnologiesContent = Technologies[];

interface Technologies {
	name: string;
	items: TechnologyItem[];
}

interface TechnologyItem {
	name: string;
	icon: string;
	skill: string;
}

export interface ContactContent {
	links: {
		text: string;
		icon: string;
		link: string;
	}[];
	content: string[];
}

export interface GeneralContent {
	[content: string]: string;
}

export type Links = Link[];

interface Link {
	name: string;
	url: string;
}
