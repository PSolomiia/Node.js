const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'static')));

app.engine('.hbs', expHbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));



const users = []
const houses = []



app.get('/register', (req, res) => {
    res.render('main_register', {layout: false})
});

app.post('/register', (req, res) => {
    const anotherUser = req.body;
    anotherUser.user_id = users.length + 1;
    users.push(anotherUser)
    console.log(anotherUser);
    res.render('main_register', {layout: false})
});


app.get('/login', (req, res) => {
    res.render('main_login', {layout: false})
});

app.post('/login', (req, res) =>{
    const userLogin = req.body;
    const someUser = users.find(user => user.email === userLogin.email && user.password === userLogin.password);
    res.redirect(`/users/${someUser.user_id}`);
})


app.get('/users/:id', (req, res) => {
    const findUser = users.find(value => +  req.params.id === value.user_id);
    res.json(findUser)
});


app.get('/house', (req, res) => {
    res.render('main_houses', {layout: false})
});

app.post('/house', (req, res) => {
    const house = req.body;
    house.house_id = houses.length + 1;
    houses.push(house);
    res.redirect(`/house/${house.house_id }`);
});

app.get('/house/:house_id', (req, res) => {
    const findHouse = houses.find(value => +req.params.house_id === value.house_id);
    res.json(findHouse);
});


app.all('*', (req, res) => {
    res.json('NOT FOUND');
});

app.listen(3000, () => {
    console.log(3000);
})