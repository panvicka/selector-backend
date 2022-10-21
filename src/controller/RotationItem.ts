import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import RotationItem from '../models/RotationItem';
import Person from '../models/Person';
import RotationEvent from '../models/RotationEvent';

const createRotationItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, memberTitles } = req.body;
    const rotationItem = new RotationItem({
        _id: new mongoose.Types.ObjectId(),
        name,
        memberTitles,
    });

    return rotationItem
        .save()
        .then((rotationItem) => res.status(201).json({ rotationItem }))
        .catch((error) => res.status(500).json({ error }));
};

const readRotationItem = (req: Request, res: Response, next: NextFunction) => {
    const rotationItemId = req.params.rotationItemId;

    return RotationItem.findById(rotationItemId)
        .then((rotationItemId) =>
            rotationItemId
                ? res.status(200).json({ rotationItemId })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const getRotationItemIdPeopleCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;
    const role = req.query.position || "empty";
    const rotationItem = await RotationItem.findById(rotationItemId);
    let rolePosition = 0

    if (rotationItem) {
        rolePosition = rotationItem.memberTitles.indexOf(role.toString());
    }

    // get all people that can attend
    let possiblePersons = await Person.find({
        itemsCanBeAttended: { $elemMatch: { $eq: rotationItemId } },
    });

    let returnVal;

    const possibleEvents = await RotationEvent.find({ item: rotationItemId });

    returnVal = possiblePersons.map((person) => {
        let attended = 0;
        possibleEvents.forEach((event: any) => {
            const idArray = event.people.toString().split(',');
            const personID = person._id.toString();
            if (idArray[rolePosition] == personID) {
                attended = attended + 1;
            }
        });
        console.log(attended);

        return {
            _id: person._id,
            name: person.name,
            attended: attended,
        };
    });

    res.status(200).json({ returnVal });
};

const readAllRotationItems = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return RotationItem.find()
        .then((rotationItems) => res.status(200).json({ rotationItems }))
        .catch((error) => res.status(500).json({ error }));
};

const updateRotationItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;

    return RotationItem.findById(rotationItemId)
        .then((rotationItem) => {
            if (rotationItem) {
                rotationItem.set(req.body);

                return rotationItem
                    .save()
                    .then((rotationItem) =>
                        res.status(201).json({ rotationItem })
                    )
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteRotationItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;

    return RotationItem.findByIdAndDelete(rotationItemId)
        .then((rotationItemId) =>
            rotationItemId
                ? res.status(200).json({ message: 'deleted' })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createRotationItem,
    readRotationItem,
    readAllRotationItems,
    updateRotationItem,
    deleteRotationItem,
    getRotationItemIdPeopleCount,
};
