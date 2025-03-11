interface SingleResponse<T> {
    isSuccessful?: boolean;
    message?: string;
    errorNumber?: string;
    result?: T;
  }