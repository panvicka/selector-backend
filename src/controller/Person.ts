import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Person from '../models/Person';
import RotationEvent from '../models/RotationEvent';
import { addToArrayIfKeyValueDoesntExist } from '../utils/arrayUtils';

const createPerson = (req: Request, res: Response, next: NextFunction) => {
    const { name, itemsCanBeAttended, groupes, active } = req.body;
    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name,
        itemsCanBeAttended,
        groupes,
        active,
    });

    return person
        .save()
        .then((person) => res.status(201).json({ person }))
        .catch((error) => res.status(500).json({ error }));
};

const readPerson = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.personId;

    return Person.findById(personId)
        .then((personId) =>
            personId
                ? res.status(200).json({ personId })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readPersonSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const personId = req.params.personId;

    let attendedEvents: any = [];

    const allEvents: any = await RotationEvent.find()
        .populate('item')
        .populate('participants.role', 'name description icon')
        .populate('participants.person', 'name');

    // this should be doable with just filter, but not working :(
    allEvents.forEach((event: any) => {
        event.participants.forEach((participant: any) => {
            console.log(participant.person);
            if (participant?.person?._id?.toString() == personId) {
                attendedEvents = addToArrayIfKeyValueDoesntExist(
                    attendedEvents,
                    '_id',
                    event
                );
             }
        });
    });

    res.status(200).json({ attendedEvents });
};

const readAllPersons = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.item) {
        return Person.find({
            itemsCanBeAttended: { $elemMatch: { $eq: req.query.item } },
        })
            .sort('name')
            .then((persons) => res.status(200).json({ persons }))
            .catch((error) => res.status(500).json({ error }));
    }

    return Person.find()
        .populate('groupes')
        .sort('name')
        .then((persons) => res.status(200).json({ persons }))
        .catch((error) => res.status(500).json({ error }));
};

const updatePerson = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.personId;

    return Person.findById(personId)
        .then((person) => {
            if (person) {
                person.set(req.body);

                return person
                    .save()
                    .then((person) => res.status(201).json({ person }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deletePerson = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.personId;

    return Person.findByIdAndDelete(personId)
        .then((personId) =>
            personId
                ? res.status(200).json({ message: 'deleted' })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createPerson,
    readPerson,
    readPersonSummary,
    readAllPersons,
    updatePerson,
    deletePerson,
};
