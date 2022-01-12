const { Router } = require('express');
const Todo = require('../models/Todo');
const router = Router(); // создаем роутер 

router.get('/', async (req,res)=>{
	const todos = await Todo.find({},null,{sort: {'_id': -1}}).lean(); //Функция lean() очистит результат и вернет только json без "мусора"

	res.render('index', {
		title : 'ToDos',
		isIndex : true,
		todos: todos
	});
});
router.get('/create', (req,res)=>{
	res.render('create', {
		title :'Create Task',
		idCreate: true
	});
});
router.post('/create', async (req,res)=>{
	const todo = new Todo({
		title: req.body.title
	}); 
	todo.save();
	res.redirect('/');
});
router.post('/',async (req,res)=>{
	const todo = await Todo.findById(req.body.id);
	// todo.completed = todo.completed ? false : true;
	if(todo.completed == true){
		todo.completed = false;
	}else{
		todo.completed = true;
	}
	todo.save()

	res.redirect('/');
})
module.exports = router;