const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: [
        'cpp',
        'c',
        'java',
        'python',
        'javascript',
        'typescript',
        'csharp',
        'go',
        'rust',
        'kotlin',
        'swift',
        'php',
        'ruby',
        'r',
      ],
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
    },
  },
  { timestamps: true }
);

// Index for fast user-based queries
snippetSchema.index({ userId: 1, updatedAt: -1 });

module.exports = mongoose.model('Snippet', snippetSchema);
