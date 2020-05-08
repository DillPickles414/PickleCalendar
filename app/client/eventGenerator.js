function appendToEnd(original, append) {
    if (original === '') {
        return append;
    }
    return original.concat(`\n${append}`);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    let dateISO = date.toISOString();
    dateISO = dateISO.substr(0, dateISO.length - 4);
    return dateISO.replace(/[-.:]/g, '');
}

function appendDescription(data, event) {
    return appendToEnd(event, `DESCRIPTION:${data.description}`);
}

function appendDates(data, event) {
    const date = [];
    date.push(`DTSTART:${formatDate(data.dateStart)}`);
    date.push(`DTEND:${formatDate(data.dateEnd)}`);
    return appendToEnd(event, date.join('\n'));
}

// TODO add support for language
function appendSummary(data, event) {
    return appendToEnd(event, `SUMMARY;LANGUAGE=en-us:${data.summary}`);
}

function wrapEventTags(event) {
    const wrapped = appendToEnd('BEGIN:VEVENT', event);
    return appendToEnd(wrapped, 'END:VEVENT');
}

function wrapCalendarTags(event) {
    const wrapped = appendToEnd('BEGIN:VCALENDAR', event);
    return appendToEnd(wrapped, 'END:VCALENDAR');
}

function appendRecurrenceRule(data, event) {
    if (data.frequency === 'ONCE') {
        return event;
    }
    return appendToEnd(event, `RRULE:FREQ=${data.frequency}`);
}

function appendLocation(data, event) {
    if (data.location) {
        return appendToEnd(event, `LOCATION:${data.location}`);
    }
    return event;
}

function appendPriority(data, event) {
    if (data.priority) {
        return appendToEnd(event, `PRIORITY:${data.priority}`);
    }
}

function appendAttendee(data, event) {
    if (data.rsvp || data.sentBy) {
        let attendee = 'ATTENDEE;'
        if (data.sentBy) {
            attendee += `SENT-BY=mailto:${data.sentBy};`
        }
        if (data.rsvp && data.rsvp === 'yes') {
            attendee += `RSVP=TRUE:mailto:${data.owner}`
        }

        if (attendee.endsWith(";")) {
            attendee = attendee.substring(0, attendee.length - 1);
        }
        return appendToEnd(event, attendee);
    }

    return event;
}

function generateEvent(data) {
    let event = '';
    event = appendDescription(data, event);
    event = appendDates(data, event);
    event = appendRecurrenceRule(data, event);
    event = appendAttendee(data, event);
    event = appendPriority(data, event);
    event = appendLocation(data, event);
    event = appendSummary(data, event);
    event = wrapEventTags(event);
    event = wrapCalendarTags(event);
    return event;
}

export {generateEvent, formatDate};
