import api from "../../http";
import axios from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import {RegistrationRequest} from "../../models/request/RegistrationRequest";
import {LoginRequest} from "../../models/request/LoginRequest";
import instance from "../../http";
import {IUser} from "../../models/IUser";

export default {
    searchNewUser: (filter: string) => instance.get<IUser[]>(`/users/searchNewUser?name=${filter}`),
    registration: (user: RegistrationRequest) => axios.post<AuthResponse>("/users/registration", user),
    login: (user: LoginRequest) => axios.post<AuthResponse>("/users/login", user),
    logout: () => axios.get<AuthResponse>("/users/logout"),
    checkAuthUser: () => axios.get<AuthResponse>("/users/refresh", {withCredentials: true})
}
