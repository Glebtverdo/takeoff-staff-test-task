import { useEffect, useState} from "react";
import MyInput from "../input/MyInput";
import { userType, myInputPropType } from "../../types";
import { userAPI } from "../../store/APIs/UserAPI";
import { changeUserId} from "../../store/slicers/UserSlicer";
import { useDispatch,  useSelector} from "react-redux";
import { RootState} from "../../store/index";
import ErrorAlert from "../alert/ErrorAlert";
import {Box, Button, Typography, Container} from "@mui/material";
import {styled} from "@mui/material/styles";
import { Navigate } from "react-router-dom";

const FlexBox = styled(Box)(({theme}) => ({
  display: "flex"
}))

function Authorization(){	
  const dispatch = useDispatch();
  const [isReg, setIsReg] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessadge, setErrorMessadge] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [myError, setMyError] = useState(false);
  const {userId} = useSelector((state: RootState) => state.userReducer);
  const {data: users} = userAPI.useFetchAllUsersArrayQuery(null);
  const {data: isValidUser} = userAPI.useFetchOneUserQuery(userId as string);
  const [tryRegistration, {isError: isRegError}] = userAPI.useRegisterNewUserMutation();
  const acceptButton = isReg ? "Зарегистрироваться" : "Войти"
  const changeMenuButton = isReg ? "Уже есть аккаунт" : "Зарегистрироваться"
  const Logo = isReg ? "Регистрация" : "Вход"

  useEffect(() => {
    if (nameValue !== "" && passwordValue !== "")
    {
      setIsValid(true);
    }
    else
    {
      setIsValid(false);
    }
  }, [nameValue, passwordValue])

  const toggleReg = () =>{
    setIsReg(!isReg);
  }

  const inputsArr : myInputPropType[] = [{
      name: "Имя",
      callback: setNameValue, 
      pattern: /^[a-zA-Z1-9]/,
      type:"text",
      id:"modalName"
    },
    {
      name: "Пароль",
      callback: setPasswordValue, 
      pattern: /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/,
      type:"password",
      id:"modalPassword"
    }];

  const content = inputsArr.map(el => <MyInput key={el.name} data={el} />)

  const logInOrSingIn = async () => {
      setShowAlert(true)
      setMyError(false);
      const isAlreadyUser = users ? users.find(user => user.name === nameValue) : false;
      if(isReg){
        if (!isAlreadyUser){
          let result = await tryRegistration({name: nameValue, password: passwordValue, contacts: null});
          if (result.hasOwnProperty("error")){
            const {error} = result as {error: {data: string }};
            setErrorMessadge(error.data);
          }else{
            let {data} = result as {data: userType}
            dispatch(changeUserId(data.id))
            localStorage.setItem("userId", data.id)
          }
        }
        else{
          setMyError(true);
          setErrorMessadge("Пользователь с таким именем уже существует");
        }
      }else{
        if (isAlreadyUser){
          let isCorrectPassword = isAlreadyUser.password === passwordValue;
          if(isCorrectPassword){
            dispatch(changeUserId(isAlreadyUser.id))
            localStorage.setItem("userId", isAlreadyUser.id)
          }else{
            setMyError(true);
            setErrorMessadge("Неверный пароль");
          }
        }else{
          setMyError(true);
          setErrorMessadge("Пользователя с таким именем не существует");
        }
      }
  }

  return(
    <>
      {isValidUser && <Navigate replace={true} to="/mycontacts" />}
      <Container style={{display:"flex", justifyContent: "center", minHeight: "95vh", alignItems:"center"}}>
        <Box maxWidth="md" style={{minWidth:"50%"}}>
          <Typography sx={{textAlign:"center"}}>{Logo}</Typography>
          <FlexBox sx={{flexDirection:"column"}}>
            {content}
          </FlexBox>
          <FlexBox sx={{justifyContent: "space-between", marginTop:"5vh"}}>
            <Button onClick={toggleReg}>{changeMenuButton }</Button>
            <Button disabled={!isValid} onClick={logInOrSingIn}>{acceptButton}</Button>
          </FlexBox>
        </Box>
        <ErrorAlert errorMessadge={errorMessadge}  showAlert={(isRegError || myError) && showAlert}
          toggleShowAlert={()=>{setShowAlert(false)}} />
      </Container>
    </>
  )
}

export default Authorization;