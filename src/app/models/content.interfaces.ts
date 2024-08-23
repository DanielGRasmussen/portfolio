export default interface Content {
	home: HomeContent;
	education: EducationContent;
	technologies: TechnologiesContent;
	contact: ContactContent;
	general: GeneralContent;
	links: Links;
}

export interface HomeContent {
	profile: string;
	bio: string[];
}

export interface EducationContent {
	degree: {
		degree: string;
		school: string;
		status: string;
		date: string;
		gpa: string;
	};
	minors: {
		name: string;
		status: string;
		date: string;
	}[];
	certificates: {
		name: string;
		status: string;
		date: string;
	}[];
}

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
	location: string;
	contact: string;
	response: string;
	links: {
		text: string;
		icon: string;
		link: string;
	}[];
}

export interface GeneralContent {
	[content: string]: string;
}

export type Links = Link[];

interface Link {
	name: string;
	url: string;
}
