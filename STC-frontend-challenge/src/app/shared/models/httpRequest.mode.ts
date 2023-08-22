export interface HttpRequestModel {
  apiPath: string,
  urlParam?: {},
  query?: query,
  headers?: {},
  body?: {}
}

export interface query{
  page:number;
  itemsPerPage:number;
  offset:number
}

export interface HttpResponseModel<T>{
  body:T[];
  count:number

}
