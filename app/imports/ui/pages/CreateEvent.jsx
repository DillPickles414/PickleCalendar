import React from 'react';
import {Events} from '../../api/event/Events';
import {Grid, Segment, Header} from 'semantic-ui-react';
import {AutoForm, DateField, ErrorsField, SubmitField, TextField, SelectField, ListField} from 'uniforms-semantic';
import swal from 'sweetalert';
import {Meteor} from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    eventName: String,
    dateStart: Date,
    dateEnd: Date,
    frequency: String,
    sentBy: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.EmailWithTLD
    },
    classification: {
        type: String,
        optional: true
    },
    rsvp: {
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
        custom() {
            if(this.latitude < -90 && this.latitude > 90)
            this.validationContext.addValidationErrors([{
                name: "latitude",
                type: "notValid"
            }]);

            if(!this.longitude){
                this.validationContext.addValidationErrors([{
                    name: "latitude",
                    type: "longNotSet"
                }]);
            }
        }

    },
    description: String,
    location: String,
    summary: String,
});

const validateTiming = function (dateStart, dateEnd) {
    return dateStart < dateEnd;
};

/** Renders the Page for adding a document. */
class CreateEvent extends React.Component {

    /** On submit, insert the data. */
    submit(data, formRef) {
        const {eventName, sentBy, dateStart, dateEnd, classification, frequency, rsvp, priority, resources, description, location, latitude, longitude, summary} = data;
        const owner = Meteor.user().username;
        if (validateTiming(dateStart, dateEnd)) {
            Events.insert({
                    eventName,
                    sentBy,
                    dateStart,
                    dateEnd,
                    classification,
                    frequency,
                    rsvp,
                    priority,
                    resources,
                    description,
                    location,
                    latitude,
                    longitude,
                    summary,
                    owner
                },
                (error) => {
                    if (error) {
                        swal('Error', error.message, 'error');
                    } else {
                        swal('Success', 'Event added successfully', 'success');
                        formRef.reset();
                    }
                });
        } else {
            swal('Validation error', 'Start date should be strictly less than the end date.');
        }


    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        let fRef = null;
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Create Event</Header>
                    <AutoForm ref={ref => {
                        fRef = ref;
                    }} schema={formSchema}
                              onSubmit={data => this.submit(data, fRef)}>
                        <Segment>
                            <TextField name='eventName'/>
                            <TextField name='sentBy'/>
                            <SelectField name='classification' allowedValues={['PUBLIC', 'PRIVATE', 'CONFIDENTIAL']}/>
                            <DateField name='dateStart'/>
                            <DateField name='dateEnd'/>
                            <SelectField name='frequency' allowedValues={['ONCE', 'SECONDLY', 'MINUTELY', 'HOURLY',
                                'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']}/>

                            <SelectField name='rsvp' checkboxes allowedValues={['yes', 'no']}/>
                            <SelectField name='priority' allowedValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
                            <TextField name='description'/>
                            <Grid  container columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <TextField name='location'/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <TextField name='latitude'/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <TextField name='longitude'/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <TextField name='summary'/>
                            <ListField name='resources' initialCount={0}/>

                            <SubmitField value='Submit'/>
                            <ErrorsField/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

export default CreateEvent;
export {validateTiming};
