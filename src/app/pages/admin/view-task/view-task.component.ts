import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  tableData: any[] = [];
  headers: string[] = [];

  ngOnInit() {
    const storedData = localStorage.getItem('taskData');

    if (storedData) {
      this.tableData = JSON.parse(storedData);

      if (this.tableData.length > 0) {
        this.headers = Object.keys(this.tableData[0]);
      }
    }
  }

  clearStorage(){
    localStorage.removeItem('taskData');
    this.tableData = [];
    this.headers = [];

    alert('Stored task data cleared!');
  }
}
