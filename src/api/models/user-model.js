import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true,
        maxLength: 20
    },
    first_name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150,
        unique: true,
        email: true
    },
    password: {
        type: String,
        required: false,
        maxLength: 100
    },
    phone: {
        type: String,
        required: false,
        maxLength: 20
    },
    description: {
        type: String,
        required: false,
        maxLength: 2000
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true,
        maxLength: 30
    },
    forgot_password_code: {
        type: String,
        required: false,
        maxLength: 10,
        default: null
    },
    forgot_password_code_expiry: {
        type: Date,
        required: false,
        default: null
    },
    email_verification_code: {
        type: String,
        required: false,
        maxLength: 10,
        default: null
    },
    email_verification_code_expiry: {
        type: Date,
        required: false,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.is_deleted
        delete returnedObject.forgot_password_code
        delete returnedObject.forgot_password_code_expiry
        delete returnedObject.email_verification_code
        delete returnedObject.email_verification_code_expiry
        delete returnedObject.password
    }
});

// used to search by keyword
UserSchema.index({email: 'text', name: 'text'});

UserSchema.plugin(mongoosePaginate);

export default mongoose.model('userModel', UserSchema, 'users');