// express permite levantar un servidor en nuestra aplicacion de node
import express from "express";
// path te permite acceder a archivos de tu carpeta raiz
import path from 'path'
// clase user
import User from "./User.js";
// filesystem
import fs from "fs";

function data() { return JSON.parse(fs.readFileSync('./data.json'))}

// genera la ruta de donde te encontras actualmente
var __dirname = path.resolve();

//ejecutamos el servidor
const app = express();

// app.use implementan funciones globales
//express.json permite que las respuestas se puedan dar en archivos json
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//estableces el puerto donde levantas el servidor
app.listen(8080, () => console.log(`Server listening on port 8080`));

// estableciendo una ruta -> localhost:8080/
// res = response / respuesta
// req = request / pedido

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.post('/', function(req, res) {
 console.log(req.body);
 
 //los datos que llegan por post
 // cada propiedad corresponde al nombre de un imput como x ej. email
 var name = req.body.nombre 
 var email = req.body.email 
 var password = req.body.password 
 var age = req.body.age

let user = new User(name, email, password, age);

let newList = [...data(), user]

fs.writeFileSync("./data.json", JSON.stringify(newList, null, 2));

res.send({data: user, status: 200});
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/login.html'));
  });

app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const userFound = data().find(user => user.email === email )

    if(userFound.password === password){
        res.send('usuario loggeado')
    } else {
        res.send('contraseña no valida')
    }

});
