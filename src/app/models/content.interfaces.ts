export default interface Content {
	images: Image;
	info: Info;
	content: ContentItem;
}

interface Image {
	[key: string]: string;
}

interface Info {
	[key: string]: string;
}

interface ContentItem {
	home: HomeContent;
	education: EducationContent;
}

type HomeContent = string[];

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
