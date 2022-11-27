import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { actions, dataTable, titleTable } from 'src/app/core/models/dataTable.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() initialData!: any[]

  @Input() titles!: titleTable[]

  @Input() actions!: actions

  @Input() noDataMessage!: string


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

  ngOnChanges(changes: SimpleChanges){
    this.initialData = changes.initialData.currentValue,
    this.transformData()
     
  }

  ngOnInit(): void {
    
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
     
  }

  delete(number: number){
     
  }

}
