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
const noteRouter = require('./router/note');
const authRouter = require('./router/auth');
const hpp = require('hpp');
const helmet = require('helmet');
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
if (process.env.NODE_ENV === 'production') {
	app.use(morgan('combined'));
	app.use(helmet());
	app.use(hpp());
} else {
	app.use(morgan('dev'));
}
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://fittil.com'],
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
		cookie: {
			httpOnly: true,
			secure: false,
			domain: process.env.NODE_ENV === 'production' && '.fittil.com',
		},
	}),
);
app.use(passport.initialize());
app.use(passport.session());

// 라우터 등록
app.use('/user', userRouter);
app.use('/note', noteRouter);
app.use('/auth', authRouter);

app.listen(80, () => {
	console.log('express sever started');
});

// app.listen(8080, () => {
// 	console.log('express server started');
// });
