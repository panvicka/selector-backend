import mongoose, { Document, Schema } from 'mongoose';

export interface IGroup {
    name: string;
}

export interface IGroupModel extends IGroup, Document {}

const GroupSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        descriptions: { type: String, required: false },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<IGroupModel>('group', GroupSchema);
