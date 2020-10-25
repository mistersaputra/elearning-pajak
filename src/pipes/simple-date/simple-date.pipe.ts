import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleDate'
})
export class SimpleDatePipe implements PipeTransform {
  
  transform(timestamp) {
    timestamp = timestamp.replace(' ', 'T')
    const formatDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formatTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const today  = new Date();
    const date  = new Date(timestamp);
    if (today.toDateString() == date.toDateString()) {
      return date.toLocaleTimeString(['ban', 'id'], formatTime);
    } else {
      return date.toLocaleDateString(['ban', 'id'], formatDate);
    }
  }

}