import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../task';

// @Component({
//   selector: 'app-dialog',
//   standalone: true,
//   imports: [MatButtonModule,MatIconModule],
//   templateUrl: './dialog.component.html',
//   styleUrl: './dialog.component.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,

// })
// export class DialogComponent {
//   readonly dialog = inject(MatDialog);

//   openDialog() {
//     this.dialog.open(DialogElementsExampleDialog);
//   }
// }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule ,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatIconModule,MatCheckbox,MatLabel,MatFormFieldModule,MatInputModule,MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class DialogComponent {

  @Output() addTaskEvent = new EventEmitter<Task>();

  @Input() newTask!:{
    taskName:string,
    taskDescription: string,
    taskStatus:string,
    taskIcon: string,
    taskStatusIcon: [
        string,string]
};
  

  taskForm= new FormGroup({
    taskName: new FormControl(''),
    taskDescription: new FormControl(''),
    taskStatus: new FormControl(''),
    taskIcon: new FormControl(''),
    taskStatusIcon: new FormControl(['','']),



  })


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newTask'].currentValue) {
        this.taskForm.patchValue(this.newTask);
    }
}


  chooseStatus(value: any){
    // console.log(value);
     this.taskForm.controls.taskStatus.setValue(value);
     if(value=='In Progress'){
      this.taskForm.controls.taskStatusIcon.setValue(["../assets/Time_atack_duotone.svg","#E9A23B"]);
     }
     else if(value=='Completed'){
      this.taskForm.controls.taskStatusIcon.setValue(["../assets/Done_round_duotone.svg","#32D657"]);
     }
     else{
      this.taskForm.controls.taskStatusIcon.setValue(["../assets/close_ring_duotone.svg","#DD524C"]);
     }
  }


  saveTask(){
    console.log(this.taskForm.value);

    console.log(this.taskForm.value.taskStatusIcon![0]);
  }


  onSubmit(){
    // let task:Task;
    // this.addTaskEvent.emit(task= {
    //   "title":this.taskForm.value.taskName!,
    //   "description": this.taskForm.value.taskDescription!,
    //   "status":this.taskForm.value.taskStatus!,
    //   "icon": this.taskForm.value.taskIcon!,
    //   "statusIcon": [this.taskForm.value.taskStatusIcon![0],this.taskForm.value.taskStatusIcon![1]]

    // })
  }

  selectIcon(selectedIcon: HTMLImageElement){

    selectedIcon.style.backgroundColor="#F5D565";
    this.taskForm.controls.taskIcon.setValue(selectedIcon.src);
  }
}
