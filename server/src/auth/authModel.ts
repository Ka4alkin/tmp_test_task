import mongoose, { Schema, Document } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 3, unique: true },
  surname: { type: String, required: true, minlength: 3 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Введіть дійсну адресу електронної пошти',
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 13,
    maxlength: 13,
    validate: {
      validator: function (value: string) {
        return /^(\+380\d{9})$/.test(value);
      },
      message: 'Введіть дійсний номер телефону у форматі +380xxxxxxxxx',
    },
  },
  // todo validate hash
  password: {
    type: String,
    required: true,
    minlength: 5,
    validate: {
      validator: function (value: string) {
        return /[A-Z]/.test(value);
      },
      message: 'Пароль має містити принаймні одну велику літеру',
    },
  },
}, { strict: 'throw',  versionKey: false });

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const UserModel = mongoose.model<IUser>('users', userSchema);

