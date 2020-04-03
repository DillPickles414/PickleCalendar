import chai from 'chai';
import { formatDate, generateEvent } from './eventGenerator';

const testData = {
    eventName: 'testName',
    dateStart: () => new Date(),
    dateEnd: 'SET ME',
    frequency: 'DAILY',
    description: 'testDescription',
    location: 'TEST',
    summary: 'testSummary',
};


describe('eventGenerator', function () {
    it('generateEvent - no location', function () {

        const event = testData;
        event.dateStart = new Date(event.dateStart());
        event.dateEnd = event.dateStart;
        event.dateEnd.setHours(event.dateStart.getHours() + 1);
        event.location = undefined;

        const expectedString = `${'BEGIN:VCALENDAR\n' +
        'BEGIN:VEVENT\n' +
        'DESCRIPTION:'}${event.description}
DTSTART:${formatDate(event.dateStart)}
DTEND:${formatDate(event.dateEnd)}
RRULE:FREQ=${event.frequency}
SUMMARY;LANGUAGE=en-us:${event.summary}\nEND:VEVENT
END:VCALENDAR`;
        chai.assert.equal(generateEvent(event), expectedString);
    });

    it('generateEvent - valid values', function () {

        const event = testData;
        event.dateEnd = event.dateStart;
        event.dateEnd.setHours(event.dateStart.getHours() + 1);
        event.location = 'TEST';

        const expectedString = `${'BEGIN:VCALENDAR\n' +
        'BEGIN:VEVENT\n' +
        'DESCRIPTION:'}${event.description}
DTSTART:${formatDate(event.dateStart)}
DTEND:${formatDate(event.dateEnd)}
RRULE:FREQ=${event.frequency}
LOCATION:${event.location}
SUMMARY;LANGUAGE=en-us:${event.summary}\nEND:VEVENT
END:VCALENDAR`;
        chai.assert.equal(generateEvent(event), expectedString);
    });
});
