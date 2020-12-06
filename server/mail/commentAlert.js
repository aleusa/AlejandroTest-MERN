const nodemailer = require('nodemailer');

const commentAlert = (vessel, username, comment) => {
      var mailOptions = {
            from: 'vesselfinderteam@gmail.com',
            to: 'vesselfinderteam@gmail.com',
            subject: 'New Comment Notification',
            html: '<h2>A new comment has been posted:</h2>' +
                  'Vessel Name: ' + vessel.name + '<br>' +
                  'Vessel ID: ' + vessel._id + '<br>' +
                  'Poster Name: ' + username + '<br>' +
                  'Poster ID: ' + comment.posterID + '<br>' +
                  'Content: ' + comment.content + '<br>' +
                  'Date: ' + comment.date + '<br>'
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

module.exports = commentAlert;



