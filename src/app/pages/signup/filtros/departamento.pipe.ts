import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departamento'
})
export class DepartamentoPipe implements PipeTransform {

  transform(value: any, FilterDepartamento: number): any {
    if (!value || !FilterDepartamento) {
      return value;
  }

  let filteredItems = value.filter((lista: any) => {
    return lista.idPais == FilterDepartamento
  })
  
  return filteredItems;
   
  }

}
