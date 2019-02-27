import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingToArray'
})
export class RatingToArrayPipe implements PipeTransform {

  transform(data: Object) {
    const keys = Object.keys(data);
    console.log("Inside of rating to array pipe", keys, data);
    return keys.slice(keys.length / 2);
  }

}
