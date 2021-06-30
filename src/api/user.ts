import api from "../http";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {RegistrationRequest} from "../models/request/RegistrationRequest";
import {LoginRequest} from "../models/request/LoginRequest";

export default {
    registration: (user: RegistrationRequest) => api.post<AuthResponse>("/api/registration", user),
    login: (user: LoginRequest) => api.post<AuthResponse>("/api/login", user),
    logout: () => api.get<AuthResponse>("/api/logout"),
    checkAuthUser: () => axios.get<AuthResponse>("/api/refresh", {withCredentials: true})
}