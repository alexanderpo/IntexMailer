export function getSetupTemplatePage(req, res) {
  res.render('setuptemplate', {
    title: 'I.M. - ' + req.params.name,
    pageTitle: req.params.name.charAt(0).toUpperCase() + req.params.name.substr(1),
    frameURL: req.params.name,
  });
}
