export interface PasswordRequest {
    emailUsuario: string;
}

export interface PasswordUpdate {
    restoreToken: string;
    passwordUsuario: string;
}
