import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  imports: [],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.css'
})
export class PagerComponent {

  @Input()
  pageNumber!: number;
  @Input()
  totalPages!: number;
  @Input()
  totalElements!: number;
  @Output()
  next = new EventEmitter<number>();
  @Output()
  previous = new EventEmitter<number>();

  isFirstPage(): boolean {
    return this.pageNumber === 0;
  }

  isLastPage(): boolean {
    return this.pageNumber === this.totalPages - 1;
  }

  goToNextPage() {
   this.next.emit(this.pageNumber);
  }

  goToPreviousPage() {
    this.previous.emit(this.pageNumber);
  }
}