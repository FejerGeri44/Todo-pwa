import { Component } from '@angular/core';
import { AlertComponent } from "./core/shared/services/alert/alert.component";
import { SettingsComponent } from "./core/shared/services/settings/settings.component";
import { TaskManagerComponent } from "./core/shared/services/task-manager/task-manager.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent, SettingsComponent, TaskManagerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-pwa';
}
