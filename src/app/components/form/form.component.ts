import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { FormsModule} from '@angular/forms';
import {TaskService} from '../../../datasource/task.service';
import {NgIf} from '@angular/common';

type Task = {
    id?: number;
    name: string;
    description: string;
    done: boolean;
}
@Component({
  selector: 'app-form',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input({required: true}) action!: 'créer' | 'modifier';
  @Input() id: number | undefined = undefined;
  @Output() onCloseForm: EventEmitter<void> = new EventEmitter<void>();
  task: Task = {name: '', description: '', done: false};
  taskService = inject(TaskService);


    ngOnInit(): void {
        if (!this.id) return;
        this.taskService.get(this.id).then(task => {
            this.task = {...task};
        });
    }

    onSubmit() {
        if (this.action === 'modifier') {
            this.taskService.put(this.task).then(task => {
                console.log(task);
            });
        } else if (this.action === 'créer') {
            this.taskService.post(this.task).then(task => {
                console.log(task);
            });
        }
        this.onCloseForm.next();
    }

    closeForm() {
        this.onCloseForm.next();
    }
}
