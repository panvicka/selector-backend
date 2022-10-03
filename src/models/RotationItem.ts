import mongoose, { Document, Schema } from 'mongoose';

export interface IRotationItem {
    name: string;
}

export interface IRotationItemModel extends IRotationItem, Document {}

const RotationItemSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<IRotationItemModel>(
    'rotation-item',
    RotationItemSchema
);
