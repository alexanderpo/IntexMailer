import { Router } from 'express';
import { sendMail } from '../controllers/mailer';
import { getTemplates } from '../controllers/templates';
import { getSetupTemplatePage } from '../controllers/setuptemplate';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Intex Mailer' });
});

router.get('/templates', getTemplates);

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'I.M. - We Here' });
});

// GET setuptemplates page
router.get('/templates/:id', getSetupTemplatePage);

router.get('/send', sendMail);

export default router;
