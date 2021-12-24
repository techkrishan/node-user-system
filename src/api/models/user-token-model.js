import mongoose from 'mongoose';

const UserTokenSchema = new mongoose.Schema({
    user_id: {
        type: Object,
        trim: true,
        required: true
    },
    token: {
        type: String,
        trim: true,
        required: true,
        maxLength: 500
    },
    refresh_token: {
        type: String,
        trim: true,
        required: true,
        maxLength: 500
    },
    last_used: {
        type: Date,
        required: false,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    },
});

UserTokenSchema.index({user_id: 'text', token: 'text'});

export default mongoose.model('userTokenModel', UserTokenSchema, 'user_tokens');