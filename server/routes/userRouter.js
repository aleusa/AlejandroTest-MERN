const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const JWT_SECRET = require('../config/config').jwt.JWT_SECRET;
const Vessel = require("../models/vesselModel");
const nodemailer = require('nodemailer');
const registerConfirm = require("../mail/registerConfirm");
const commentAlert = require("../mail/commentAlert");

router.get("/test", (req, res) => {
    res.send("Test working!");
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, firstName, lastName, companyName, associatedVessels, webMaster } = req.body;

    // validate
    if (!email || !password || !passwordCheck || !firstName || !lastName)
      return res.status(400).json({ msg: "Not all required fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Passwords must be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Please enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    //generate hash for user password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      companyName,
      webMaster: false,
      associatedVessels
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
    registerConfirm(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
  
      // assign payload to user so they can be "logged in" 
      // can later be used to retrieve id of currently logged in user
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          companyName: user.companyName,
          lastName: user.lastName,
          webMaster: user.webMaster,
          associatedVessels: user.associatedVessels
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //use this to check if a given token is valid and simply return true/false
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      // respond with user's first name and db ID
      firstName: user.firstName,
      email: user.email,
      companyName: user.companyName,
      lastName: user.lastName,
      id: user._id,
      webMaster: user.webMaster,
      associatedVessels: user.associatedVessels
    });
  });

