import {Typography} from "@mui/material"
import {NavLink} from "react-router-dom";

function Error404(){
	return(
		<>
			<Typography style={{textAlign:"center"}} variant="h1">Error 404</Typography>
			<NavLink style={{textDecoration:"none", textAlign:"center", display: "inherit"}} to={"/"}>Вернуться  в личный кабинет</NavLink>
		</>
	)
}

export default Error404;