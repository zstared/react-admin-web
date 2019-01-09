import React, { PureComponent } from 'react'

class CustomPage extends PureComponent{
    render(){
        const {children}=this.props;
        return <div style={{background:"#fff"}}>{children}</div>
    }
}
export default CustomPage;