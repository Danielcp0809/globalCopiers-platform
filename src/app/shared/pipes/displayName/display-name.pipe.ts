import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {

  transform(value: string): any {
    const words = value.split(' ');
    if (words.length != 2){
      return `${words[0]} ${words[2]}`
    }
    return value;
  }

}
