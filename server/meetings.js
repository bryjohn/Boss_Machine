const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting
} = require('./db');

//get an array of all meetings
meetingsRouter.get('/', (req,res,next) => {
    res.send(getAllFromDatabase('meetings'));
});
//create new meeting and save it to the database
meetingsRouter.post('/', (req,res,next) => {
    const newMeeting = addToDatabase('meetings',createMeeting());
    res.status(201).send(newMeeting);
});
//delete all meetings from array
meetingsRouter.delete('/',(req,res,next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});
