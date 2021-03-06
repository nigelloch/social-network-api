const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId() 
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        } 
    },
        {
        toJSON: {
            getters: true
            },
            id: false
        }
);

// thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ]
    
    },
    {
        toJSON: {
        getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
        }
);

// reaction count virtual
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;