const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
   }   = require('./db');

minionsRouter.param('minionId',(req,res,next, id) =>{
    const minion = getFromDatabaseById('minions',id);
    if(minion) {
        req.minion = minion;
        next();
    } else{
        res.status(404).send();
    }
});

//get minion array
minionsRouter.get('/', (req,res,next) => {
    res.send(getAllFromDatabase('minions')); 
});
//create new minion and save to db
minionsRouter.post('/', (req,res,next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});
//get a single minion by minion id
minionsRouter.get('/:minionId', (req,res,next) => {
    res.send(req.minion);
});

//update a single minion by minion id
minionsRouter.put('/:minionId', (req,res,next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions',req.body);
    res.send(updatedMinionInstance);
});

//delete a single minion by minion id.
minionsRouter.delete('/:minionId', (req,res,next) =>{
    const deletedMinionInstance = deleteFromDatabasebyId('minions',req.params.minionId);
    if(deletedMinionInstance){
        res.status(204);
    }else{
        res.status(500);
    }
    res.send();
});

