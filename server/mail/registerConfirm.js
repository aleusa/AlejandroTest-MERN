const nodemailer = require('nodemailer');

const registerConfirm = (newUser) => {
      var mailOptions = {
            from: 'vesselfinderteam@gmail.com',
            to: 'vesselfinderteam@gmail.com',
            subject: 'New User Notification',
            html: '<h2>A new user has signed up for an account:</h2>' + 
             'Name: ' + newUser.firstName + ' '+ newUser.lastName + '<br>' +
              'Email: ' + newUser.email + '<br>' +
              'Company: ' + newUser.companyName + '<br>'
            ,
          };
        
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'vesselfinderteam@gmail.com',
              pass: 'team404!'
            }
          });
        
          transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
              return console.log(err);
            } else {
              console.log('Send mail successfully');
            }
          });
}

module.exports = registerConfirm;



