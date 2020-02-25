import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/Events';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.eventName} (${data.owner})`);
  Events.insert(data);
}

/** Initialize the collection if empty. */
if (Events.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
