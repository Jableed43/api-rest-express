export default class User{
    nombre;
    email;
    password;
    edad;

    constructor(nombre, email, password, edad){
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.edad = edad;
    }
}