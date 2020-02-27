import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { VEVENT } from 'ics-js';

/** Renders a single row in the List Stuff table. See pages/ListEvents.jsx. */
class EventItem extends React.Component {
  render() {
    let event = new VEVENT();
    event.addProp('UID', this.props.event.eventName);
    event.addProp('DTSTART', this.props.event.dateStart);
    event.addProp('DTEND', this.props.event.dateEnd);
    return (
        <Table.Row>
            <Table.Cell>{this.props.event.eventName}</Table.Cell>
            <Table.Cell>{this.props.event.dateStart.toString()}</Table.Cell>
            <Table.Cell>{this.props.event.dateEnd.toString()}</Table.Cell>
            <Table.Cell>{this.props.event.description}</Table.Cell>
            <Table.Cell>{this.props.event.summary}</Table.Cell>
            <Table.Cell><a
                href={`data:text/calendar;charset=utf-8,${event}`}
                download="event.ics"
                type="text/calendar"
            >
                Download event
            </a></Table.Cell>
            <Table.Cell>
            <Link to={`/edit/${this.props.event._id}`}>Edit</Link>
            </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EventItem);
