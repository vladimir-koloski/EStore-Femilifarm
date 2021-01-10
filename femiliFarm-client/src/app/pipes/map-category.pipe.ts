import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapCategory'
})
export class MapCategoryPipe implements PipeTransform {
  transform(value: any) {
    switch(value){
      case 1:
        return "Cosmetics"
        break;
      case 2:
        return "OTC"
        break;
      case 3:
        return "Baby"
        break;
      case 4:
        return "Drugs"
        break;    
    }
  }
}

