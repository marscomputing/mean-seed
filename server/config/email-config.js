/**
 * Email Configuration
 * TODO: pass in email config, use templates
 */

// Module dependencies
var nodemailer = require('nodemailer');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: '', // Your mailer account name
        pass: '' // Your mailer account password
    }
});



module.exports = {

    confEmail: function (resetUrl) {

        'use strict';

        var subject = 'Confirm your account';

        var body = 'Hello, you signed up for [appname]';
        body += '\n\nClick the link below to confirm you own this email address.';
        body += '\n\n' + resetUrl;

        return {
            subject: subject,
            body: body
        };
    },
    sendMail: function (to, subject, text) {

        'use strict';

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plaintext body
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function (error, response) {

            if (error) {
                console.log(error);
            }
            else {
                console.log('Message sent: ' + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });
    }
};