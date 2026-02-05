export type UserEntry = {
    _id?: string; //optionnel, généré par MongoDB
    email: string,
    password: string,
    role: "user" | "admin"
}