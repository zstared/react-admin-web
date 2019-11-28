import * as React from "react";
import QueryItem from './QueryItem'
export interface ITablePageProps {
    isTree:boolean,
    url:string,
    data: Object,
    columns: any[],
    rowKey:string,
    loading?: any,
    onChange:(filters:object,sorter:object)=>void
    onSearch: (params: object) => void,
    buttons?: React.ReactNode,
    isView:boolean,
    viewName:string,
    triggerRef:()=>void
}
export default class TablePage extends React.Component<ITablePageProps, any>{
    public static QueryItem: typeof QueryItem
}