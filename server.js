const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const dotenv=require('dotenv');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const env=dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
  	ssl: {rejectUnauthorized: false},
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PWD,
    database : process.env.DB_DATABASE
  }
});

const app=express();
const LISTEN_PORT=process.env.LISTEN_PORT || 3000;

app.use(express.json());
app.use(cors());

app.get ('/', (req,res) => { res.send('it is working') });
app.post('/signin', signin.handleSignin(db, bcrypt));  // advance JS function call
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get ('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put ('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/face-detection', (req, res) => {image.handleClarifieFaceDetetion(req, res) });

app.listen(LISTEN_PORT, () => {
	console.log('app is running on port ', LISTEN_PORT);
});

/*
/         --> GET res = this is working
/signin   --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user  
/image    --> PUT = user
*/

