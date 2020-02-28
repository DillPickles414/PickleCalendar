import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListEvents.jsx. */
class EventItem extends React.Component {
  render() {
    return (
        <Table.Row>
            <Table.Cell>{this.props.event.eventName}</Table.Cell>
            <Table.Cell>{this.props.event.dateStart.toLocaleString('en-US', { timeZone: 'UTC' })}</Table.Cell>
            <Table.Cell>{this.props.event.dateEnd.toLocaleString('en-US', { timeZone: 'UTC' })}</Table.Cell>
            <Table.Cell>{this.props.event.description}</Table.Cell>
            <Table.Cell>{this.props.event.summary}</Table.Cell>
            <Table.Cell>
            <Link to={`/edit/${this.props.event._id}`}>Edit</Link>
            </Table.Cell>
            <Table.Cell>
                <Link to={`/generate/${this.props.event._id}`}>Generate</Link>
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
