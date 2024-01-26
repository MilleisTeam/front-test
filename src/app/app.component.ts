import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Task } from '../datasource/Task';
import { TaskService } from '../datasource/task.service';
import {TaskComponent} from './components/task/task.component';
import {FormComponent} from './components/form/form.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, TaskComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent  {
    tasks: Task[] = [];
    title = 'front-test';
    @ViewChild('form', {read: ViewContainerRef})
    container!: ViewContainerRef;

    constructor(private taskService: TaskService) {
        this.taskService.getAll().then(tasks => {
            this.tasks = tasks;
        });
    }

    openForm() {
        this.container.clear()
        const host = this.container.createComponent(FormComponent);
        host.instance.action = 'créer';
        host.instance.onCloseForm.subscribe(() => {
            host.instance.onCloseForm.unsubscribe();
            this.container.clear();
        });
    }
}