/*   router.get("/findVessel2", auth, async (req, res) => {
    const vessel = await Vessel.findById(req.user.associatedVessels[0]);
    console.log("Hey")
    res.json({
      vesselName: vessel.name
    });
  });

   */
  router.post("/findVessel", async (req, res) => {
    const vessel = await Vessel.findById(req.body.user.user.associatedVessels[req.body.i]);
    if(vessel){
      res.json({ retInfo: vessel.name, retId: vessel._id, retModelLink: vessel.model_link, retVFLink: vessel.vesselfinder_link, retAssociatedUsers: vessel.associated_users, retNumComments: vessel.comments.length }) 
    }else{
      res.json({ retInfo: "null" }) 
    }
  });

  router.post("/addProjectMember", async (req, res) => {
    //find the user in our db via email address
    

     //const user = await User.findOne({"email":req.param('email')});
     //res.json({ nameOfAddedUser: user.firstName }) 


     const user = await User.findOne({"email":req.body.email});

     if(user && user.length != 0){
      user.associatedVessels.push(req.body.vesselID);

      //add user to associatedUsers attribute on this vessel object:
      let vesselObject = {role: 'admin', userID: ''+user._id+''};

      Vessel.updateOne(
        { _id: req.body.vesselID },
        { $push: {associated_users: vesselObject} },
        function (error, success) {
              if (error) {
                res.json({ nameOfAddedUser: 'ERROR' })
              }
          });


      //add vessel ID to associatedVessels attribute on user object:
      User.updateOne(
        { _id: user._id },
        { $push: {associatedVessels: ''+req.body.vesselID+''} },
        function (error, success) {
              if (error) {
                res.json({ nameOfAddedUser: 'ERROR' })
              }
          });

      

      res.json({ nameOfAddedUser: user.firstName }) 
     }else{
      res.json({ nameOfAddedUser: null}) 
     }
     

     /*
    if(!user === undefined || !user.length == 0){

      if(req.body.email != 'dgran@ufl.edu'){
        res.json({ nameOfAddedUser: req.body.email }) 
      }
      //res.json({ nameOfAddedUser: user }) 
    }else{
      res.json({ nameOfAddedUser: 'hey' }) 
    } */

  });
  router.post("/webMaster", async (req, res) => {
    const user = await User.findOne({ "email": req.body.email });
    const vessel = await Vessel.findOne({ "name": req.body.vesselID });
    //const userCheck = await user.findOne({"associatedVessels": req.body.vesselID});
  
    if (user && user.length != 0 && vessel) {
      //user.associatedVessels.push(vessel._id);
      //vessel.associated_users.push(user._id);
  
      User.updateOne(
        { _id: user._id },
        { $push: { associatedVessels: '' + vessel._id + '' } },
        function (error, success) {
          if (error) {
            res.json({ nameOfAddedUser: 'ERROR' })
          }
        });
        Vessel.updateOne(
          { _id: vessel._id },
          { $push: { associated_users: { userID: user._id, role: "Admin" } } },
          function (error, success) {
            if (error) {
              res.json({ nameOfAddedUser: 'ERROR' })
            }
          });
  
      res.json({ nameOfAddedUser: user.firstName })
    } else {
      res.json({ nameOfAddedUser: null })
    }
  });
  router.post("/webMasterAddVessel", async (req, res) => {
    try {
      let { name, model_link, vesselfinder_link } = req.body;
  
      // validate
      if (!name || !model_link || !vesselfinder_link) {
        return res.status(400).json({ msg: "Not all required fields have been entered." });
      }
      const newVessel = new Vessel({
        name,
        model_link,
        vesselfinder_link
      });
      const vessel = await Vessel.findOne({ "name": req.body.name });
      if (!vessel) {
        const savedVessel = await newVessel.save();
        res.json({ vesselName: savedVessel.name });
      }
      else {
        res.json({ vesselName: null });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.post("/webMasterList", async (req, res) => {
    const vesselList = await Vessel.find({});
    // validate
    if(vesselList){
      var docArray = vesselList.map(function(Vessel) {
        return Vessel.toObject();
      });
      res.json({docArray: docArray});
    }
    else
    res.status(500).json({ error: err.message });
  
   });
   router.post("/webMasterListDelete", async (req, res) => {
    let name = req.body.name;
  
    // validate
    if (!name){
        return res.status(400).json({ msg: "Not all required fields have been entered." });
    }
    const vessel = await Vessel.findOne({ "name": req.body.name });
    const user = await User.find({"associatedVessels": vessel._id});
    var docArray = user.map(function(User) {
      return User.toObject();
    });
    user.map(temp => {
      //for(let i = 0; i < temp.associatedVessels.length; i++){
        //if(temp.associatedVessels[i] == '' + vessel._id + ''){
          //res.json({u: temp});
          
          let user2 = User.updateOne(
            { _id: temp._id },
            { $pull: { 'associatedVessels': vessel._id } },
            function (error, success) {
                if (error) {
                  //res.json({ users: 'ERROR' })
                }
                else{
                  //res.json({ users: name })
                }
            });
          //res.json({users: user2})
        //}
      //}
    }
    );
    await Vessel.deleteOne({"name":req.body.name});
    if(!vessel){
      res.json({vesselName: name});
    }
    else{
      res.json({vesselName: null});
    }
   });

 router.post("/getComment", async (req, res) => {
  //Return a comment on the specified vessel page, the user who posted it, and the date it was posted.
  const vessel = await Vessel.findById(req.body.vesselID);
  if(vessel){
    //get name of the comment's original poster
    const user = await User.findById(vessel.comments[req.body.i].posterID);
    if(user){
      const fname = user.firstName;
      const lname = user.lastName;
      const fnameCapitalized = fname.charAt(0).toUpperCase() + fname.slice(1);
      const lnameCapitalized = lname.charAt(0).toUpperCase() + lname.slice(1);

      let fullname = fnameCapitalized + " " + lnameCapitalized;
      res.json({ poster: fullname, comment: vessel.comments[req.body.i].content, postedDate: vessel.comments[req.body.i].date}) 
    }else{
      res.json({ poster: "null", comment: "null", date: "null"}) 
    }
  }else{
    res.json({ poster: "null", comment: "null", date: "null"}) 
  }
});

router.post("/postComment", async (req, res) => {
  //Return a comment on the specified vessel page, the user who posted it, and the date it was posted.
  const vessel = await Vessel.findById(req.body.vesselID);
  const user = await User.findById(req.body.posterID);
  const fname = user.firstName;
  const lname = user.lastName;
  const fnameCapitalized = fname.charAt(0).toUpperCase() + fname.slice(1);
  const lnameCapitalized = lname.charAt(0).toUpperCase() + lname.slice(1);
  let fullname = fnameCapitalized + " " + lnameCapitalized;

  if (vessel) {
    let commentObject = ({ posterID: req.body.posterID, content: req.body.content, date: req.body.date });
    Vessel.updateOne(
      { _id: vessel._id },
      { $push: { comments: commentObject } },
      function (error, success) {
        if (error) {
          res.json({ commentPosted: false })
        }
      });

    res.json({ commentPosted: true })
    commentAlert(vessel, fullname, commentObject);

  } else {
    res.json({ commentPosted: false })
  }
});

router.post("/deleteComment", async (req, res) => {
  //Return a comment on the specified vessel page, the user who posted it, and the date it was posted.
  const vessel = await Vessel.findById(req.body.vesselID);
  if(vessel){

    for(let i = 0; i<vessel.comments.length; i++){
      if(vessel.comments[i].date == req.body.date){

        Vessel.update(
          { _id: vessel._id },
          { $pull: { 'comments': { date: req.body.date } } },
          function (error, success) {
            if (error) {
              res.json({ commentDeleted: false })
            }
        }
        );
        break;
      }
    }
    res.json({ commentDeleted: true })
  }else{
    res.json({ commentDeleted: false })
  }
});

router.post('/sendContact', (req, res) => {
  var mailOptions = {
    from: 'vesselfinderteam@gmail.com',
    to: 'vesselfinderteam@gmail.com',
    subject: 'New Contact Form Submission',
    html: '<h2>User information: </h2>' + 'Name: ' + req.body.user_name + '<br>' +
      'Email: ' + req.body.user_email + '<br>' +
      'Phone number: ' + req.body.user_phone + '<br>' +
      'Company: ' + req.body.user_company + '<br>' +
      '<h2>Message: </h2>' +
      'Subject: ' + req.body.subject + '<br>' +
      'Content: ' +
      req.body.user_message
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
  res.redirect('/contactConfirmation');
});

module.exports = router;