import { Pipe, PipeTransform } from '@angular/core';
import { IFecha } from '../model/model-interfaces';

@Pipe({
  name: 'formateoFecha'
})
export class FormateoFechaPipe implements PipeTransform {

  transform(oFecha: IFecha, nData: string="") {
    if (oFecha) {
      if (oFecha.date.day <= 9) {
        nData = "0" + oFecha.date.day + "-";
      } else {
        nData = oFecha.date.day + "-";
      }
      if (oFecha.date.month <= 9) {
        nData += "0" + oFecha.date.month + "-" + oFecha.date.year + " ";
      } else {
        nData += oFecha.date.month + "-" + oFecha.date.year + " ";
      }
      if (oFecha.time.hour <= 9) {
        nData += "0" + oFecha.time.hour + ":";
      } else {
        nData += oFecha.time.hour + ":";
      }
      if (oFecha.time.minute <= 9) {
        nData += "0" + oFecha.time.minute;
      } else {
        nData += oFecha.time.minute;
      }
    }
    return nData;


  }
}
