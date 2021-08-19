import { Pipe, PipeTransform } from '@angular/core';
import { enterprise } from 'src/app/core/models/enterprise.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, arg: any): any {
    const result = [];
    for(const item of items){
      if(item.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        result.push(item)
      }
    }
    return result
  }

}
