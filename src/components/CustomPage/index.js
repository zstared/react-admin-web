import React, { PureComponent } from 'react'

class CustomPage extends PureComponent{
    render(){
        const {children}=this.props;
        return <div>{children}</div>
    }
}
export default CustomPage;