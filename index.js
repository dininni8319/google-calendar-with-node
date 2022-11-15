const { google } = require('googleapis');
require("dotenv").config();
const { OAuth2 } = google.auth;

const { ISODateString, 
  event,
  eventStartTime,
  eventEndTime,
} = require('./utils');

const { oAuth2Client } = require('./constants');

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

calendar.freebusy.query({
   resource: {
     timeMin: ISODateString(eventStartTime),
     timeMax: ISODateString(eventEndTime),
     timeZone: 'Europe/Rome',
     items: [{id: 'primary'}], //calendar obj
  }
}, (err, res) => {
   if (err) {
     console.error('free Busy Query Error', err);
   }
   const eventsArr = res.data.calendars.primary.busy

   if (eventsArr.length === 0) return calendar.events.insert({
     calendarId: 'primary', 
     resource: event,
     conferenceDataVersion: 1, 
     sendNotifications: true,
     sendUpdates: 'all',
    }, 
   err => {
     if (err) return console.error('Calender Event Creation Error:', err)
     return console.log('Calendar Event Created.');
   })

   return console.log(`Sorry i'm busy`);
})

