const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "866116032348-k6dvec2j76u0viejap35tbau47vrcs41.apps.googleusercontent.com",
  "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"
);

oAuth2Client.setCredentials({refresh_token: 
  "1//04GPYXKo3hl5pCgYIARAAGAQSNwF-L9Irp9cucnynnM8uKbl1D38X3mSBIE62BQoGaVReWxHQArdtae9Zmrwcca9ZAKtu3m37oS4"
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

function ISODateString(d){
  function pad(n) {
    return n < 10 ? '0' + n : n
  }

  return d.getUTCFullYear()+'-'
       + pad(d.getUTCMonth()+1)+'-'
       + pad(d.getUTCDate())+'T'
       + pad(d.getUTCHours())+':'
       + pad(d.getUTCMinutes())+':'
       + pad(d.getUTCSeconds())+'Z'
}
 
let eventStartTime = new Date();

console.log(eventStartTime.getDay() , 'testing the date');
eventStartTime.setDate(eventStartTime.getDay() + 2);

let eventEndTme = new Date();
eventEndTme.setDate(eventEndTme.getDay() + 4);
eventEndTme.setMinutes(eventEndTme.getMinutes() + 45);


const event = {
   summary: "Meeting with Salvo",
   location: 'Neue Winterthurerstrasse, 8304 Wallisellen',
   description: 'Meeting with Deviod to talk about the new client project and how to add the google calendar api',
   attendees: [
    { email: 'salvatoredininni1@gmail.com' },
    { email: 'dininni.salvatore@gmail.com' },
    { email: 'salvatore.dininni@cienneffe.com' },
  ],
   start: {
     dateTime: ISODateString(eventStartTime),
     timeZone: 'Europe/Rome'
   },
   end: {
     dateTime: ISODateString(eventEndTme),
     timeZone: 'Europe/Rome',
   },
   reminders: {
    useDefault: true,
    overrides: [
      { 'method': 'email', 'minutes': 24 * 60 },
      { 'method': 'popup', 'minutes': 10 },
    ],
  },
   colorId: 1,
  };

calendar.freebusy.query({
   resource: {
     timeMin: ISODateString(eventStartTime),
     timeMax: ISODateString(eventEndTme),
     timeZone: 'Europe/Rome',
     items: [{id: 'primary'}], //calendar obj
  }
}, (err, res) => {
   if (err) {
     console.error('free Busy Query Error', err);
   }
   const eventsArr = res.data.calendars.primary.busy

   if (eventsArr.length === 0) return calendar.events.insert({calendarId: 'primary', resource: event }, 
   err => {
     if (err) return console.error('Calender Event Creation Error:', err)
     return console.log('Calendar Event Created.');
   })

   return console.log(`Sorry i'm busy`);
})