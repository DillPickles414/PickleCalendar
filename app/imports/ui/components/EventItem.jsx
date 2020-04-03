import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { generateEvent } from '../../../client/eventGenerator';

class EventItem extends React.Component {

    download = () => {
        const element = document.createElement('a');
        const file = new Blob([generateEvent(this.props.event)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${this.props.event.eventName}.ics`;
        element.click();
    };

  render() {
    return (
        <Table.Row>
            <Table.Cell>{this.props.event.eventName}</Table.Cell>
            <Table.Cell>{this.props.event.dateStart.toLocaleString('en-US', { timeZone: 'UTC' })}</Table.Cell>
            <Table.Cell>{this.props.event.dateEnd.toLocaleString('en-US', { timeZone: 'UTC' })}</Table.Cell>
            <Table.Cell>{this.props.event.description}</Table.Cell>
            <Table.Cell>{this.props.event.location}</Table.Cell>
            <Table.Cell>{this.props.event.summary}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Button as={ Link } to={`/edit/${this.props.event._id}`}>
                    Edit
                </Button>
            </Table.Cell>
            <Table.Cell textAlign='center'>
                <Button onClick={this.download}>Download</Button>
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
