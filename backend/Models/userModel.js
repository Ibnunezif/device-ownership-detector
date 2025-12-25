import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { loginValidator, registrationValidator } from '../validator/userValidator.js';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    profile_picture: { type: String, required: false, trim: true },
    phone_number: { type: String, required: true, trim: true },
    university_id: { type: String, required: true, unique: true, trim: true },
    department: { type: String, trim: true },
    batch: { type: String, trim: true },
    role: {
      type: String,
      enum: ['student', 'staff', 'admin', 'security_staff', 'security_chief'],
      default: 'student',
      required: true,
    },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


// SIGNUP
userSchema.statics.signup = async function (userData, profilePictureUrl = null) {
  // Joi validation
  const validatedData = await registrationValidator.validateAsync(userData, {
    abortEarly: false,
  });

  const {
    first_name,
    last_name,
    phone_number,
    university_id,
    department,
    batch,
    role,
    email,
    password,
  } = validatedData;

  // Check email
  const emailExists = await this.findOne({ email });
  if (emailExists) throw new Error("Email already in use");

  // Check university ID
  const idExists = await this.findOne({ university_id });
  if (idExists) throw new Error("University ID already registered");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await this.create({
    first_name,
    last_name,
    phone_number,
    university_id,
    department,
    batch,
    role: role || "student",
    email,
    password: hashedPassword,
    profile_picture: profilePictureUrl, 
  });

  return user;
};


// LOGIN
userSchema.statics.login = async function (userData) {
  // Validate login data
  const { email, password } = await loginValidator.validateAsync(userData,{ abortEarly: false });

  const user = await this.findOne({ email });
  if (!user) throw new Error('Incorrect email');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Incorrect password');

  return user;
};

export default mongoose.model('User', userSchema);