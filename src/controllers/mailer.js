import nodemailer from 'nodemailer';
// import smtpTransport from './serviceAuth';

let smtpTransport;

export function sendUserMessage(req, res) {
  const userMailOption = {
    from: 'Intex-Mailer User',
    to: 'alexpojob@gmail.com',
    subject: 'User Message from Intex-Mailer',
    text:
      'User: ' + req.body.name + ' ' +
      'Email: ' + req.body.email + ' ' +
      'Phone: ' + req.body.phone + ' ' +
      'Message: ' + req.body.comments,
  };

  smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alexpojob@gmail.com',
      pass: 'blbyf[eq',
    },
  });

  smtpTransport.sendMail(userMailOption, (error) => {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      res.redirect('back');
    }
  });
}

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
