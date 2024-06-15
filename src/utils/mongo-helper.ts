import mongoose from 'mongoose';

export const TObjectId = mongoose.Schema.Types.ObjectId;
export const ToObjectId = (id: string) =>
  mongoose.Types.ObjectId.createFromHexString(id);
