import {PureComponent} from 'react';


class BasicLayout extends PureComponent{
    
    render(){
        const children=this.props.children;
        return <div>{children}</div>
    }
}

export default BasicLayout