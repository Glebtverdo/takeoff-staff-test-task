import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer"
import Authorization from './components/Authorization/Authorization';
import MyContacts from "./components/MyContacts/MyContacts";
import AddContacts from './components/AddContacts/AddContacts';
import Error404 from './components/Error404/Error404';
import { useSelector} from "react-redux";
import { RootState} from "./store/index";


function App() {
  const {userId} = useSelector((state: RootState) => state.userReducer);
  return (
    <>
        {userId && <Footer />}
        <Routes>
          <Route path={"/"} element={<Navigate to="/authorization" />} />
          <Route path={"/authorization"} element={<Authorization />} />
          <Route path={"/mycontacts"} element={<MyContacts />} />
          <Route path={"/addcontacts"} element={<AddContacts />} />
          <Route path={"*"} element={<Error404/>} />
        </Routes>
    </>
  );
}

export default App;
