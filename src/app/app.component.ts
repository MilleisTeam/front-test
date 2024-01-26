import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Task } from '../datasource/Task';
import { TaskService } from '../datasource/task.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    tasks: Task[] = [];
    title = 'front-test';
    constructor() { }

    async ngOnInit() {
    }

}
