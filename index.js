const express = require('express');
const path = require('path');
//Server port
const PORT = process.env.PORT || 3000; 

// Для работы с Mongo DB     
const mongoose = require('mongoose'); 

//Шаблонизатор для Express
const exphbs = require('express-handlebars'); 

//Routers for main app / Маршрутизация
const todosRoutes = require('./routes/todos');

//Initializing Express app / Инициализируем Экспресс приложение.
const app = express()

const hbs = exphbs.create({
	extname: '.hbs',
	defaultLayout: 'main',
})
//For getting POST body
app.use(express.urlencoded({extended: true}));

app.engine(".hbs", hbs.engine); //Регистрируем движок для рендеринга страниц

app.use(express.static('public'));
app.set('view engine','.hbs'); // Устанавливаем движок вьюхи  

app.set('views', './views'); //Регстрируем папку где будут храниться виды(views)

//Router middlwase set
app.use(todosRoutes);

async function start(){
	try{
		await mongoose.connect('mongodb+srv://*****s');
		app.listen(PORT, ()=>{
			console.log(`Server has been started at port ${PORT}`);
		})
	}catch(e){
		console.log(e);
	}
}

start()