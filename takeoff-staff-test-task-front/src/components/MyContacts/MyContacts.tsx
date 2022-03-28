import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userAPI } from "../../store/APIs/UserAPI";
import { RootState } from "../../store/index";
import { Button, CircularProgress, Container, Typography} from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import ErrorAlert from "../alert/ErrorAlert";
import EditableInput from "./EditableInput";
import ButtonsForEdit from "./ButtonsForEdit";

function MyContacts() {
  const {userId} = useSelector((state: RootState) => state.userReducer);
  const {data: allUsers, isLoading} = userAPI.useFetchAllUsersMapQuery(null);
  const {data: user} = userAPI.useFetchOneUserQuery(userId as string);
  const [delContact, {isLoading: isContactDeleting}] = userAPI.useUpdateUserContactsMutation();
  const [errorMessadge, setErrorMessadge] = useState("");
  const [showAlert, setShowAlert] = useState(false);


  const deleteContact = async (id: string) => {
    if (user && user.contacts){
      const newContacts = user.contacts.filter(el => el[0] !== id);
      const newUser = {...user, contacts: newContacts.length === 0 ? null : newContacts}
      const result = await delContact(newUser)
      if (result.hasOwnProperty("error"))
      {
        const {error} = result as {error: {data: string }};
        setErrorMessadge(error.data);
        setShowAlert(true);
      }
    }
  }

  return(<>
    {isLoading && <CircularProgress size={100} style={{marginLeft:"calc(50% - 75px)", marginTop:"8vh"}}/>}
    {!isLoading && <>
    { !userId && <Navigate to={"/authorization"} />}
    <Container maxWidth="md" style={{marginTop:"8vh"}}>
     
      {!isLoading && user && user.contacts && allUsers && user.contacts.map((el, index) => {
        if (allUsers[el[0]]){
          const name = el[1] ?? allUsers[el[0]]
          return (<Box key={el[0]} style={{display: "flex", justifyContent: "space-between",
           alignItems:"center", borderBottom:"1px solid black" }} >
            <Box style={{display: "flex", alignItems:"center" }}>
              <Typography sx={{margin: "2vh"}}>{index + 1}</Typography>
              <EditableInput id={el[0]} text={name}/>
              {el[1] && 
                <Typography sx={{margin: "2vh", display: {xs: "none", md: "flex"}}}>
                  Имя в системе: {allUsers[el[0]]}
                </Typography>}
            </Box>
            <Box style={{display: "flex", justifyContent: "flex-end"}}>
              <ButtonsForEdit id={el[0]} name={name} />
              <Button sx={{fontSize: {xs:"0.5em", sm: "1em"}}} variant="contained" color="error"
              onClick={() => deleteContact(el[0])} disabled={isContactDeleting}>
                Удалить из контактов
              </Button>
            </Box>
          </Box> 
          )
        }
        else {
          return null
        }
      })}
      {user && !user.contacts && <Typography variant="h3" style={{textAlign: "center"}}> У вас пока нет контактов </Typography>}
    </Container>
    <ErrorAlert errorMessadge={errorMessadge}  showAlert={showAlert}
    toggleShowAlert={()=>{setShowAlert(false)}} />
    </>}
  </>)
}

export default MyContacts;