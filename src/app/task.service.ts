import { Injectable } from '@angular/core';
import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Task[]{
    return TASKS;
  }

  getCurrentTask(specificTask: Task){
    let currentTask=TASKS.filter((task)=> task.title === specificTask.title);
    return currentTask;
  }

  addTask(newTask: Task){
    // let newTask:Task = {
    //   "title": newTaskDesc,
    //   "description": "",
    //   "status": "pending",
    //   "icon":"",
    //   "statusIcon":["",""]


      
    // }
    TASKS.push(newTask);
  }
}
