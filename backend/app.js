const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./router/user');
const postRouter = require('./router/post');
// 설정
dotenv.config();
passportConfig();
db.sequelize
	.sync()
	.then(() => {
		console.log('database connected');
	})
	.catch(err => {
		console.log(err);
	});

// create app
const app = express();

// 미들웨어 설정
app.use(morgan('dev'));
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
	}),
);
app.use(passport.initialize());
app.use(passport.session());

// 라우터 등록
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(8080, () => {
	console.log('express sever started');
});
