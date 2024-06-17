import { Schema, model, models, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactModel = models.Contact || model<IContact>('Contact', ContactSchema);
