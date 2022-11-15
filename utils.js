const generateConfig = ( url, accessToken ) => {
  return {
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${accessToken} `,
      "Content-type": "application/json",
    },
  };
};

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
eventStartTime.setDate(eventStartTime.getDate() + 7);

let eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDate() + 10);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: "Meeting with Salvo",
  location: 'Neue Winterthurerstrasse, 8304 Wallisellen',
  description: 'Meeting with Deviod to talk about the new client project and how to add the google calendar api',
  organizer:[{email: 'salvatoredininni1@gmail.com'}] ,
  attendees: [
   { email: 'dininni.salvatore@gmail.com' },
   { email: 'salvatore.dininni@cienneffe.com' },
 ],
  start: {
    dateTime: ISODateString(eventStartTime),
    timeZone: 'Europe/Rome'
  },
  end: {
    dateTime: ISODateString(eventEndTime),
    timeZone: 'Europe/Rome',
  },
 //  reminders: {
 //   useDefault: true,
 //   overrides: [
 //     { 'method': 'email', 'minutes': 24 * 60 },
 //     { 'method': 'popup', 'minutes': 10 },
 //   ],
 // },
   conferenceData: {
     createRequest: {
       conferenceSolutionKey: {
         type: 'hangoutsMeet'
       },
       requestId: 'Google-Nodejs-Calendar-App'
     }
   },
  colorId: 1,
 };

module.exports = { 
  generateConfig, 
  ISODateString, 
  event,
  eventStartTime,
  eventEndTime 
};
