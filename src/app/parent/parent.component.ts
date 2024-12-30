import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  messageToChild: string = 'Hello Child!';
  messageFromChild: string = '';

  receiveChildData(event: string) {
    this.messageFromChild = event;
  }
}
