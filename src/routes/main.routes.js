// Import node module
import express from 'express';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const router = express.Router();
const smtpTransportOptions = {
  service: 'Gmail',
  auth: {
    user: 'alexpojob@gmail.com',
    pass: 'blbyf[eq',
  },
};

// GET defaults pages.
router.get('/', (req, res) => {
  res.render('index', { title: 'Intex Mailer' });
});

router.get('/templates', (req, res) => {
  res.render('templates', { title: 'I.M. - Templates' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'I.M. - We Here' });
});

// GET setuptemplates page
router.get('/templates/:id', (req, res) => {
  res.render('setuptemplate', { title: 'I.M. - ' + req.params.id });
});

router.get('/send', (req, res) => {
  const transporter = nodemailer.createTransport(smtpTransport(smtpTransportOptions));

  const mailOptions = {
    from: 'Intex - Mailer <sender@example.com>',
    to: req.query.to,
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
});

export default router;
