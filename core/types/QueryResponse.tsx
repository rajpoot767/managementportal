interface QueryResponse<T> {
    isSuccessful?: boolean;
    message?: string;
    errorNumber?: string;
    result?: T[];
    parent?:T;
    count?:number
  }