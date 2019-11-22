
export default (props)=>{
	 return (
		 <img src={require(`@/assets/icon/${props.name}.svg`)} width='14px' style={props.style?props.style:null} />
	 )
}