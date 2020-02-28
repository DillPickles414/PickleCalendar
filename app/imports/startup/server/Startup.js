import { Meteor } from 'meteor/meteor';
import fs from 'fs';

Meteor.methods({
    // eslint-disable-next-line meteor/audit-argument-checks
    generate(args) {
        const dirPath = `${process.env.PWD}/.temp/`;
        const filePath = `${dirPath}${args[0]}`;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(filePath, args[1].join('\n'), 'binary');
},
});
