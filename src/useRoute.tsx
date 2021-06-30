import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import Registration from "./page/registration/contanier/Registration";
import Login from "./page/Login";
import Home from "./page/Home/Home";

const useRoute = (isAuth: boolean) => {
    if (isAuth)
        return (
            <Switch>
                <Route path={"/"} exact>
                    <Home />
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