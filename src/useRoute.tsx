import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import Registration from "./page/registration/contanier/Registration";
import Login from "./page/Login";
import Home from "./page/Home";
import MyProfile from "./page/MyProfile";

const useRoute = (isAuth: boolean, initialized: boolean) => {
    if(!initialized)
        return <h1>"Загрузка!!!"</h1>

    if (isAuth)
        return (
            <Switch>
                <Route exact path={"/"}>
                    <Home />
                </Route>
                <Route path={"/myProfile"}>
                    <MyProfile />
                </Route>
                <Redirect to={"/"} />
            </Switch>
        )

    return (
        <Switch>
            <Route
                path={"/registration"}
                exact
            >
                <Registration/>
            </Route>
            <Route
                path={"/login"}
                exact
            >
                <Login/>
            </Route>
            <Redirect to={"/login"}/>
        </Switch>
    )
}

export default useRoute