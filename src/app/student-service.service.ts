import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  baseURL:string = "https://crudcrud.com/api/abc3d489f04f4091affa2e05e7a959cd/Musthafa/";
  constructor(private http:HttpClient) { }
  

  saveStudent(data:any){
    return this.http.post<any>(this.baseURL,data);
  }

  getStudent(){
    return this.http.get<any>(this.baseURL);
  }

  updateStudent(data:any,id:any){
    return this.http.put<any>(this.baseURL+id,data);
  }

  deleteStudent(id:any){
    return this.http.delete<any>(this.baseURL+id);
  }
}
