const functions = require('firebase-functions');
const apiKey = 'key-mailgun-account-key';
const domain = 'sandboxab1173eb6ab04b16b240e6982f1ff69f.mailgun.org';
const mailgun = require('mailgun-js')({apiKey, domain})
exports.sendApprovalEmail = functions.database.ref('requests/{key}').onWrite(event => {
  
  if (!event.data.exists() || event.data.val().status != "approved") {
    return;
  }
  var request = event.data.val();
  var data = {
    from: 'notify@agsft.com',
    subject: 'Request Approved',
    html: `<p>Request Approved for ${request.itemId}</p>`,
    'h:Reply-To': 'notify@agsft.com',
    to: request.email
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body)
  })
})
