import React, {useState} from "react";
import {MainNavBar} from "./MainNavBar";
import {Outlet} from "react-router-dom";
import {UserContext} from "./context/UserContext";
import Image from 'react-bootstrap/Image'

export function ISRApp(){
    let [user, setUser] = useState({"username":""});
    return  <UserContext.Provider value={[user,setUser]}>
                <div>
                    <MainNavBar/>
                </div>
                <div>
                    <Outlet/>
                </div>
            </UserContext.Provider>
}
