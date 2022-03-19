const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// /api/thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thought/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/ :thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// /api/thoughts/ :thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .delete(deleteReaction)

module.exports = router;