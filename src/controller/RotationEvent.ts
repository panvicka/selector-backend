import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import RotationEvent from '../models/RotationEvent';

const createRotationEvent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { item, startDate, endDate, people, participants } = req.body;
    const rotationEvent = new RotationEvent({
        _id: new mongoose.Types.ObjectId(),
        item,
        startDate,
        endDate,
        people,
        participants,
    });

    return rotationEvent
        .save()
        .then((rotationEvent) => res.status(201).json({ rotationEvent }))
        .catch((error) => res.status(500).json({ error }));
};

const readRotationEvent = (req: Request, res: Response, next: NextFunction) => {
    const rotationEventId = req.params.rotationEventId;

    return RotationEvent.findById(rotationEventId)
        .populate('item')
        .populate('people')
        .populate('participants.role', 'name description icon')
        .populate('participants.person', 'name')
        .then((rotationEventId) =>
            rotationEventId
                ? res.status(200).json({ rotationEventId })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllRotationEvents = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.query);

    if (req.query.item) {
        return RotationEvent.find({ item: { _id: req.query.item } })
            .populate('item')
            .sort('startDate')
            .populate('participants.role', 'name description icon')
            .populate('participants.person', 'name')
            .then((rotationEvents) => res.status(200).json({ rotationEvents }))
            .catch((error) => res.status(500).json({ error }));
    }

    return RotationEvent.find()
        .populate('item')
        .populate('participants.role', 'name description icon')
        .populate('participants.person', 'name')
        .then((rotationEvents) => res.status(200).json({ rotationEvents }))
        .catch((error) => res.status(500).json({ error }));
};

const updateRotationEvent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationEventId = req.params.rotationEventId;

    return RotationEvent.findById(rotationEventId)
        .then((rotationEvent) => {
            if (rotationEvent) {
                rotationEvent.set(req.body);

                return rotationEvent
                    .save()
                    .then((rotationEvent) =>
                        res.status(201).json({ rotationEvent })
                    )
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteRotationEvent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationEventId = req.params.rotationEventId;

    return RotationEvent.findByIdAndDelete(rotationEventId)
        .then((rotationEventId) =>
            rotationEventId
                ? res.status(200).json({ message: 'deleted' })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createRotationEvent,
    readRotationEvent,
    readAllRotationEvents,
    updateRotationEvent,
    deleteRotationEvent,
};
