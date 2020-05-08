import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {Tracker} from 'meteor/tracker';

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
    latitude: {
        type: Number,
        optional: true,
        min: -90,
        max: 90,
        custom: function() {
            if (!this.field('longitude').isSet) {
                return 'longitudeNotSet';
            }
        }
    },
    longitude: {
        type: Number,
        optional: true,
        min: -180,
        max: 180,
        custom: function() {
            if (!this.field('latitude').isSet) {
                return 'latitudeNotSet';
            }
        }
    },
    location: {
        type: String,
        optional: true,
    },
    summary: String,
    owner: String,
}, {tracker: Tracker});


EventSchema.messageBox.messages({
    en: {
        longitudeNotSet: 'Longitude not set',
        latitudeNotSet: 'latitude not set',
    },
});



/** Attach this schema to the collection. */
Events.attachSchema(EventSchema);

/** Make the collection and schema available to other code. */
export {Events, EventSchema};
