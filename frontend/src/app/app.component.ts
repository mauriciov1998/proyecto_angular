import { Component } from '@angular/core';
declare function take_snapshot(): void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
  take_snapshot();
  }
  title = 'frontend';
}
