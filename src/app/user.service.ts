import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private userPayload: BehaviorSubject<any>;
  public authDecoded: any;
  token;

  constructor(
    private http: HttpClient,
    private router: Router,
    public tokenService: TokenService
  ) {
    this.token = this.tokenService.getToken();
    try {
      this.authDecoded = jwt_decode(this.token);
    } catch (error) {
      console.log('invalid token format');
    }

    this.userPayload = new BehaviorSubject<any>(this.authDecoded);
  }

  get userPayloadValue(): any {
    return this.userPayload.value;
  }

  signUp(email:string,username:string,password:string) {
    let register = {
      email: email,
      username: username,
      password:password
    };
    return this.http
      .post<any>(`${environment.baseUrl}/register`, register)
      .subscribe(
        (success) => {

        },
        (err) => {
        }
      );
  }

  signIn(password:string,email:string) {
    let login = {
      password:password,
      email:email
    }
    return this.http
      .post<any>(`${environment.baseUrl}/login`, login)
      .subscribe(
        (success) => {
          localStorage.setItem('access_token', success.access_token);
          this.userPayload.next(success);
                  },
        (err) => {
          console.log(err)
          \
        }
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  saveItem(itemName: string, checklistId: number) {
    let newItem = {
      itemName: itemName,
      checklistId: checklistId,
    };
    return this.http
      .post<any>(`${environment.baseUrl}/item`, newItem)
      .subscribe(
        (success) => {
          console.log(success);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAllChecklist(): Observable<any> {
    let endpoint = `${environment.baseUrl}/checklist`;
    return this.http.get(endpoint, { headers: this.headers });
  }

  postNewChecklist(name: string) {
    return this.http.post<any>(`${environment.baseUrl}/item`, name).subscribe(
      (success) => {
        console.log(success);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEachItem(id: number): Observable<any> {
    let endpoint = environment.baseUrl + '/item/' + `${id}`;
    return this.http.get(endpoint, { headers: this.headers }).pipe(
      map((res: Response) => {
        console.log(res);
        return res || {};
      })
    );
  }

  updateStatusItem(id: number, itemCompletionStatus: boolean) {
    let updateItemStatus = {
      id: id,
      itemCompletionStatus: itemCompletionStatus,
    };
    let endpoint = `${environment.baseUrl}/item/${id}`;
    return this.http
      .put<any>(endpoint, updateItemStatus)
      .pipe(map((result) => true));
  }

  updateItemName(id: number, itemName: string) {
    let updateItemName = {
      id: id,
      itemName: itemName,
    };
    let endpoint = `${environment.baseUrl}/item/rename/${id}`;
    return this.http
      .put<any>(endpoint, updateItemName)
      .pipe(map((result) => true));
  }
}
