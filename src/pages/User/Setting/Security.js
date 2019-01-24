import React, { PureComponent } from 'react'
import { FormattedMessage } from 'umi/locale'
class Security extends PureComponent{
    render(){
        return <h2><FormattedMessage id="menu.setting.security"/></h2>
    }
}
export default Security;