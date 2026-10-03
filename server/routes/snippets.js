const express = require('express');
const Snippet = require('../models/Snippet');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route  GET /api/snippets
// @desc   Get all snippets for the logged-in user
// @access Private
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.user._id })
      .select('title language createdAt updatedAt')
      .sort({ updatedAt: -1 });

    res.json({ success: true, snippets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  GET /api/snippets/:id
// @desc   Get a single snippet by ID
// @access Private
router.get('/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, userId: req.user._id });
    if (!snippet) {
      return res.status(404).json({ success: false, message: 'Snippet not found' });
    }
    res.json({ success: true, snippet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  POST /api/snippets
// @desc   Save a new snippet
// @access Private
router.post('/', async (req, res) => {
  try {
    const { title, language, code } = req.body;

    if (!title || !language || !code) {
      return res.status(400).json({ success: false, message: 'Title, language, and code are required' });
    }

    const snippet = await Snippet.create({
      userId: req.user._id,
      title,
      language,
      code,
    });

    res.status(201).json({ success: true, snippet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  PUT /api/snippets/:id
// @desc   Update an existing snippet
// @access Private
router.put('/:id', async (req, res) => {
  try {
    const { title, language, code } = req.body;

    const snippet = await Snippet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, language, code },
      { new: true, runValidators: true }
    );

    if (!snippet) {
      return res.status(404).json({ success: false, message: 'Snippet not found' });
    }

    res.json({ success: true, snippet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  DELETE /api/snippets/:id
// @desc   Delete a snippet
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!snippet) {
      return res.status(404).json({ success: false, message: 'Snippet not found' });
    }

    res.json({ success: true, message: 'Snippet deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
