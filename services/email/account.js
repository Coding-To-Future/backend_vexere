const sgMail = require('@sendgrid/mail');
const sendgridAPIKey =
  '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';

sgMail.setApiKey(sendgridAPIKey);

const msg = {
  to: 'conanstark1357@gmail.com',
  from: 'conanstark2468@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

// sgMail.send(msg).then(
//   () => {},
//   (error) => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// );

sgMail.send(msg);
