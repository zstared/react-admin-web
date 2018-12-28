import * as React from "react";
import QueryItem from './QueryItem'
export interface ITablePageProps {
    url:string,
    list: any[],
    columns: any[],
    loading?: any,
    onSearch: (params: object) => void,
    buttons?: React.ReactNode
}
export default class TablePage extends React.Component<ITablePageProps, any>{
    public static QueryItem: typeof QueryItem
}