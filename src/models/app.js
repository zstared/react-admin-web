import defaultSettings from '../defaultSettings'
export default{
    namespace:'app',
    state:{
        collapsed:false,
        siderStyle:defaultSettings.siderStyle
    },
    effects:{

    },
    reducers:{
        toggleCollapsed(state,{payload}){
            return {
                ...state,
                collapsed:payload
            }
        }
    }

}