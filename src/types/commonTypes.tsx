import { InternalNamePath } from "antd/lib/form/interface";
import { AxiosResponse } from "axios";

export type Contact = {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    avatar: string;
};

/** Тип для редактирования */
export type UserEdit = {
    avatar: string;
    email: string;
    name: string;
    phone: string
}

/** Данные авторизованного пользователя */
type UserAuth = {
    login: string;
    password: string;
}

/** Тип ошибки валидации */
export type ValidationError = {
    name: InternalNamePath;
    errors: string[];
}

/** Данные пользователя с сервера */
export type UserResponse = AxiosResponse<Contact>

/** Данные всех пользователей */
export type UsersResponse = AxiosResponse<Contact[]>

/** Запрос авторизации */
export type AuthResponse = AxiosResponse<UserAuth[]>

