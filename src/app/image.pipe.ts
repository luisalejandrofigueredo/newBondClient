import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  constructor(private http:HttpClient){}
  transform(url:string): any {
    return  new Observable<string>((observer) => {
      // This is a tiny blank image
      observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

      // The next and error callbacks from the observer
      const {next, error} = observer;

      this.http.get(url, {responseType: 'blob'}).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function() {
          observer.next(<string>reader.result);
        };
      });

      return {unsubscribe() {  }};
    });
  }

}
