const express = require('express')

require('./db/mongoose')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')

const port = process.env.PORT

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  const arboles = [
    { title: 'Olivo', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Naranjo', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Manzano', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  ];
  res.render('index', { titulo: 'Inicio', arboles:arboles, clave: variable });
});

app.get('/contacto', (req, res) => {
  res.render('contacto', { titulo: 'Contacto' });
});




app.get('/nov', (req, res) => {
  res.render('novedades', {})
})



app.use(express.json())
app.use('/api', taskRouter)
app.use('/api', userRouter)



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

