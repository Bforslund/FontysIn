// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], searchText: string): any[] {
    let userId : number = parseInt(localStorage.getItem("userId"));

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toString().toLowerCase();
    console.log(searchText);

    return items.filter(it => {
      let user = it.user.id == userId ? it.friend: it.user;
      let fullName = user.firstName + ' ' + user.lastName;
      return fullName.toString().toLowerCase().indexOf(searchText) >= 0;
    });
  }
}