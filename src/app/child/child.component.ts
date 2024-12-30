import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  @Input() parentData: string = '';
  @Output() childEvent = new EventEmitter<string>();

  childMessage: string = '';

  sendMessageToParent() {
    this.childEvent.emit(this.childMessage);
  }
}
