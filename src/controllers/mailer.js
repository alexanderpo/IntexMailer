import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const smtpTransportOptions = {
  service: 'smtp.gmail.com',
  auth: {
    user: 'alexpojob@gmail.com',
    pass: 'blbyf[eq',
  },
};

export function sendMail(req, res) {
  const transporter = nodemailer.createTransport(smtpTransport(smtpTransportOptions));
  const queryLenght = Object.keys(req.query.to).length;

  for (let i = 0; i < queryLenght; i++) {
    const mailOptions = {
      from: 'Intex - Mailer <sender@example.com>',
      to: req.query.to[i],
      subject: 'Intex Mailer Template',
      html: req.query.content,
    };

    transporter.sendMail(mailOptions, (err) => {
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
