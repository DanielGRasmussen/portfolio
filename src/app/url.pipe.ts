import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "url",
	standalone: true,
})
export class UrlPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) return "";

		// Check if the value is already wrapped in url()
		if (value.startsWith("url(") && value.endsWith(")")) {
			return value;
		}

		// Wrap the value in url()
		return `url("${value}")`;
	}
}
