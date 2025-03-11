export const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
export const FORM_INITIAL_UPDATE = "FORM_INITIAL_UPDATE";
export const FORM_ROW_ADD = "FORM_ROW_ADD";
export const FORM_ROW_UPDATE= "FORM_ROW_UPDATE";


export interface GridFormState<T> {
  inputValues: T[]
}


type GridFormAction<T> = {
  type: typeof FORM_INPUT_UPDATE | typeof FORM_INITIAL_UPDATE | typeof FORM_ROW_ADD | typeof FORM_ROW_UPDATE;
  name?: keyof T;
  index?: number;
  value?: any;//T[keyof T];
  values?: T[];
  row?:T;
};

function GridFormReducer<T>(state: GridFormState<T>, action: GridFormAction<T>): GridFormState<T> {
  if (action.type === FORM_INPUT_UPDATE) {

    let updatedValues = [...state.inputValues];
    if (action.index!=undefined && action.index!=null && action.name) {
      updatedValues[action.index][action.name] = action.value;
    }
    return {
      inputValues: updatedValues,
    };
  }
  else if (action.type == FORM_INITIAL_UPDATE) {
    return {
      inputValues: [...action.values!],
    };
  }
  else if (action.type == FORM_ROW_ADD) {
    let newRow = {};
    if(action.row)
    {
      newRow=action.row;
    }
    return {
      // @ts-ignore
      inputValues: [...state.inputValues,newRow],
    };
  }
  else if (action.type == FORM_ROW_UPDATE) {
    
    let updatedValues = [...state.inputValues];
    if (action.index!=undefined && action.index!=null && action.row) {
      console.log("updated");
      updatedValues[action.index] = action.row!;
    }
    return {
      // @ts-ignore
      inputValues: updatedValues
    };
  }
  
  else {
    return state;
  }
};


export default GridFormReducer;
