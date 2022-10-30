import mongoose, { Document, Schema } from 'mongoose';

export interface IRole {
    name: string;
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        itemsUsingRole: [
            { type: Schema.Types.ObjectId, ref: 'item', required: false },
        ],
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<IRoleModel>('role', RoleSchema);
