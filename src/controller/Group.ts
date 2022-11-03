import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Group from '../models/Group';

const createGroup = (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
    });

    return group
        .save()
        .then((group) => res.status(201).json({ group }))
        .catch((error) => res.status(500).json({ error }));
};

const readGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;

    return Group.findById(groupId)
        .then((groupId) =>
            groupId
                ? res.status(200).json({ groupId })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllGroups = (req: Request, res: Response, next: NextFunction) => {
    return Group.find()
        .then((groups) => res.status(200).json({ groups }))
        .catch((error) => res.status(500).json({ error }));
};

const updateGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;

    return Group.findById(groupId)
        .then((group) => {
            if (group) {
                group.set(req.body);

                return group
                    .save()
                    .then((group) => res.status(201).json({ group }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;

    return Group.findByIdAndDelete(groupId)
        .then((groupId) =>
            groupId
                ? res.status(200).json({ message: 'deleted' })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createGroup,
    readGroup,
    readAllGroups,
    updateGroup,
    deleteGroup,
};
