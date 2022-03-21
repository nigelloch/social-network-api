const { Schema, model } = require('mongoose');

// user model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    },
    {
    toJSON: {
    virtuals: true,
    getters: true
    },
    id: false
    }
);

// friend count virtual
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;