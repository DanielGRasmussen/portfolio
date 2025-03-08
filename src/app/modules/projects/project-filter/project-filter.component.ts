import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnInit,
	AfterViewInit,
	OnDestroy,
	ChangeDetectorRef,
} from "@angular/core";
import { NgForOf, NgStyle } from "@angular/common";
import { TechnologiesItem } from "../../../models/content.interfaces";
import { Subscription } from "rxjs";
import { TitleService } from "../../../title.service";
import { LayoutService } from "../../../layout.service";

@Component({
	selector: "app-project-filter",
	standalone: true,
	imports: [NgForOf, NgStyle],
	templateUrl: "./project-filter.component.html",
	styleUrl: "./project-filter.component.scss",
})
export class ProjectFilterComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() sidebar: boolean = false;
	@Input() types: string[] = [];
	@Input() technologies: TechnologiesItem[] = [];
	@Output() typeChange: EventEmitter<string[]> = new EventEmitter<string[]>();
	@Output() technologyChange: EventEmitter<TechnologiesItem[]> = new EventEmitter<
		TechnologiesItem[]
	>();
	open: boolean = false;
	// Offset helpers
	private headerVisibleSubscription!: Subscription;
	private footerOffsetSubscription!: Subscription;
	headerVisible: boolean = true;
	footerOffset: number = 0;

	selectedTypes: string[] = [];
	selectedTechnologies: TechnologiesItem[] = [];

	constructor(
		private TitleService: TitleService,
		private LayoutService: LayoutService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.TitleService.setTitle("Projects");

		this.headerVisibleSubscription = this.LayoutService.isHeaderVisible$.subscribe(
			isVisible => {
				this.headerVisible = isVisible;
			}
		);
		this.footerOffsetSubscription = this.LayoutService.footerOffset$.subscribe(offset => {
			this.footerOffset = offset;
		});
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.LayoutService.calculateFooterOffset();
			this.cdr.detectChanges(); // Manually trigger change detection
		}, 0);
	}

	ngOnDestroy(): void {
		this.headerVisibleSubscription.unsubscribe();
		this.footerOffsetSubscription.unsubscribe();
	}

	toggleOpen(): void {
		this.open = !this.open;
	}

	onTypeChange(event: Event): void {
		if (!(event.target instanceof HTMLInputElement)) {
			return;
		}
		const value = event.target.id;

		if (event.target.checked) {
			this.selectedTypes.push(value);
		} else {
			this.selectedTypes = this.selectedTypes.filter(type => type !== value);
		}

		this.typeChange.emit(this.selectedTypes);
	}

	onTechnologyChange(event: Event): void {
		if (!(event.target instanceof HTMLInputElement)) {
			return;
		}
		const value = event.target.id;

		// Remove the technology from the list if it's already there via filter
		this.selectedTechnologies = this.selectedTechnologies.filter(
			technology => technology.name !== value
		);

		// Add the technology to the list if it's not there
		if (event.target.checked) {
			this.selectedTechnologies.push(
				<TechnologiesItem>this.technologies.find(technology => technology.name === value)
			);
		}

		this.technologyChange.emit(this.selectedTechnologies);
	}
}
