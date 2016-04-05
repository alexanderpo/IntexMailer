import Animated from '../fixtures/animated';
import Responsive from '../fixtures/responsive';

export function getAllTemplates(req, res) {
  const animatedTemplates = Animated.map(tem => ({
    id: tem.id,
    title: tem.title,
    year: tem.year,
    tags: tem.tags,
    image: tem.image,
    link: tem.link,
    description: tem.description,
    dataType: tem.dataType,
    dataId: tem.dataId,
  }));

  const responsiveTemplates = Responsive.map(tem => ({
    id: tem.id,
    title: tem.title,
    year: tem.year,
    tags: tem.tags,
    image: tem.image,
    link: tem.link,
    description: tem.description,
    dataType: tem.dataType,
    dataId: tem.dataId,
  }));

  const templates = responsiveTemplates.concat(animatedTemplates);

  res.render('allTemplates', {
    title: 'I.M. - Templates',
    items: templates,
  });
}

export function getAnimatedTemplates(req, res) {
  const templates = Animated.map(tem => ({
    id: tem.id,
    title: tem.title,
    year: tem.year,
    tags: tem.tags,
    image: tem.image,
    link: tem.link,
    description: tem.description,
    dataType: tem.dataType,
    dataId: tem.dataId,
  }));

  res.render('animated', {
    title: 'I.M. - Animated',
    items: templates,
  });
}

export function getResponsiveTemplates(req, res) {
  const templates = Responsive.map(tem => ({
    id: tem.id,
    title: tem.title,
    year: tem.year,
    tags: tem.tags,
    image: tem.image,
    link: tem.link,
    description: tem.description,
    dataType: tem.dataType,
    dataId: tem.dataId,
  }));

  res.render('responsive', {
    title: 'I.M. - Responsive',
    items: templates,
  });
}
