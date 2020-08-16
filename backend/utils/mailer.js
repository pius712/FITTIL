const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const transport = nodemailer.createTransport({
	host: 'smtp.naver.com',
	port: 465,
	secure: true, // upgrade later with STARTTLS
	auth: {
		user: process.env.MAIL_ID,
		pass: process.env.MAIL_PASSWORD,
	},
});

const mailOptions = (email, key) => ({
	from: 'fittil@naver.com',
	to: email,
	subject: '이메일 인증을 해주세요',
	html: `<h1>이메일 인증</h1>
  <div>안녕하세요. 누군가 FITTIL 계정에 회원가입을 시도하였습니다. 본인이 맞으시면, 확인 코드를 페이지에 입력해주세요 : ${key}</div>`,
});
const generateKey = email => {
	const key_one = crypto
		.createHash('sha512')
		.update(email)
		.digest('base64')
		.substr(0, 5);
	const key_two = crypto
		.createHash('sha512')
		.update(email)
		.digest('hex')
		.substr(0, 5);
	const key_for_verify = key_one + key_two;
	return key_for_verify;
};
exports.transport = transport;
exports.mailOptions = mailOptions;
exports.generateKey = generateKey;
