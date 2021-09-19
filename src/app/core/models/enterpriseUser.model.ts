export interface enterpriseUser{
    id?: string | undefined,
    enterpriseId: string | null,
    isActive: boolean,
    displayName: string,
    userName: string | undefined | null,
    pass: string,
    userType: string,
}