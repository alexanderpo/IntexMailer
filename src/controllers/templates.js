import Templates from '../fixtures/templates';

export function getTemplates(req, res) {
  const templates = Templates.map(tem => ({
    id: tem.id,
    title: tem.title,
    year: tem.year,
    tags: tem.tags,
    image: tem.image,
    link: tem.link,
  }));

  res.render('templates', {
    title: 'I.M. - Templates',
    items: templates,
  });
}
