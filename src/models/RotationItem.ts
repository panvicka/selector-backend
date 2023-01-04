import { boolean } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IRotationItem {
    name: string;
    roles: [];
    description: string;
    longDescription: string;
    isLongerThenOneDay: boolean;
    groups: [];
}

export interface IRotationItemModel extends IRotationItem, Document {}

const RotationItemSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        roles: [{ type: Schema.Types.ObjectId, ref: 'role', required: false }],
        description: { type: String, required: false },
        longDescription: { type: String, required: false },
        isLongerThenOneDay: { type: Boolean, required: false },
        groupes: [
            { type: Schema.Types.ObjectId, ref: 'group', required: false },
        ],
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<IRotationItemModel>(
    'rotation-item',
    RotationItemSchema
);
