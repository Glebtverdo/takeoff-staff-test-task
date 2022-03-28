import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { userAPI } from "../../store/APIs/UserAPI";
import { Navigate } from "react-router-dom";
import { Typography, Box, Button, Container, CircularProgress} from "@mui/material";
import {useState} from "react";
import ErrorAlert from "../alert/ErrorAlert";
import { userType } from "../../types";
import SearchBar from "./SearchBar";

function AddContacts() {
  const {data: allUsers, isLoading: isAllUsersLoading} = userAPI.useFetchAllUsersArrayQuery(null);
  const {userId} = useSelector((state: RootState) => state.userReducer);
  const {data: user, isLoading: isUserLoading} = userAPI.useFetchOneUserQuery(userId as string);
  const setOfAlreadyContacts = user && user.contacts ? new Set<string>() : null;
  const [changeContactData, {isLoading: isContactChanging}] = userAPI.useUpdateUserContactsMutation();
  const [errorMessadge, setErrorMessadge] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  if (setOfAlreadyContacts && user && user.contacts){
    user.contacts.forEach(el => {
      setOfAlreadyContacts.add(el[0]);
    });
  }

  const filterdAllUSers = (() => {
    if (user && allUsers){
      if (setOfAlreadyContacts){
        if(searchStr !== ""){
          return allUsers.filter(el => {
          const lowSearchStr = searchStr.toLowerCase();
          const lowElName = el.name.toLowerCase();
          const accept = lowElName.indexOf(lowSearchStr) === 0 ? true : false
          return !setOfAlreadyContacts.has(el.id) && el.id !== user.id && accept;
        })
        }
        return allUsers.filter(el => !setOfAlreadyContacts.has(el.id) && el.id !== user.id)
      }else
      {
        if(searchStr !== ""){
          return allUsers.filter(el => {
          const lowSearchStr = searchStr.toLowerCase();
          const lowElName = el.name.toLowerCase();
          const accept = lowElName.indexOf(lowSearchStr) === 0 ? true : false
          return el.id !== user.id && accept;
        })
        }
        return allUsers.filter(el => el.id !== user.id)
      }
    }else
    {
      return false
    }
  })()

  const addContact = async (id: string) => {
    if (user){
      let newUser: userType;
      if (user.contacts) {
        newUser = {...user, contacts: user.contacts.map(el => [...el])}
      }
      else
      {
        newUser = {...user, contacts: []}
      }
      if (newUser.contacts){
        newUser.contacts.push([id, null]);
        console.log( newUser);
        const result = await changeContactData(newUser)
        if (result.hasOwnProperty("error"))
        {
          const {error} = result as {error: {data: string }};
          setErrorMessadge(error.data);
          setShowAlert(true);
        }
    }
    }
  }

  const searchString = (searchString: string) => {
    setSearchStr(searchString)
  }

  return (<>
      {(isAllUsersLoading || isUserLoading) && <CircularProgress size={100} style={{marginLeft:"calc(50% - 75px)", marginTop:"8vh"}}/>}
      {!isAllUsersLoading && !isUserLoading && <>
      {!userId && <Navigate to={"/authorization"} />}
      <Container maxWidth="md" style={{marginTop:"8vh"}}>
          <SearchBar makeNewArr={searchString} />
        {filterdAllUSers && filterdAllUSers.map((el, index) => {
          return <Box key={el.id} style={{display: "flex", justifyContent: "space-between", alignItems:"center" }} >
          <Box style={{display: "flex" }}>
            <Typography sx={{margin: "2vh"}}>{index + 1}</Typography>
            <Typography sx={{margin: "2vh"}}>{el.name}</Typography>
          </Box>
          <Button sx={{fontSize: {xs:"0.5em", sm: "1em"}}} variant="contained" color="success" onClick={() => addContact(el.id)} disabled={isContactChanging}>
            Добавить в контакты
          </Button>
          </Box> 
        })}
        {searchStr === "" && (!filterdAllUSers || filterdAllUSers.length === 0) && <Typography variant="h3" style={{textAlign: "center"}}> Все пользователи уже в списке ваших контактов</Typography>}
        {searchStr !== "" && (!filterdAllUSers || filterdAllUSers.length === 0) && <Typography variant="h3" style={{textAlign: "center"}}> Пользователей с таким именем не существует</Typography>}
      </Container>
      <ErrorAlert errorMessadge={errorMessadge}  showAlert={showAlert}
      toggleShowAlert={()=>{setShowAlert(false)}} /> </> }
  </>)
}
export default AddContacts;