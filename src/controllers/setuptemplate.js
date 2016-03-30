export function getSetupTemplatePage(req, res) {
  res.render('setuptemplate', {
    title: 'I.M. - ' + req.params.id,
    pageTitle: req.params.id.charAt(0).toUpperCase() + req.params.id.substr(1),
    frameURL: req.params.id,
  });
}
