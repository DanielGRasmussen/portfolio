import { Injectable } from "@angular/core";
import * as content from "../assets/content.json";
import Content from "./models/content.interfaces";

@Injectable({
	providedIn: "root",
})
export class ContentService {
	content: Content = content;

	getContent(): Content {
		return content;
	}
}
