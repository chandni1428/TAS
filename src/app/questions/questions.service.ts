import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Questions } from '../question';

@Injectable()
export class QuestionsService {

  public questionsList: Questions[];
  public selectedQuestion: Questions;

  private questionUrl = "http://localhost:3000/questions";

  constructor(private http: HttpClient) { }

  //GET questions from the server
//   getQuestionsList(){
//     return this.http.get('http://localhost:3000/questions')
//     .map((res: Response) =>{
//       res.json() as Questions[];
//     }).toPromise().then(x => {
//       this.questionsList = x;
//     })
// }

getQuestionsList(){
  return this.http.get('http://localhost:3000/questions')
  .map((res: Response)=>
   res.json() as Questions[]
  )
}

  //POST: Add a new question to the server
  addQuestionData(question: Questions){
    return this.http.post('http://localhost:3000/questions',question)
    .map((res: Response)=>
       res.json()
    )
  }

  //PUT: Update an user data into list
  putQuestionData(id, question: Questions){
    var body = JSON.stringify(question);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put( this.questionUrl +"/" + question.id , question)
    .map((res: Response) => res.json());
  }

  deleteQuestionData(id, question: Questions) {
    return this.http.delete(this.questionUrl +"/" + question.id )
    .map((res: Response) => res.json());
  }

}
