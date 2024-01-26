import {
  Component,
  inject,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormComponent} from '../form/form.component';
import {TaskService} from '../../../datasource/task.service';

//import { Task } from '../datasource/Task'; not working with webstorm...
type Task = {
  id?: number;
  name: string;
  description: string;
  done: boolean;
}
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  @ViewChild('form', {read: ViewContainerRef})
  container!: ViewContainerRef;
  taskService = inject(TaskService);

  openForm() {
    this.container.clear()
    const host = this.container.createComponent(FormComponent);
    host.instance.action = 'modifier';
    host.instance.id = this.task.id;
    host.instance.onCloseForm.subscribe(() => {
      host.instance.onCloseForm.unsubscribe();
      this.container.clear();
    });
  }

  delete() {
    this.taskService.delete(this.task.id!).then(() => {
      console.log('deleted');
    });
  }
}
