export interface titleTable{
    key:string,
    displayName:string
}

export interface actions{
    enable: boolean,
    delete: boolean,
    edit: boolean
}

export interface dataTable {
    titles: string[],
    data: any[],
    actions: actions
}