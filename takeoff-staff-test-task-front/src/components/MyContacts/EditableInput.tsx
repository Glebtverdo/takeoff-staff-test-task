import { TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { changeEditText } from "../../store/slicers/EditTextSlicer";
import { RootState } from "../../store/index";
import { useState } from "react";

function EditableInput(props: {text:string, id:string}) {
  const {text, id} = props;
  const {editText} = useSelector((state:RootState)=> state.editTextReducer);
  const dispatch = useDispatch()
  const [val, setVal] = useState(text)

  return (<>
    {editText && editText[id] && editText[id][1] && <Typography>
        {text}
    </Typography>}
    {editText &&  editText[id] && !editText[id][1] && <TextField size="small"
    value={val}
    onChange={(e)=> {
      setVal(e.target.value);
      let str = e.target.value.trim();
      if(str === "")
      {
        str = text
      }
      dispatch(changeEditText({str: str, id}))
      }}/>}
  </>)
}

export default EditableInput