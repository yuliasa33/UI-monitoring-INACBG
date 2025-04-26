import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../../components/layout/layout.component";

@Component({
  selector: 'app-antrian-farmasi',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './antrian-farmasi.component.html',
  styleUrls: ['./antrian-farmasi.component.scss']
})
export class AntrianFarmasiComponent {

  public text:any = signal({})
  
  public type = '';
  public draggedTask: any;
  public todos = [
    {
      id: 1,
      name: 'Set up theme',
      descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
      assignee: 'John Doe',
      createdOn: new Date(),
      status: 'TODO',
    },
    {
      id: 2,
      name: 'Develop layout',
      descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
      assignee: 'Will Smith',
      createdOn: new Date(),
      status: 'TODO',
    },
    {
      id: 3,
      name: 'Develop Auth Module',
      descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
      assignee: 'James Aninston',
      createdOn: new Date(),
      status: 'TODO',
    },
  ];

  public inProgress = [
    {
      id: 4,
      name: 'Develop layout',
      descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
      assignee: 'Will Smith',
      createdOn: new Date(),
      status: 'InProgress',
    },
    {
      id: 5,
      name: 'Develop layout',
      descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
      assignee: 'Will Smith',
      createdOn: new Date(),
      status: 'InProgress',
    },
  ];
  public completed = [
    {
      id: 6,
      name: 'Develop layout',
      descripition: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
      assignee: 'John Doe',
      createdOn: new Date(),
      status: 'Completed',
    },
  ];

  constructor() {}

  dragStart(task: any) {
    this.draggedTask = task;
    this.text.set({
      asjdlsaj:'askjdkasjd'
    })
  }

  drop(type: string) {
    switch (type) {
      case 'TODO':
        this.type = 'TODO';
        return this.todos.push(this.draggedTask);
      case 'InProgress':
        this.type = 'InProgress';
        return this.inProgress.push(this.draggedTask);
      case 'Completed':
        this.type = 'Completed';
        return this.completed.push(this.draggedTask);
      default :
        return false
    }
  }

  dragEnd(task: any) {
    const taskStatus = task.status;
    const taskId = task.id;
    if(this.type == 'TODO'){
      task.status = 'TODO'
    } else if (this.type === 'InProgress'){
      task.status = 'InProgress'
    } else {
      task.status = 'Completed'
    }
    
    switch (taskStatus) {
      case 'TODO':
        this.todos = this.todos.filter((task) => task.id != taskId);
        this.draggedTask = null;
        return;
      case 'InProgress':
         this.inProgress = this.inProgress.filter((task) => task.id != taskId);
         this.draggedTask = null;
         return
      case 'Completed':
        this.completed = this.completed.filter((task) => task.id != taskId);
        this.draggedTask = null;
        return
      default:
        return false;
    }
  }
}
