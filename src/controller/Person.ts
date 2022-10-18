import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Person from '../models/Person';

const createPerson = (req: Request, res: Response, next: NextFunction) => {
    const { name, itemsCanBeAttended } = req.body;
    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name,
        itemsCanBeAttended,
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

const readAllPersons = (req: Request, res: Response, next: NextFunction) => {
    return Person.find()
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
    readAllPersons,
    updatePerson,
    deletePerson,
};
