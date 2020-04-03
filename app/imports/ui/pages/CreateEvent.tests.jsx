import chai from 'chai';
import { validateTiming } from './CreateEvent';

describe('Pages', function () {
    it('Create Event - time validation - startDate before endDate', function () {
        const currentDate = new Date('12/16/2019 08:00');
        const dateEnd = new Date('12/16/2019 09:00');
        chai.assert.equal(validateTiming(currentDate, dateEnd), true);
    });

    it('Create Event - time validation - endDate before startDate', function () {
        const currentDate = new Date('12/16/2019 09:00');
        const dateEnd = new Date('12/16/2019 08:00');
        chai.assert.equal(validateTiming(currentDate, dateEnd), false);
    });
    it('Create Event - time validation - startDate equals endDate', function () {
        const currentDate = new Date('12/16/2019 09:00');
        const dateEnd = new Date('12/16/2019 09:00');
        chai.assert.equal(validateTiming(currentDate, dateEnd), false);
    });
});
