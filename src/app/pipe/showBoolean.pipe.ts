import { IPost } from './../model/model-interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'showBoolean' })
export class ShowBoolean implements PipeTransform {
    transform(oPost: boolean) {
        if(oPost) {
            return' <i class="fas fa-check"></i>';
        }  else {
            return '<i class="fas fa-times"></i>';
        }
    }
}