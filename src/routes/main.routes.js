import { Router } from 'express';
import { sendMail } from '../controllers/mailer';

import Templates from '../models/templates';

const router = Router();

  // create in database
  /* const template = new Templates({
    title: 'Cleave',
    category: 'Branding',
    created: Date,
  });
  template.save((err) => {
    if (err) {
      console.log(err);
    }
    console.log('template add');
  }); */

// GET defaults pages.
router.get('/', (req, res) => {
  res.render('index', { title: 'Intex Mailer' });
});

router.get('/templates', (req, res) => {
  res.render('templates', { title: 'I.M. - Templates' });

  Templates.create({
    title: 'Cleave',
    category: 'Branding',
  })
    .then(template => {
      res.json(template);
      console.log('created');
    });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'I.M. - We Here' });
});

// GET setuptemplates page
router.get('/templates/:id', (req, res) => {
  res.render('setuptemplate', { title: 'I.M. - ' + req.params.id });
});

router.get('/send', sendMail);

export default router;
