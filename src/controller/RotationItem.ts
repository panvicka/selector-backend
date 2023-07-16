import { NextFunction, Request, Response } from 'express';

import Person from '../models/Person';
import RotationEvent from '../models/RotationEvent';
import RotationItem from '../models/RotationItem';
import { addItemToArrayIfNotAlreadyThere } from '../utils/arrayUtils';
import {
    filterByDate,
    filterByLessThenAverageAttendance,
    filterPeoplePlannedInFutureEvents,
    filterPeopleWhoHasNotDoneTheRole,
} from './helpers/rotationItemsHelpers';

import mongoose from 'mongoose';

let ObjectID = require('mongodb').ObjectID;

// const addItemToAllPeopleWithinGroup = async (itemId, groupId) => {
//     let possiblePersons = await Person.find({
//         groupes: { $elemMatch: { $eq: groupId } },
//     });

//     possiblePersons.forEach((person) => {
//         let ajdustedItemsToAttend = [...person.itemsCanBeAttended];
//         ajdustedItemsToAttend = addItemToArrayIfNotAlreadyThere(
//             ajdustedItemsToAttend,
//             groupId
//         );
//         let newPersonBody = {
//             ...person,
//             ajdustedItemsToAttend,
//         };
//         if (person) {
//             person.set(newPersonBody);
//         }
//     });
// };

const createRotationItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        name,
        roles,
        description,
        longDescription,
        isLongerThenOneDay,
        usualLenght,
        groupes,
        hasAutomaticStartDate,
    } = req.body;
    const rotationItem = new RotationItem({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        longDescription,
        roles,
        isLongerThenOneDay,
        usualLenght,
        groupes,
        hasAutomaticStartDate,
    });
    return rotationItem
        .save()
        .then((rotationItem) => res.status(201).json({ rotationItem }))
        .catch((error) => res.status(500).json({ error }));
};

