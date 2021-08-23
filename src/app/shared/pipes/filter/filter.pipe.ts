import { Pipe, PipeTransform } from '@angular/core';
import { enterprise } from 'src/app/core/models/enterprise.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, keys: any[], word: any,): any {
    const result = [];

    for(const key of keys){
      for(const item of items){
        if(item[key].toLowerCase().indexOf(word.toLowerCase()) > -1){
          if(result.indexOf(item) === -1){
            result.push(item)
          }
        }
      }
    }
    return result
  }

}
