/**
 * @Author: memo
 * @Date:   2020-10-08T00:57:26-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-10-08T08:33:53-05:00
 */
//  const ical = require('ical-generator');
//  const moment = require('moment-timezone');
//  function getIcalObjectInstance(starttime, endtime, summary,
//       description, location, url , name ,email) {
//           const cal = ical({ domain: "mytestwebsite.com",
//           name: 'My test calendar event' });
//         cal.domain("mytestwebsite.com");
//
//         cal.createEvent({
//          start: starttime,         // eg : moment()
//          end: endtime,             // eg : moment(1,'days')
//          summary: summary,         // 'Summary of your event'
//          description: description, // 'More description'
//          location: location,       // 'Delhi'
//          url: url,                 // 'event url'
//          organizer: {              // 'organizer details'
//              name: name,
//              email: email
//          },
//      });
//      return cal;
// }
//
// getIcalObjectInstance(new Date(), new Date(), "description", "location",
// "url", "name", "email@email")


var icalToolkit = require('ical-toolkit');

//Create a builder
var builder = icalToolkit.createIcsFileBuilder();

/*
 * Settings (All Default values shown below. It is optional to specify)
 * */
builder.spacers = true; //Add space in ICS file, better human reading. Default: true
builder.NEWLINE_CHAR = '\r\n'; //Newline char to use.
builder.throwError = false; //If true throws errors, else returns error when you do .toString() to generate the file contents.
builder.ignoreTZIDMismatch = true; //If TZID is invalid, ignore or not to ignore!


/**
 * Build ICS
 * */

//Name of calander 'X-WR-CALNAME' tag.
builder.calname = 'Yo Cal';

//Cal timezone 'X-WR-TIMEZONE' tag. Optional. We recommend it to be same as tzid.
builder.timezone = 'america/new_york';

//Time Zone ID. This will automatically add VTIMEZONE info.
builder.tzid = 'america/new_york';

//Method
builder.method = 'REQUEST';

//Add events
builder.events.push({

  //Event start time, Required: type Date()
  start: new Date(),

  //Event end time, Required: type Date()
  end: new Date(),

  //transp. Will add TRANSP:OPAQUE to block calendar.
  transp: 'OPAQUE',

  //Event summary, Required: type String
  summary: 'Test Event',

  //All Optionals Below

  //Alarms, array in minutes
  alarms: [15, 10, 5],

  //Optional: If you need to add some of your own tags
  additionalTags: {
    'SOMETAG': 'SOME VALUE'
  },

  //Event identifier, Optional, default auto generated
  uid: null,

  //Optional, The sequence number in update, Default: 0
  sequence: null,

  //Optional if repeating event
  repeating: {
    freq: 'DAILY',
    count: 10,
    interval: 10,
    until: new Date()
  },

  //Optional if all day event
  allDay: true,

  //Creation timestamp, Optional.
  stamp: new Date(),

  //Optional, floating time.
  floating: false,

  //Location of event, optional.
  location: 'Home',

  //Optional description of event.
  description: 'Testing it!',

  //Optional Organizer info
  organizer: {
    name: 'Kushal Likhi',
    email: 'test@mail',
    sentBy: 'person_acting_on_behalf_of_organizer@email.com' //OPTIONAL email address of the person who is acting on behalf of organizer.
  },

  //Optional attendees info
  attendees: [
    {
      name: 'A1', //Required
      email: 'a1@email.com', //Required
      status: 'TENTATIVE', //Optional
      role: 'REQ-PARTICIPANT', //Optional
      rsvp: true //Optional, adds 'RSVP=TRUE' , tells the application that organiser needs a RSVP response.
    },
    {
      name: 'A2',
      email: 'a2@email.com'
    }
  ],

  //What to do on addition
  method: 'PUBLISH',

  //Status of event
  status: 'CONFIRMED',

  //Url for event on core application, Optional.
  url: 'http://google.com'
});

//Optional tags on VCALENDAR level if you intent to add. Optional field
builder.additionalTags = {
  'SOMETAG': 'SOME VALUE'
};


//Try to build
var icsFileContent = builder.toString();

//Check if there was an error (Only required if yu configured to return error, else error will be thrown.)
if (icsFileContent instanceof Error) {
  console.log('Returned Error, you can also configure to throw errors!');
  //handle error
}

//Here isteh ics file content.
console.log(icsFileContent);



////


const { writeFileSync } = require('fs')
const ics = require('ics')

ics.createEvent({
  title: 'Evento Dell',
  description: 'Revision del torneo',
  busyStatus: 'FREE',
  start: [2020, 10, 9, 6, 30],
  duration: { minutes: 50 }
}, (error, value) => {
  if (error) {
    console.log(error)
  }

  writeFileSync(`${__dirname}/eventDell.ics`, value)
})
