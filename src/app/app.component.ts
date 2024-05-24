import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppmenuComponent } from "./component/appmenu/appmenu.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AppmenuComponent, CommonModule]
})
export class AppComponent {
  title = 'authapp';
}
