import React from 'react';
import {Grid, Loader, Header, Segment} from 'semantic-ui-react';
import {Events, EventSchema} from '/imports/api/event/Events';
import swal from 'sweetalert';
import {AutoForm, ErrorsField, DateField, SubmitField, TextField, SelectField} from 'uniforms-semantic';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for editing a single document. */
class EditEvent extends React.Component {

    /** On successful submit, insert the data. */
    submit(data) {
        const {eventName, sentBy, dateStart, dateEnd, frequency, rsvp, priority, description, location, summary, _id} = data;
        Events.update(_id, {
                $set: {
                    eventName,
                    sentBy,
                    dateStart,
                    rsvp,
                    priority,
                    dateEnd,
                    frequency,
                    description,
                    location,
                    summary
                }
            },
            (error) => (error ?
                swal('Error', error.message, 'error') :
                swal('Success', 'Item updated successfully', 'success')));
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    renderPage() {
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Edit Stuff</Header>
                    <AutoForm schema={EventSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                        <Segment>
                            <TextField name='eventName'/>
                            <TextField name='sentBy'/>
                            <DateField name='dateStart'/>
                            <DateField name='dateEnd'/>
                            <SelectField name='frequency' allowedValues={['ONCE', 'SECONDLY', 'MINUTELY', 'HOURLY',
                                'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']}/>
                            <SelectField name='rsvp' checkboxes allowedValues={['yes', 'no']}/>
                            <SelectField name='priority' allowedValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}/>

                            <TextField name='location'/>
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

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditEvent.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({match}) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Events');
    return {
        doc: Events.findOne(documentId),
        ready: subscription.ready(),
    };
})(EditEvent);
