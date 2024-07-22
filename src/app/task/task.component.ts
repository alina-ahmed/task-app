import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { CompletedComponent } from '../completed/completed.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule,CompletedComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {

  constructor(private taskService:TaskService, private dialogModalService:DialogService){}

  newTaskDesc = '';
  finishedTasks: Task[]=[];


   tasks: Task[] = [];

   someTask!:{
    taskName:string,
    taskDescription: string,
    taskStatus:string,
    taskIcon: string,
    taskStatusIcon: [
        string,string]
};

  // tasks: Task [] =[
  //   { 
  //     description: "Grocery shopping",
  //     status: "pending"
  //   },
  //   { 
  //     description: "Clean attic",
  //     status: "pending"
  //   },
  //   { 
  //     description: "Complete side-project",
  //     status: "pending"
  //   },
  //   { 
  //     description: "Take dog for walk",
  //     status: "pending"
  //   },
  // ]

  ngOnInit(): void {
    this.getTasks();
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
  //  const dialogRef= this.dialog.open(DialogComponent);

  //  dialogRef.afterClosed().subscribe(

  //  )
  this.dialogModalService.openDialog().subscribe(data=>{
    console.log("data:")
    console.log(data.value);
    this.addTasks(data);

  });

  console.log(this.tasks);

  }

  openEditDialog(task: Task){
    console.log(task);
    let currentTask=  this.taskService.getCurrentTask(task);
    console.log(currentTask);
    this.dialogModalService.openEditDialog(task);

  }

  setTaskBgColor(task: Task){

    if(task.status=="In Progress")
      return "#F5D565";
    else  if(task.status=="Completed")
      return "#A0ECB1";
    else if(task.status=="Won't Do")
      return "#F7D4D3";
    else
    return "#E3E8EF";

  }




  getTasks():void{
    this.tasks=this.taskService.getTasks();
  }

  addTasks(data: any):void{
    console.log("In addTasks");

    console.log(data);
    let newTask : Task;

     newTask = {
      "title": data.value.taskName,
      "description": data.value.taskDescription,
      "status":data.value.taskStatus,
      "icon": data.value.taskIcon,
      "statusIcon": data.value.taskStatusIcon
    };

    console.log(newTask);
      this.taskService.addTask(newTask);

    
    // if(newTask===undefined){
    //   return
    // }
    // else{
    //   this.taskService.addTask(newTask);

    // }
  }


  // addTask(){
  //   let newTask:Task = {
  //     "description": this.newTaskDesc,
  //     "status": "pending"
  //   }
  //   this.tasks.push(newTask);
  // }

  deleteTask(task:Task){
    const index: number = this.tasks.indexOf(task);
    let completedTask: Task[];
    if (index !== -1) {
      completedTask=this.tasks.filter(element => element == task);
      this.tasks.splice(index, 1);

      console.log(completedTask);
      console.log(completedTask[0]);
      this.finishedTasks.push(completedTask[0]);
      console.log(this.finishedTasks);

   
      
        
    }  
  }

}
