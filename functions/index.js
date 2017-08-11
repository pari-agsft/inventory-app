// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const apiKey = 'key-mailgun-account-key';
const domain = 'sandboxab1173eb6ab04b16b240e6982f1ff69f.mailgun.org';
const mailgun = require('mailgun-js')({apiKey, domain})

exports.sendApprovalEmail = functions.database.ref('requests/{key}').onWrite(event => {
  
  if (!event.data.exists() || event.data.val().status != "approved") {
    return;
  }

  var request = event.data.val();
  var itemRef = admin.database().ref('items/' + request.itemId);

  itemRef.once('value').then(function(snapshot) {
  var data = {
    from: 'notify@agsft.com',
    subject: 'Request Approved',
    html: `<p>Request Approved for ${snapshot.val().name} , Request ID -  ${request.itemId}</p>`,
    'h:Reply-To': 'notify@agsft.com',
    to: request.email
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body)
  });
  });
})
