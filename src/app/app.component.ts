import { Component } from '@angular/core';
import { Remult } from 'remult';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remult-angular-todo';
  constructor(public remult: Remult) {
  }
  tasksRepo = this.remult.repo(Task);
  newTask = this.tasksRepo.create();
  async createNewTask() {
    await this.newTask.save();
    this.newTask = this.tasksRepo.create();
    this.loadTasks();
  }
  tasks: Task[] = [];
  async loadTasks() {
    this.tasks = await this.tasksRepo.find();
  }
  ngOnInit() {
    this.loadTasks();
  }
  async deleteTask(task: Task) {
    await task.delete();
    this.loadTasks();
  }
}
