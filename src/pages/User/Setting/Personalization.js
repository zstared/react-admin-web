import React, { PureComponent } from 'react'
import { FormattedMessage } from 'umi/locale'
class Personalization extends PureComponent{
    render(){
        return <h2><FormattedMessage id="menu.setting.personalization"/></h2>
    }
}
export default Personalization;