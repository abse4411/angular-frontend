export class JsonResult<T>{
  public code:number;
  public message:string;
  public data:T[];
}