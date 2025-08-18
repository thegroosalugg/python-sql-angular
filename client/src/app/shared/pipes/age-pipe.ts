import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(date: string | Date): number {
    const birth = new Date(date);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();

    if (
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }
}
