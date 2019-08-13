const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const uuid = require('uuid/v3');
const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const users = {};

app.get('/:username/data', (req, res) => {
  if(!users[req.params.username]){
    users[req.params.username] = [];
  }
  res.json(users[req.params.username]); 
})

app.get('/:username/data/:id', (req, res) => {
  if(!users[req.params.username]){
    users[req.params.username] = [];
  }
  const userItems = users[req.params.username];
  const item = userItems.find(item => item.id === req.params.id);
  if(item){
    res.json(item);
  }else{
    res.status(404).send('Item no encontrado');
  }
})

app.post('/:username/data', (req, res) => {
  if(!users[req.params.username]){
    return res.status(401).send(`Estás tratando de acceder a una lista invalida`);
  }
  if(!req.body.data){
    return res.status(401).send(`Para crear un item debes enviar un parámetro data en el body`);
  }
  const newItem = {id: uuid(), data: req.body.data};
  users[req.params.username].push(newItem);
  res.status(201).json(newItem);
})

app.put('/:username/data/:id', (req, res) => {
  if(!users[req.params.username]){
    return res.status(401).send(`Estás tratando de acceder a una lista invalida`);
  }
  if(!req.params.id){
    return res.status(401).send(`ID inválido`);
  }
  if(!req.body.data){
    return res.status(401).send(`Para actualizar un item debes enviar un parámetro data en el body`);
  }
  const itemToUpdate = users[req.params.username].find(item => item.id === req.params.id);
  if(!itemToUpdate){
    return res.status(404).send(`Item no encontrado`);
  }
  const newItem = Object.assign({}, itemToUpdate, {data: Object.assign({}, itemToUpdate.data, req.body.data)});
  users[req.params.username] = users[req.params.username].map(item => {
    if(item.id === newItem.id){
      return newItem;
    }
    return item;
  })
  res.status(200).json(newItem);
})

app.delete('/:username/data/:id', (req, res) => {
  if(!users[req.params.username]){
    return res.status(401).send(`Estás tratando de acceder a una lista invalida`);
  }
  if(!req.params.id){
    return res.status(401).send(`ID inválido`);
  }
  const item = users[req.params.username].find(item => item.id === req.params.id);
  if(!item){
    return res.status(404).send(`Item no encontrado`);
  }
  users[req.params.username] = users[req.params.username].filter(item => item.id !== req.params.id);
  res.status(204).send();
})

app.listen(port, function(){
  console.log('Server is running');
})
