import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class SliceTextPipe implements PipeTransform {

  transform(text, max) {
    if (text) {
      if (text.length > max) {
        return text.slice(0,max) + '...';
      } else {
        return text;
      }
    }
  }

}
