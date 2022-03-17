const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: string,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: string,
        required: true,
        unique: true
    },
    thoughts: {
        
    },
    friends: {
        
    }
    },
    {
    toJSON: {
    virtuals: true,
    getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
    }
);

// get total count of comments and replies on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.comments.reduce(
      (total, comment) => total + comment.replies.length + 1,
      0
    );
});

const User = model('User', userSchema);

module.exports = User;