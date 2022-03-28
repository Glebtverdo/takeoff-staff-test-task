import {MenuItem} from "@mui/material"
import { NavLink } from "react-router-dom";

function Links(props: {color: string, close: () => void, hasBorder: boolean}){
  const {color, hasBorder, close} = props
  const linksNames = [
    {
      name: "Мои контакты",
      link: "/mycontacts"
    },
    {
      name: "Добавить контакты",
      link: "/addcontacts"
    }
  ]



  return(
    <>
      {
      linksNames.map(el => {return (
        <NavLink key={el.name} onClick={close} to={el.link} style={({isActive}) => ({
          color:color,
          borderStyle: hasBorder ? isActive ? "inset" : "solid" : "none", 
          borderColor: isActive ? "#6d7682" : "#505a66",
          borderSize: "1px",
          textDecoration: "none"
        })}>
          <MenuItem>{el.name}</MenuItem>
        </NavLink>
      )})
      }
    </>
  )
}

export default Links;