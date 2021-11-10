import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highLight'
})
export class HighLightPipe implements PipeTransform {
  transform(wholeText: string, searchQuery: string): string {
    if (!searchQuery) {
      return wholeText;
    }
    
    const busqueda = new RegExp(searchQuery, 'gi');
    return wholeText.replace(busqueda, `<mark><strong>$&</strong></mark>`);
  }
}
