// Import node module
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', { title: 'Intex Mailer' });
});

/* GET templates page. */
router.get('/templates', (req, res) => {
	res.render('templates', { title: 'Intex Mailer-Templates' });
});

router.get('/templates/:id', (req, res) => {
	res.render('setuptemplate', { title: 'Intex Mailer - ' + req.params.id });
});

/* GET contact page. */
router.get('/contact', (req, res) => {
	res.render('contact', { title: 'Intex Mailer-We Here' });
});
// Exporting an object as the default import for this module
export default router;
