import path from 'node:path';
import express from 'express';
import createHttpError from 'http-errors';
import logger from 'morgan';
import nodemailer from 'nodemailer';
import mainRouter from './routes/index.js';

const server = express();

server.set('views', path.resolve('./http/views'));
server.set('view engine', 'ejs');

server.use(logger('dev'));

server.use(express.static(path.resolve('./http/public')));
server.use(express.json());

server.use('/', mainRouter);

server.post('/api/feedback', async (req, res) => {
	try {

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			secure: true,
			auth: {
				user: "evgenij.nechujveter@gmail.com",
				pass: "katlnyqvsuziceny",
			}
		});

		const {name, phone, message } = req.body;

		await transporter.sendMail({
			from: "evgenij.nechujveter@gmail.com",
			to: "evgenij.nechujveter@gmail.com",
			subject: "Тема письма",
			text: `${name} - ${phone} - ${message}`,
			html:
			`
			<p>${name}</p>
			<p>${phone}</p>
			<p>${message}</p>
			`
		});

		return res.status(200).send({
			status: '200',
			message: 'Успішна відправка'
		})

	} catch (e) {
		return res.status(500).send({
			status: 500,
			message: e.message,
		})
	}
})

server.use((req, res, next) => {
	next(createHttpError(404));
})

// error hendler - midleware для обробки помилок. Тобто спочатку вище формуємо помилку, а потім всі помилки передаються сюди
server.use((err, req, res, next) => {
	const {status = 404, message} = err; // Беремо статус помилки
	console.error(status);
	console.error(message);

	res.status(status); // Встановлюємо статус відповіді
	res.render('error', {errorStatus: status, message}); // Передаємо статус і повідомлення в шаблон
});

export default server;