import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Team from '../models/Team';

const createTeam = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const {
        name,
        description,
        icon,
        canHaveMultipleParticipants,
        itemsUsingTeam,
    } = req.body;
    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        icon,
        canHaveMultipleParticipants,
        itemsUsingTeam,
    });

    return team
        .save()
        .then((team) => res.status(201).json({ team }))
        .catch((error) => res.status(500).json({ error }));
};

const readTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send('Invalid team object id');
    }

    return Team.findById(teamId)
        .populate('item')
        .then((teamId) =>
            teamId
                ? res.status(200).json({ teamId })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllTeams = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.item) {
        return Team.find({
            itemsCanBeAttended: { $elemMatch: { $eq: req.query.item } },
        })
            .then((teams) => res.status(200).json({ teams }))
            .catch((error) => res.status(500).json({ error }));
    }

    return Team.find()
        .then((teams) => res.status(200).json({ teams }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send('Invalid team object id');
    }

    return Team.findById(teamId)
        .then((team) => {
            if (team) {
                team.set(req.body);

                return team
                    .save()
                    .then((team) => res.status(201).json({ team }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send('Invalid team object id');
    }

    return Team.findByIdAndDelete(teamId)
        .then((teamId) =>
            teamId
                ? res.status(200).json({ message: 'deleted' })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createTeam,
    readTeam,
    readAllTeams,
    updateTeam,
    deleteTeam,
};
