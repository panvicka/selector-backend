import mongoose, { Document, Schema } from 'mongoose';

export interface IRotationItem {
    name: string;
    memberTitles: string[];
}

export interface IRotationItemModel extends IRotationItem, Document {}

const RotationItemSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        memberTitles: {
            type: [{ type: String }],
            required: false,
        },
        roles: [{ type: Schema.Types.ObjectId, ref: 'role', required: false }],
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<IRotationItemModel>(
    'rotation-item',
    RotationItemSchema
);
