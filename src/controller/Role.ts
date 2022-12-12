import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Role from '../models/Role';

const createRole = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { name, description, icon, itemsUsingRole } = req.body;
    const role = new Role({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        icon,
        itemsUsingRole,
    });

    return role
        .save()
        .then((role) => res.status(201).json({ role }))
        .catch((error) => res.status(500).json({ error }));
};

const readRole = (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.params.roleId;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).send('Invalid role object id');
    }

    return Role.findById(roleId)
        .populate('item')
        .then((roleId) =>
            roleId
                ? res.status(200).json({ roleId })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAllRoles = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.item) {
        return Role.find({
            itemsCanBeAttended: { $elemMatch: { $eq: req.query.item } },
        })
            .then((roles) => res.status(200).json({ roles }))
            .catch((error) => res.status(500).json({ error }));
    }

    return Role.find()
        .then((roles) => res.status(200).json({ roles }))
        .catch((error) => res.status(500).json({ error }));
};

const updateRole = (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.params.roleId;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).send('Invalid role object id');
    }

    return Role.findById(roleId)
        .then((role) => {
            if (role) {
                role.set(req.body);

                return role
                    .save()
                    .then((role) => res.status(201).json({ role }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteRole = (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.params.roleId;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).send('Invalid role object id');
    }

    return Role.findByIdAndDelete(roleId)
        .then((roleId) =>
            roleId
                ? res.status(200).json({ message: 'deleted' })
                : res.status(404).json({ message: 'not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createRole,
    readRole,
    readAllRoles,
    updateRole,
    deleteRole,
};
