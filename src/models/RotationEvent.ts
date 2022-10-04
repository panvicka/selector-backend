import mongoose, { Document, Schema } from 'mongoose';

export interface IRotationEvent {
    name: string;
    item: string;
}


export interface IRotationEventModel extends IRotationEvent, Document {}


const RotationEventSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        item: {type: Schema.Types.ObjectId, required: true, ref: 'rotation-item'}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IRotationEventModel>(
    'rotation-event',
    RotationEventSchema
);
