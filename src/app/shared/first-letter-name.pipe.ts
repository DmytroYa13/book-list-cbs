import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterName'
})
export class FirstLetterNamePipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      return value.substr(0,1)+"."
    }}
  }


