interface DataListColumn {
    label: string;
    name: string;
    controlType: string;
    enableSorting: boolean;
    // width: string;
    // format?: string;
    showAsLink?: boolean;
    linkUrlSegment?: string;
    emptyValueLabel?: string;
}

interface DataListConfiguration<T> {
    path: string;
    columns: DataListColumn[];
    dataset?: QueryResponse<any>;
    query?: { [key: string]: string }
}

interface WidgetProps{
    session:Session,
    query?: { [key: string]: string }
    params?:{[key: string]: string}
    path: string;
}

interface DataFormSection{
    name?:string;
    sectionTitle?:string;
    sectionRows:SectionRow[];
    isChildSection?:boolean;
    visible?:string;
    childSections?:DataFormSection[];
}

interface SectionRow{
    visible?:string;
    grow?:boolean;
    elements:InputControlProps[],
}
interface ChildItemsChangeParams {
    sectionName: string;
    name: string|number|symbol;
    value?: any;
    actionType: any;
    rowIndex:number;
  }
  
interface ChildItemsChangeCallback {
    (params: ChildItemsChangeParams): void;
  }