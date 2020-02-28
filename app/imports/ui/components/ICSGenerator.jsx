import React from 'react';
import { Loader } from 'semantic-ui-react';
import { Events } from '/imports/api/event/Events';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms


/** Renders the Page for editing a single document. */
class ICSGenerator extends React.Component {

    formatDate(date) {
        // eslint-disable-next-line max-len
        let dateISO = date.toISOString();
        dateISO = dateISO.substr(0, dateISO.length - 4);
        return dateISO.replace(/[-.:]/g, '');
    }

    serveFile() {

    }

    /* 20200222T073000 */
    /** On successful submit, insert the data. */
    generateFile(data) {
        // eslint-disable-next-line prefer-const
        let { dateStart, dateEnd, description, summary, _id } = data;
        dateStart = this.formatDate(dateStart);
        dateEnd = this.formatDate(dateEnd);

        const calendar = [
            'BEGIN:VCALENDAR',
            'BEGIN:VEVENT',
            `DESCRIPTION:${description}`,
            `DTSTART:${dateStart}`,
            `DTEND:${dateEnd}`,
            `SUMMARY;LANGUAGE=en-us:${summary}`,
            'END:VEVENT',
            'END:VCALENDAR',
        ];
        const args = [_id, calendar];

       Meteor.call('generate', args);
       return null;
        }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.generateFile(this.props.doc) : <Loader active>Getting data</Loader>;
    }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ICSGenerator.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Events');
    return {
        doc: Events.findOne(documentId),
        ready: subscription.ready(),
    };
})(ICSGenerator);
