import React, {useEffect} from 'react';
import './App.css';
import useRoute from "./useRoute";
import useActions from "./hooks/useActions";
import useTypedSelector from "./hooks/useTypedSelector";
import {io} from "socket.io-client";


function App() {
    const socket = io(window.location.origin.replace("3000", "5000"))

    const {fetchCheckAuthUser} = useActions()
    const isAuth = useTypedSelector<boolean>(({user}) => user.isAuth)
    const isLoading = useTypedSelector<boolean>(({user}) => user.loading)
    const routes = useRoute(isAuth)

    useEffect(() => {
        if(localStorage.getItem("accessToken"))
            fetchCheckAuthUser()
    }, [])

    return (
        <>
            {isLoading ? <h1>"Загрузка!!!"</h1> : routes}
        </>
    );
}

export default App;
