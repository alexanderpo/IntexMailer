import { Router } from 'express';
import { sendEmail, serviceParams } from '../controllers/mailer';
import {
 getAllTemplates,
 getAnimatedTemplates,
 getResponsiveTemplates,
} from '../controllers/templates';
import { getSetupTemplatePage } from '../controllers/setuptemplate';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Intex Mailer' });
});

router.get('/templates', (req, res) => {
  res.render('templates', { title: 'I.M. - Choose category' });
});

router.get('/templates/all', getAllTemplates);

router.get('/templates/responsive', getResponsiveTemplates);

router.get('/templates/animated', getAnimatedTemplates);

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'I.M. - We Here' });
});

// GET setuptemplates page
router.get('/templates/:category/:name', getSetupTemplatePage);

router.get('/send', sendEmail);

router.get('/serviceAuth', serviceParams);

export default router;
