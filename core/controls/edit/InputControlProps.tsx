interface InputChangeCallback<T> {
  (name: keyof T, value: T[keyof T], index?: number): void;
}

interface InputControlProps {
  name: string;
  className?: string;
  value?: string;
  //identifier?: string;
  index?: number;
  controlType: string;
  callback?: InputChangeCallback<any>;
  // serviceClient?: ServiceClientInterface;
  dataSourceDependsOn?: string;
  dependentValue?: string;
  dataSource?: string, //for select
  dataKeyFieldName?: string, //for select
  dataTextFieldName?: string, //for select 
  dataRecommendedValue?:string,
  dataset?:any[];
  assetsUploadPath?:string;
  prefix?:string
  attributes?: {
    pattern?: string;
    maxLength?: number;
    minLength?: number;
    readOnly?: boolean;
    label?: string;
    hintText?: string;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
    helpText?: string;
    autoFocus?: boolean;
    maxValue?:any;
  };
}

