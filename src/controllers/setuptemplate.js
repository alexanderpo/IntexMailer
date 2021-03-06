const services = [
  '1und1',
  'AOL',
  'DebugMail.io',
  'DynectEmail',
  'FastMail',
  'GandiMail',
  'Gmail',
  'Godaddy',
  'GodaddyAsia',
  'GodaddyEurope',
  'hot.ee',
  'Hotmail',
  'iCloud',
  'mail.ee',
  'Mail.ru',
  'Mailgun',
  'Mailjet',
  'Mandrill',
  'Naver',
  'Postmark',
  'QQ',
  'QQex',
  'SendCloud',
  'SendGrid',
  'SES',
  'Sparkpost',
  'Yahoo',
  'Yandex',
  'Zoho',
];

export function getSetupTemplatePage(req, res) {
  res.render('setuptemplate', {
    title: 'I.M. - ' + req.params.name,
    pageTitle: req.params.name.charAt(0).toUpperCase() + req.params.name.substr(1),
    supportServices: services,
    frameURL: req.params.name,
  });
}
