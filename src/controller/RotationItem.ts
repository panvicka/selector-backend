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

const getCountOfAttendForPerson = (
    allEvents: any,
    person: any,
    rolePosition: any
) => {
    let attended = 0;
    allEvents.forEach((event: any) => {
        const idArray = event.people.toString().split(',');
        const personID = person._id.toString();
        if (idArray[rolePosition] == personID) {
            attended = attended + 1;
        }
    });

    return {
        [rolePosition]: {
            _id: person._id,
            name: person.name,
            attended: attended,
        },
    };
};

const getCountForPosition = (
    allEvents: any,
    allPersons: any,
    rolePosition: any
) => {
    let personAttendedToRole = 0;
    let arrayOfPeopleAttendance: any = [];

    allPersons.forEach((person: any) => {
        personAttendedToRole = 0;
        let latestDate:any = null;
        let dates: any = [];
        allEvents.forEach((event: any) => {
            const idArray = event.people.toString().split(',');
            const personID = person._id.toString();
            dates.push(event.startDate);

            if (idArray[rolePosition] == personID) {
                personAttendedToRole = personAttendedToRole + 1;
                if (event.startDate > latestDate) {
                    latestDate = event.startDate;
                }
            }
        });

        arrayOfPeopleAttendance.push({
            name: person.name,
            _id: person._id,
            attended: personAttendedToRole,
            latestDate,
            dates,
        });
    });

    return arrayOfPeopleAttendance;
};

const getRotationItemIdPeopleCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;

    const rotationItem = await RotationItem.findById(rotationItemId);

    if (!rotationItem) {
        return res.status(404).json({ message: 'item not found' });
    }

    let possiblePersons = await Person.find({
        itemsCanBeAttended: { $elemMatch: { $eq: rotationItemId } },
    });
    const possibleEvents = await RotationEvent.find({ item: rotationItemId });

    let attendanceByRole: any = {};

    rotationItem.memberTitles.forEach((title, index) => {
        attendanceByRole[title] = getCountForPosition(
            possibleEvents,
            possiblePersons,
            index
        );
    });

    res.status(200).json({ attendanceByRole });
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
