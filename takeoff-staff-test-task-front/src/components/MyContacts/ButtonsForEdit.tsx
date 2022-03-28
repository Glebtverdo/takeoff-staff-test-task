import { IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { userAPI } from "../../store/APIs/UserAPI";
import { useState } from "react";
import ErrorAlert from "../alert/ErrorAlert";
import { userType } from "../../types";
import { changeEditText, changeShowEdit } from "../../store/slicers/EditTextSlicer";

function ButtonsForEdit(props: {id:string, name: string}) {

  const {id, name} = props;
  const {editText} = useSelector((state:RootState)=> state.editTextReducer);
  const {userId} = useSelector((state:RootState)=> state.userReducer);
  const {data: user} = userAPI.useFetchOneUserQuery(userId as string);
  const [changeContactData, {isLoading}] = userAPI.useUpdateUserContactsMutation();
  const [errorMessadge, setErrorMessadge] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  if (!editText || !editText[id]){
    dispatch(changeShowEdit({id, bool: true, str: name}))
  }
  const showEdit = editText && editText[id] ? editText[id][1] : true;
  const toggleShowEdit = () => {
    dispatch(changeShowEdit({id, bool: !showEdit, str:""}))
  }

  const changeContactName = async () => {
      if (user && user.contacts && editText){
          const newUser : userType = {...user, 
            contacts: user.contacts.map(el => el[0] === id ? [el[0], 
              editText[el[0]][0] === "" || editText[el[0]][0] === el[1] ? null : editText[el[0]][0]]
              : [...el])}
          const result = await changeContactData(newUser)
          if (result.hasOwnProperty("error"))
          {
            const {error} = result as {error: {data: string }};
            setErrorMessadge(error.data);
            setShowAlert(true);
          }else
          {
            toggleShowEdit();
          }
      }
  }
  return (<>
    { showEdit &&
    <Tooltip title="Изменить" placement="bottom">
      <IconButton 
      onClick={() => {
        toggleShowEdit();
        dispatch(changeEditText({id: id, str: name}))
      }}
      style={{alignItems: "center"}}>
        <ModeEditOutlineOutlinedIcon fontSize={"inherit"}/>	
      </IconButton>
    </Tooltip>
    }
    { !showEdit && <>
      <Tooltip title="Отменить" placement="bottom">
        <IconButton disabled={isLoading} onClick={toggleShowEdit}
        style={{alignItems: "center"}}>
          <CloseOutlinedIcon fontSize={"inherit"}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Сохранить" placement="bottom">
        <IconButton disabled={isLoading} onClick={changeContactName} 
        style={{alignItems: "center"}}>
          <SaveOutlinedIcon fontSize={"inherit"}/>
        </IconButton>
      </Tooltip>
    </>}
    <ErrorAlert errorMessadge={errorMessadge}  showAlert={showAlert}
      toggleShowAlert={()=>{setShowAlert(false)}} />
    </>)
}

export default ButtonsForEdit