const readRotationItem = (req: Request, res: Response, next: NextFunction) => {
    const rotationItemId = req.params.rotationItemId;

    if (!mongoose.Types.ObjectId.isValid(rotationItemId)) {
        return res.status(400).send('Invalid item object id');
    }

    return RotationItem.findById(rotationItemId)
        .populate('roles')
        .populate('groupes')
        .then((rotationItemId) =>
            rotationItemId
                ? res.status(200).json({ rotationItemId })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const getCountForPosition = (allEvents: any, allPersons: any, roleId: any) => {
    let personAttendedToRole = 0;
    let arrayOfPeopleAttendance: any = [];

    allPersons.forEach((person: any) => {
        personAttendedToRole = 0;
        let latestDate: any = null;
        let dates: any = [];
        allEvents.forEach((event: any) => {
            event.participants.forEach((participant: any) => {
                if (
                    participant.role._id.toString() == roleId.toString() &&
                    participant.person._id.toString() == person._id.toString()
                ) {
                    personAttendedToRole = personAttendedToRole + 1;
                    dates.push(event.startDate);
                    if (event.startDate > latestDate) {
                        latestDate = event.startDate;
                    }
                }
            });
        });
        arrayOfPeopleAttendance.push({
            name: person.name,
            _id: person._id,
            active: person.active,
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

    if (!mongoose.Types.ObjectId.isValid(rotationItemId)) {
        return res.status(400).send('Invalid item object id');
    }

    const rotationItem = await RotationItem.findById(rotationItemId).populate(
        'roles'
    );

    if (!rotationItem) {
        return res.status(404).json({ message: 'item not found' });
    }

    let possiblePersons = await Person.find({
        itemsCanBeAttended: { $elemMatch: { $eq: rotationItemId } },
    });
    const possibleEvents = await RotationEvent.find({ item: rotationItemId });

    let attendanceByRole: any = {};

    rotationItem.roles.forEach((role: any) => {
        attendanceByRole[role.name] = getCountForPosition(
            possibleEvents,
            possiblePersons,
            role._id
        );
    });

    res.status(200).json({ attendanceByRole });
};

const getRotationItemIdEvents = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;

    console.log(req.query.timeWindow);
    console.log(req.query.limit);

    if (rotationItemId) {
        return RotationEvent.find({
            item: { _id: rotationItemId },
        })
            .populate('item')
            .sort('startDate')
            .populate('participants.role', 'name description icon')
            .populate('participants.person', 'name')
            .then((rotationEvents) => res.status(200).json({ rotationEvents }))
            .catch((error) => res.status(500).json({ error }));
    }
};

const getRotationItemIdRecentEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;
    console.log('getRotationItemIdRecentEvents');
    console.log(req.query.timeRange);
    console.log(req.query.limit);
    let limit = req.query.limit?.toString();
    // let events;

    if (!mongoose.Types.ObjectId.isValid(rotationItemId)) {
        return res.status(400).send('Invalid item object id');
    }

    let events = await RotationEvent.find({
        item: { _id: rotationItemId },
    })
        .populate('item')
        .sort('startDate')
        .populate('participants.role', 'name description icon')
        .populate('participants.person', 'name');

    if (limit) {
        if (events?.length > 0 && events?.length > parseInt(limit)) {
            events = events?.slice(-parseInt(limit));
        }
    }
    console.log(events);
    res.status(200).json({ events });
};

const readAllRotationItems = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.query.group);
    if (req.query.group) {
        console.log('hledam');
        return RotationItem.find({ groupes: req.query.group })
            .then((rotationItems) => res.status(200).json({ rotationItems }))
            .catch((error) => res.status(500).json({ error }));
    }

    return RotationItem.find()
        .populate('roles')
        .populate('groupes')
        .then((rotationItems) => res.status(200).json({ rotationItems }))
        .catch((error) => res.status(500).json({ error }));
};

const updateRotationItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;

    if (!mongoose.Types.ObjectId.isValid(rotationItemId)) {
        return res.status(400).send('Invalid item object id');
    }

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

    if (!mongoose.Types.ObjectId.isValid(rotationItemId)) {
        return res.status(400).send('Invalid item object id');
    }

    return RotationItem.findByIdAndDelete(rotationItemId)
        .then((rotationItemId) =>
            rotationItemId
                ? res.status(200).json({ message: 'deleted' })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const randomizePeople = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rotationItemId = req.params.rotationItemId;
    const roleId = req.params.roleId;

    if (!mongoose.Types.ObjectId.isValid(rotationItemId)) {
        return res.status(400).send('Invalid item object id');
    }
    const rotationItem = await RotationItem.findById(rotationItemId).populate(
        'roles'
    );

    if (!rotationItem) {
        return res.status(404).json({ message: 'item not found' });
    }

    console.log(req.query);
    let daysSince = req.query['days-since'];
    let lessThenAverage = req.query['less-average'];
    let notAlreadyPlanned = req.query['not-planned'];
    let hasDoneTheRole = req.query['has-done'];
    console.log('daysSince', daysSince);
    console.log('lessThenAverage', lessThenAverage);
    console.log('notAlreadyPlanned', notAlreadyPlanned);
    console.log('hasDoneTheRole', hasDoneTheRole);

    let possiblePersons = await Person.find({
        itemsCanBeAttended: { $elemMatch: { $eq: rotationItemId } },
    });
    console.log(possiblePersons);
    const numberOfPeople = possiblePersons.length;
    // select random person

    let randomPerson =
        possiblePersons[Math.floor(Math.random() * numberOfPeople)];
    console.log(randomPerson);

    const possibleEvents = await RotationEvent.find({ item: rotationItemId });
    let attendanceByRole: any = {};

    rotationItem.roles.forEach((role: any) => {
        attendanceByRole[role.id] = getCountForPosition(
            possibleEvents,
            possiblePersons,
            role._id
        );
    });

    let possibleMatches = attendanceByRole[roleId];
    console.log('before');
    console.log(possibleMatches);

    if (hasDoneTheRole === 'true') {
        possibleMatches = filterPeopleWhoHasNotDoneTheRole(possibleMatches);
    }
    if (lessThenAverage === 'true') {
        possibleMatches = filterByLessThenAverageAttendance(possibleMatches);
    }
    if (notAlreadyPlanned === 'true') {
        possibleMatches = filterPeoplePlannedInFutureEvents(
            possibleMatches,
            new Date()
        );
    }
    possibleMatches = filterByDate(possibleMatches, daysSince, new Date());

    console.log('after');
    console.log(possibleMatches);

    res.status(200).json({ randomPerson });
};

export default {
    createRotationItem,
    readRotationItem,
    readAllRotationItems,
    updateRotationItem,
    deleteRotationItem,
    getRotationItemIdPeopleCount,
    getRotationItemIdRecentEvents,
    getRotationItemIdEvents,
    randomizePeople,
};
