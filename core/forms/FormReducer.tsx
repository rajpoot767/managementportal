export const FORM_INITIAL_UPDATE = "FORM_INITIAL_UPDATE";
export const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
export const FORM_CHILD_INPUT_UPDATE = 'FORM_CHILD_INPUT_UPDATE';
export const FORM_CHILD_ROW_ADD = 'FORM_CHILD_ROW_ADD';
export interface FormState<T> {
  inputValues: T
}

// type FormAction = {
//   type: typeof FORM_INPUT_UPDATE | typeof FORM_INITIAL_UPDATE;
//   name: string;
//   value: any
// };

type FormAction<T> = {
  type: typeof FORM_INPUT_UPDATE | typeof FORM_INITIAL_UPDATE | typeof FORM_CHILD_INPUT_UPDATE | typeof FORM_CHILD_ROW_ADD;
  name: keyof T;
  value?: T[keyof T];
  values?: T;
  childName?: string;
  rowIndex?: number;
};
function setNestedProperty<T>(obj: T, path: string, value: any): T {
  if (path.includes('.')) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    // @ts-ignore
    const lastObj = keys.reduce((o, k) => (o[k] = o[k] || {}), obj);
    // @ts-ignore
    if (lastKey) lastObj[lastKey] = value;
    return obj;
  } else {
    return {
      ...obj,
      [path]: value
    };
  }
}



function FormReducer<T>(state: FormState<T>, action: FormAction<T>): FormState<T> {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = setNestedProperty(state.inputValues, action.name.toString(), action.value);
    // const updatedValues = {
    //   ...state.inputValues,
    //   [action.name]: action.value,
    // };
    return {
      inputValues: updatedValues,
    };
  }
  else if (action.type == FORM_INITIAL_UPDATE) {
    return {
      inputValues: { ...action.values! },
    };
  }
  else if (
    action.type == FORM_CHILD_INPUT_UPDATE
  ) {
    // @ts-ignore
    const updatedChildItems = state.inputValues[action.childName!].map((childItem, index) => {
      if (index === action.rowIndex!) {
        return { ...childItem, [action.name]: action.value };
      }
      return childItem;
    });


    const updatedValues = {
      ...state.inputValues,
      [action.childName!]: updatedChildItems
    };

    return {
      inputValues: updatedValues,
    };

  }
  else if (
    action.type == FORM_CHILD_ROW_ADD
  ) {

    let updatedChildItems = [{}];
    // @ts-ignore
    if (state.inputValues[action.childName!] != undefined) {
      // @ts-ignore
      updatedChildItems = [...state.inputValues[action.childName!], {}];
    }

    const updatedValues = {
      ...state.inputValues,
      [action.childName!]: updatedChildItems
    };

    return {
      inputValues: updatedValues,
    };

  }
  else {
    return state;
  }
};


export default FormReducer;
