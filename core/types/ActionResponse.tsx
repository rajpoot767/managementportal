interface ActionResponse<T> {
    isSuccessful?: boolean;
    message?: string;
    errorNumber?: string;
    result?: T;
    keepRunningIndicator?:boolean
  }