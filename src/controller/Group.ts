import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Group from '../models/Group';
import RotationItem from '../models/RotationItem';

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

const readGroup = async (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).send('Invalid group object id');
    }

    const allRotationItems = await RotationItem.find({ groupes: groupId });

    return Group.findById(groupId)
        .then((group) =>
            group
                ? res.status(200).json({ group: { group, allRotationItems } })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllGroups = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.query);

    const allGroupes = await Group.find();

    // todo returning too much information
    Promise.all(
        allGroupes.map(async (group) => {
            const items = await RotationItem.find({ groupes: group._id });
            return { ...group.toObject(), items };
        })
    )
        .then((groups) => res.status(200).json({ groups }))
        .catch((error) => res.status(500).json({ error }));
};

const updateGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).send('Invalid group object id');
    }

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

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).send('Invalid group object id');
    }

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
