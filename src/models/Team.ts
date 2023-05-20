import { boolean } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam {
    name: string;
    description: string;
    icon: string;
    color: string;
    itemsUsingTeam: [];
}

export interface ITeamModel extends ITeam, Document {}

const TeamSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        icon: { type: String, required: true },
        color: { type: String, required: true },
        itemsUsingRole: [
            { type: Schema.Types.ObjectId, ref: 'item', required: false },
        ],
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<ITeamModel>('team', TeamSchema);
