const express = require('express');
const notFound = require('./notFoundMiddleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let persons = [

	{
		id: 1,
		name: 'Luis',
		lastname: 'Mejias',
		age: 22,
		email: 'luigimejias@gmail.com',
		address: {
			street: 'MainStreet123',
			country: 'Venezuela',
		}
	},
	{
		id: 2,
		name: 'Maria',
		lastname: 'Magdalena',
		age: 30,
		email: 'mariamagda@gmail.com',
		address: {
			street: 'MainStreet321',
			country: 'Venezuela',
		}
	},
	{
		id: 3,
		name: 'Jose',
		lastname: 'Jose',
		age: 45,
		email: 'josejose@gmail.com',
		address: {
			street: 'LastStreet123',
			country: 'Colombia',
		}
	},

]


app.get('/', (req, res) => {
	res.type('html');
	res.send('<h1>Bienvenido a mi API de prueba</h1>');
})


app.get('/api/persons', (req, res) => {
	res.type('json');
	res.json(persons);
})


app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find(person => person.id === id);

	if(!person) {
		res.status(404).type('html');
		res.send('<h1>The person not exists</h1>');
	} else {
		res.status(200).type('json');
		res.json(person);
	}
})


app.post('/api/persons/', (req, res) => {
	const person = req.body;

	if(!person) {
		return res.status(400).json({
			error: 'The content is empty'
		})
	}

	const ids = persons.map(person => person.id);
	const maxId = Math.max(...ids);

	const newPerson = {
		id: maxId + 1,
		name: person.name,
		lastname: person.lastname,
		age: person.age,
		email: person.email,
		address: {
			street: person.address.street,
			country: person.address.country
		}
	}

	persons = persons.concat(newPerson);
	res.json(person);
    
	console.log(person);

})


app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter(person => person.id !== id);
	res.status(204).type('json').end();
})

app.use(notFound);

app.listen(PORT, (err) => {
	if(err) console.log(err);
	console.log(`Server is running on port ${PORT}`);
})

