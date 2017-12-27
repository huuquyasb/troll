
export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }

export interface User {
    uid: string;
    email: string;
    displayName: string;
    logintype: string;
    roles: Roles;
}