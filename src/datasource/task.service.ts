import { Injectable } from '@angular/core';
import { Task } from './Task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [
        {
            id: 1,
            name: 'Task 1',
            description: 'Description for Task 1',
            done: false
        },
        {
            id: 2,
            name: 'Task 2',
            description: 'Description for Task 2',
            done: false
        },
        {
            id: 3,
            name: 'Task 3',
            description: 'Description for Task 3',
            done: false
        },
        {
            id: 4,
            name: 'Task 4',
            description: 'Description for Task 4',
            done: false
        },
        {
            id: 5,
            name: 'Task 5',
            description: 'Description for Task 5',
            done: false
        }
    ];

    constructor() { }

    getAll(): Promise<Task[]> {
        return Promise.resolve(this.tasks);
    }

    get(id: any): Promise<Task> {
        return Promise.resolve(this.tasks.find(task => task.id === id) as Task);
    }

    put(taskToUpdate: Task): Promise<Task> {
        const index = this.tasks.findIndex(task => task.id === taskToUpdate.id);
        if (index !== -1) {
            this.tasks[index] = taskToUpdate;
        }
        return Promise.resolve(taskToUpdate);
    }

    post(newTask: Task): Promise<Task> {
        const taskId = Math.floor(Math.random() * 10000); // generates a random id
        newTask.id = taskId;
        this.tasks.push(newTask);
        return Promise.resolve(newTask);
    }

    delete(id: number): Promise<boolean> {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
        return Promise.resolve(index !== -1);
    }
}

