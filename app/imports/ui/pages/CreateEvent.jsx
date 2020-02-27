import React from 'react';
import { Events } from '/imports/api/event/Events';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    eventName: String,
    dateStart: Date,
    dateEnd: Date,
    description: String,
    summary: String,
});

/** Renders the Page for adding a document. */
class CreateEvent extends React.Component {

    /** On submit, insert the data. */
    submit(data, formRef) {
        const { eventName, dateStart, dateEnd, description, summary } = data;
        const owner = Meteor.user().username;
        Events.insert({ eventName, dateStart, dateEnd, description, summary, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Event added successfully', 'success');
                    formRef.reset();
                }
            });
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        let fRef = null;
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Create Event</Header>
                    <AutoForm ref={ref => { fRef = ref; }} schema={formSchema}
                              onSubmit={data => this.submit(data, fRef)} >
                        <Segment>
                            <TextField name='eventName'/>
                            <DateField name='dateStart'/>
                            <DateField name='dateEnd'/>
                            <TextField name='description'/>
                            <TextField name='summary'/>
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
