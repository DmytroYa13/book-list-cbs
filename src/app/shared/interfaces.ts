export interface Author {
    firstName: string
    middleName?: string
    lastName: string
    dateOfBirth: Date
    bookList?: Book[]
    id?: string
}

export interface Book {
    title: string
    pages: number
    genre: string
    id?: string
}

export interface SearchBook {
    title: string
    authorId: string
}

export interface fbResponse {
    name: string
}

export interface Genre {
    name: string
    id?:string
}