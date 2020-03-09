import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class EventItem extends React.Component {

    formatDate(date) {
        // eslint-disable-next-line max-len
        let dateISO = date.toISOString();
        dateISO = dateISO.substr(0, dateISO.length - 4);
        return dateISO.replace(/[-.:]/g, '');
    }

    generateCalendar(data) {
        // eslint-disable-next-line prefer-const
        let { dateStart, dateEnd, description, summary } = data;
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

        return calendar.join('\n');
    }

    download = () => {
        const element = document.createElement('a');
        const file = new Blob([this.generateCalendar(this.props.event)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${this.props.event._id}.ics`;
        element.click();
    };


  render() {
    return (
        <Table.Row>
            <Table.Cell>{this.props.event.eventName}</Table.Cell>
            <Table.Cell>{this.props.event.dateStart.toLocaleString('en-US', { timeZone: 'UTC' })}</Table.Cell>
            <Table.Cell>{this.props.event.dateEnd.toLocaleString('en-US', { timeZone: 'UTC' })}</Table.Cell>
            <Table.Cell>{this.props.event.description}</Table.Cell>
            <Table.Cell>{this.props.event.summary}</Table.Cell>
            <Table.Cell>
                <Button as={ Link } to={`/edit/${this.props.event._id}`}>
                    Edit
                </Button>
            </Table.Cell>
            <Table.Cell>
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
