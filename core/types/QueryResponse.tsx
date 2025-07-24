export interface QueryResponse<T> {
    isSuccessful?: boolean;
    message?: string;
    errorNumber?: string;
    result?: T;
    count?:number
  }