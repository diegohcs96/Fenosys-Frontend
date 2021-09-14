import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distrito'
})
export class DistritoPipe implements PipeTransform {

  transform(value: any, FilterDistrito: number): any {
    if (!value || !FilterDistrito) {
      return value;
  }

  let filteredItems3 = value.filter((lista: any) => {
    
    return lista.idProvincia == FilterDistrito
  })
  
  return filteredItems3;
   
  }

}
