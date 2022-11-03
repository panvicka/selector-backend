import mongoose, { Document, Schema } from 'mongoose';

export interface IRotationEvent {
    item: string;
    startDate: Date;
    endDate: Date | null;
}

type IParticipant = {
    role: { type: Schema.Types.ObjectId; ref: 'role' };
    person: { type: Schema.Types.ObjectId; ref: 'person' };
};

export interface IRotationEventModel extends IRotationEvent, Document {}

const subSchemaParticipants = new Schema(
    {
        role: {
            type: Schema.Types.ObjectId,
            ref: 'role',
        },
        person: {
            type: Schema.Types.ObjectId,
            ref: 'person',
        },
    },
    { _id: false }
);

const RotationEventSchema: Schema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'rotation-item',
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: false,
        },
        people: [{ type: Schema.Types.ObjectId, ref: 'person' }],
        participants: [subSchemaParticipants],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IRotationEventModel>(
    'rotation-event',
    RotationEventSchema
);
