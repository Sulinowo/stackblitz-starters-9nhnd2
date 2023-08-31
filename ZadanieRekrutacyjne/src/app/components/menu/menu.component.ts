import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() selectedItem: string = 'DEFINITION';
  @Input() isNameFilled: boolean = false;
  @Input() canSelectItem: (item: string) => boolean = () => true;
  @Output() itemSelected = new EventEmitter<string>();

  selectItem(item: string) {
    if (this.canSelectItem(item)) {
      this.itemSelected.emit(item);
    }
  }
}
