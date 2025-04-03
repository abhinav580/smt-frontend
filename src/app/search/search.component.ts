import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchKeyword: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(): void {
    this.searchEvent.emit(this.searchKeyword);
  }
}