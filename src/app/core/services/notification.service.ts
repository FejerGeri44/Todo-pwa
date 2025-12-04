import { Injectable, inject, signal, effect } from '@angular/core';
import { DbService } from './db.service';
import {SettingService} from '../shared/services/settings/settings.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private db = inject(DbService);
  private settings = inject(SettingService);
  private permission = signal<NotificationPermission>('default');
  private checkInterval: any;
  private notifiedTaskIds = new Set<string>();

  constructor() {
    if ('Notification' in window) {
      this.permission.set(Notification.permission);
    }

    effect(() => {
      if (this.permission() === 'granted') {
        this.startMonitoring();
      }
    });
  }

  requestPermission() {
    if (!('Notification' in window)) {
      alert('Ez a böngésző nem támogatja az értesítéseket.');
      return;
    }

    Notification.requestPermission().then((result) => {
      this.permission.set(result);
      if (result === 'granted') {
        this.sendNotification('Értesítések bekapcsolva', 'Mostantól szólni fogok a határidők előtt!');
      }
    });
  }

  private startMonitoring() {
    if (this.checkInterval) return;

    this.checkDeadlines();
    this.checkInterval = setInterval(() => {
      this.checkDeadlines();
    }, 60 * 1000);
  }

  private checkDeadlines() {
    if (!this.settings.notifications()) {
      return;
    }

    const tasks = this.db.tasks();
    const now = Date.now();
    const WARNING_TIME = 10 * 60 * 1000;

    tasks.forEach(task => {
      if (!task.done && task.dueAt && !this.notifiedTaskIds.has(task.id)) {

        const diff = task.dueAt - now;

        if (diff > 0 && diff <= WARNING_TIME) {
          this.sendNotification(
            'Közeleg a határidő!',
            `"${task.title}" határideje hamarosan lejár!`
          );
          this.notifiedTaskIds.add(task.id);
        }
        else if (diff <= 0 && diff > -(60 * 60 * 1000)) {
          this.sendNotification(
            'Lejárt feladat!',
            `A(z) "${task.title}" határideje lejárt.`
          );
          this.notifiedTaskIds.add(task.id);
        }
      }
    });
  }

  private sendNotification(title: string, body: string) {
    const options: any = {
      body: body,
      icon: 'assets/icons/icon-72x72.png',
      vibrate: [200, 100, 200],
      tag: 'todo-pwa-notification'
    };

    new Notification(title, options);
  }
}
