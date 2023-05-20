import mongoose, { Document, Schema } from 'mongoose';

export interface IPerson {
    name: string;
    active: boolean;
    itemsCanBeAttended: [];
    groupes: [];
    teams: [];
}

export interface IPersonModel extends IPerson, Document {}

const PersonSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        itemsCanBeAttended: [{ type: Schema.Types.ObjectId, ref: 'item' }],
        groupes: [
            { type: Schema.Types.ObjectId, ref: 'group', required: false },
        ],
        active: { type: Boolean, required: true },
        teams: [{ type: Schema.Types.ObjectId, ref: 'team', required: false }],
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<IPersonModel>('person', PersonSchema);
