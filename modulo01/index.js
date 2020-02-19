const express = require('express');

const app /*server*/ = express();

app.use(express.json()); //Fazer com que o express leia json da corpo da requisição

// localhost:3000/teste
//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name":"Arthur","email": "geisweiller@gmail.coms"}

//CRUD - Create, Read, Update, Delete
const users = ['Arthur', 'Marcelo', 'Amiro'];

//Middleware Global
app.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url};`);
  

  next();

  console.timeEnd('Request');
})

function checkUserExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'Username is required'});
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if(!user) {
    return res.status(400).json({ error: 'User does not exists'});
  }
  
  req.user = user;

  return next();
}
//Ler todos os usuários
app.get('/users', (req, res) =>{ //Read
  return res.json(users);
})

//Ler um usuário específico
app.get('/users/:index', checkUserInArray, (req, res) =>{
  return res.json(req.user);
  
})
//Criar usuário
app.post('/users', checkUserExists,  (req, res)  => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});


//Editar usuário
app.put('/users/:index', checkUserExists, checkUserInArray, (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  users[index]= name;

  return res.json(users);
});

app.delete('/users/:index', checkUserInArray, (req,res) =>{
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
})

app.listen(3000);
