const mailer = require('./mailer');
const { constants } = require('./constants');
const axios = require('axios');

function eventToData(event,type){
    switch(type){
    case "email" :
        return eventToHtml(event);
    case "mobile" :
        return eventToPlainText(event);     
    case "web_push" :
        return eventToPlainText(event); 
    }
}

function eventToPlainText(event){
    return `New alert from ${event.actorOrgId}, Event "${event.eventTypePrimary}" applied on ${event.eventTypeDesc}`
}

function eventToHtml(event){
    return `<html><p>New alert from ${event.actorOrgId}, Event "${event.eventTypePrimary}" applied on ${event.eventTypeDesc}</p></html>`
}

function alertMobile(event,mobile){    
    const content = eventToData(event,"mobile")
    axios.post(process.env.OTP_ENDPOINT, {
        //Need to discuss this implementation. 
      })
        .then((response) => {
          if (response.status === 200) {
              return true;
          }
        })
}

function alertEmail(event,email){
    const content = eventToData(event,"mail")
    mailer
           .send(
             constants.confirmEmails.from,
             email,
             "New Email Alert from StaTwig",
             content,
           )
           .then(function(){
               return true;
           })
}

function alertWebPush(){

}

exports.alertMobile = alertMobile;
exports.alertEmail = alertEmail;
exports.alertWebPush = alertWebPush;