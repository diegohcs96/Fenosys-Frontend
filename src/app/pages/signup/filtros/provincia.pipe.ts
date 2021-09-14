import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'provincia'
})
export class ProvinciaPipe implements PipeTransform {

  transform(value: any, FilterProvincia: number): any {
    if (!value || !FilterProvincia) {
      return value;
  }

  let filteredItems2 = value.filter((lista: any) => {
    return lista.idDepartamento == FilterProvincia
  })
  
  return filteredItems2;

   
  }
}
