export interface User {
    uid: string | undefined,
    email: string | undefined | null,
    displayName: string | undefined | null,
    userType: string,
    usersCount: number,
    enterprisesCount: number
    machinesCount: number
 }