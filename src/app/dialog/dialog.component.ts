import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule, MatCheckbox, MatLabel, MatFormFieldModule, MatInputModule, MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    taskName: string,
    taskDescription: string,
    taskStatus: string,
    taskIcon: string,
    taskStatusIcon: string[]
  }) { }


  @Output() addTaskEvent = new EventEmitter<Task>();

  @Input() newTask!: {
    taskName: string,
    taskDescription: string,
    taskStatus: string,
    taskIcon: string,
    taskStatusIcon: string[]
  };


  taskForm = new FormGroup({
    taskName: new FormControl(''),
    taskDescription: new FormControl(''),
    taskStatus: new FormControl(''),
    taskIcon: new FormControl(''),
    taskStatusIcon: new FormControl(['', '']),



  })


  public ngOnInit(): void {

  
    
    this.newTask = {
      taskName: this.data.taskName,
      taskDescription: this.data.taskDescription,
      taskStatus: this.data.taskStatus,
      taskIcon: this.data.taskIcon,
      taskStatusIcon: this.data.taskStatusIcon
    };

  }


  ngOnChanges(changes: SimpleChanges): void {

    console.log("Changes:");
    console.log(changes['newTask']);

    if (changes['newTask'].currentValue) {
      this.taskForm.patchValue(this.newTask);
    }
  }



  chooseStatus(value: any) {

    this.taskForm.controls.taskStatus.setValue(value);
    if (value == 'In Progress') {
      this.taskForm.controls.taskStatusIcon.setValue(["../assets/Time_atack_duotone.svg", "#E9A23B"]);
    }
    else if (value == 'Completed') {
      this.taskForm.controls.taskStatusIcon.setValue(["../assets/Done_round_duotone.svg", "#32D657"]);
    }
    else {
      this.taskForm.controls.taskStatusIcon.setValue(["../assets/close_ring_duotone.svg", "#DD524C"]);
    }
  }



  selectIcon(selectedIcon: HTMLImageElement) {

    selectedIcon.style.backgroundColor = "#F5D565";
    this.taskForm.controls.taskIcon.setValue(selectedIcon.src);
  }
}
