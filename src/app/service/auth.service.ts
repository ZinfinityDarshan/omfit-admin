import { Observable } from 'rxjs';
import { User } from './../models/user';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fs: FireService) { }

  verifyLogin(username: string, password: string) : Observable<User>{
    return new Observable((observer) =>{
      this.fs.getCollectionWithCondition<User>('user','username','==', username)
      .subscribe(users =>{
        if(users.length>0){
          let u = users[0];
          if(u.password === password){
            observer.next(u);
            observer.complete();
          }else{
            observer.next();
            observer.complete();
          }
        }else{
          observer.next();
          observer.complete();
        }
      }, err=>{
        observer.error(err);
      })
    });
  }
}
