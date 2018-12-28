import React from 'react'
export interface IQueryItemProps {
    label: string,
    locale?: string
}
export default class QueryItem extends React.Component<IQueryItemProps, any>{ }