import nodemailer from 'nodemailer';
// import smtpTransport from './serviceAuth';

let smtpTransport;

export function serviceParams(req, res) {
  if ((req.query.user && req.query.pass) === '') {
    res.end('empty');
  } else {
    smtpTransport = nodemailer.createTransport({
      service: req.query.mailer,
      auth: {
        user: req.query.user,
        pass: req.query.pass,
      },
    });
    res.end('auth');
  }
}

export function sendEmail(req, res) {
  const queryLenght = Object.keys(req.query.to).length;

  for (let i = 0; i < queryLenght; i++) {
    const mailOptions = {
      from: 'Intex - Mailer <sender@example.com>',
      to: req.query.to[i],
      subject: req.query.subj,
      html: req.query.content,
    };

    smtpTransport.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        res.end('error');
      } else {
        console.log('Message send!');
        res.end('send');
      }
    });
  }
}
