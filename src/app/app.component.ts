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
  hideCompleted: boolean = false;
  tasks: Task[] = [];
  async loadTasks() {
    this.tasks = await this.remult.repo(Task).find({
      where: task => this.hideCompleted ? task.completed.isDifferentFrom(true) : undefined,
      orderBy: task => task.completed
    });
  }
  ngOnInit() {
    this.loadTasks();
  }
  async deleteTask(task: Task) {
    await task.delete();
    this.loadTasks();
  }
}
