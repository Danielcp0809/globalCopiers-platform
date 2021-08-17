import { Component, Input, OnInit } from '@angular/core';
import { actions, dataTable, titleTable } from 'src/app/core/models/dataTable.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() initialData!: any[]

  @Input() titles!: titleTable[]

  @Input() actions!: actions


  public data: dataTable = {
    titles:[],
    data:[],
    actions :{
      enable:false,
      delete:false,
      edit:false
    }
  }

  constructor() {

  }

  ngOnInit(): void {
    this.transformData()
  }

  transformData(){
    this.data.titles = this.titles.map((title)=>{
      return title.displayName
    }) 
    this.data.data = this.initialData.map((data)=>{
      const arr = [];
      for(var i in this.titles){
        arr.push(data[this.titles[i].key])
      }
      return arr
    })
    this.data.actions = this.actions
    console.log(this.data)
  }

  delete(number: number){
    console.log(this.initialData[number].id)
  }

}
