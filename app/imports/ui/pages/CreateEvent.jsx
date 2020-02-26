import React from 'react';
import { Events } from '/imports/api/event/Events';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    eventName: String,
    quantity: Number,
    condition: {
        type: String,
        allowedValues: ['excellent', 'good', 'fair', 'poor'],
        defaultValue: 'good',
    },
});

/** Renders the Page for adding a document. */
class CreateEvent extends React.Component {

    /** On submit, insert the data. */
    submit(data, formRef) {
        const { eventName, quantity, condition } = data;
        const owner = Meteor.user().username;
        Events.insert({ eventName, quantity, condition, owner },
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
                            <NumField name='quantity' decimal={false}/>
                            <SelectField name='condition'/>
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
