import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Events = new Mongo.Collection('Events');

/** Define a schema to specify the structure of each document in the collection. */
const EventSchema = new SimpleSchema({
  eventName: String,
  dateStart: Date,
  dateEnd: Date,
  frequency: String,
  sentBy: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.EmailWithTLD
  },
  description: String,
  rsvp: {
    type: String,
    optional: true
  },
  classification: {
    type: String,
    optional: true
  },
  priority: {
    type: String,
    optional: true
  },
  resources: {
    type: Array,
    optional: true
  },
  'resources.$': {
    type: String,
    optional: true
  },
  location: String,
  summary: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Events.attachSchema(EventSchema);

/** Make the collection and schema available to other code. */
export { Events, EventSchema };
