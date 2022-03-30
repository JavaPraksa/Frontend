export class User{
    constructor(
        public username: string,
        public password: string,
        public confirmPassword: string,
        public firstName: string,
        public lastName: string,
        public email: string
    ){}
}