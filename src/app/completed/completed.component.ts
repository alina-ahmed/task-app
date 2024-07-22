import { Component, Input } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent {
@Input() completedTasks: Task[] =[];     
}
