import React, {useState, createContext, useEffect, useCallback} from "react";
import axios from "axios";
export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({children}) => {
    const [Otoritas, setOtoritas] = useState(0)
    const User = JSON.parse(localStorage.getItem('user'));

    const CekIsLogin = useCallback(() => {
        if(User !== null){
            setOtoritas(User.otoritas)
        }else{
            setOtoritas(0)
        }
    }, [Otoritas])

    useEffect(() => {
        CekIsLogin();
    }, [CekIsLogin])

    const GlobalState = {Otoritas, setOtoritas};
    return (
      <GlobalStateContext.Provider value={GlobalState}>
        {children}
      </GlobalStateContext.Provider>
    );
  
}