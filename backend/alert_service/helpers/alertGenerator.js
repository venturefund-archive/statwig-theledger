const Alert = require('../models/AlertModel')
const Event = require('../models/EventModal')
const User = require('../models/UserModel')
const { alertMobile, alertEmail, alertWebPush } = require('./alertSender')


async function connectDB() {
  var MONGODB_URL = process.env.MONGODB_URL;
  console.log(MONGODB_URL)
  var mongoose = require('mongoose')
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      //don't show the log when it is test
      if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to %s', MONGODB_URL)
        console.log('App is running ... \n')
        console.log('Press CTRL + C to stop the process. \n')
        var db = mongoose.connection
        return db
      }
    })
    .catch((err) => {
      console.error('App starting error:', err.message)
      process.exit(1)
    })
}

function generateAlert(event) {
    let params = { 
        event_type_primary: event.eventTypePrimary,
        event_type_secondary: event.eventTypeDesc,
        actorOrgId: event.actorOrgId
    }
	for await (const row of Alert.find({...params})){
        if(row.alertMode.mobile){
            alertMobile(event,row.user.mobile_number);
        }
        if(row.alertMode.email){
            alertEmail(event,row.user.email)
        }
        if(row.alertMode.web_push){
            let user = await User.find({id:row.user.user_id})
            alertWebPush(event,user.web_push)
        }
    }
};

exports.generateAlert = generateAlert;