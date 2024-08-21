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
}

type HomeContent = string[];
