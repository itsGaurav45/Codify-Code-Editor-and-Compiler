const express = require('express');
const axios = require('axios');

const router = express.Router();

// Judge0 language IDs
const LANGUAGE_IDS = {
  cpp: 54,        // C++ (GCC 9.2.0)
  c: 50,          // C (GCC 9.2.0)
  java: 62,       // Java (OpenJDK 13.0.1)
  python: 71,     // Python (3.8.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
  typescript: 74, // TypeScript (3.7.4)
  csharp: 51,     // C# (Mono 6.6.0.161)
  go: 60,         // Go (1.13.5)
  rust: 73,       // Rust (1.40.0)
  kotlin: 78,     // Kotlin (1.3.70)
  swift: 83,      // Swift (5.2.3)
  php: 68,        // PHP (7.4.1)
  ruby: 72,       // Ruby (2.7.0)
  r: 80,          // R (4.0.0)
};

const JUDGE0_BASE_URL = 'https://judge0-ce.p.rapidapi.com';

// @route  POST /api/code/run
// @desc   Submit code to Judge0 and return output
// @access Public (rate-limited in production)
router.post('/run', async (req, res) => {
  try {
    const { code, language, stdin = '' } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: 'Code and language are required' });
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return res.status(400).json({ success: false, message: `Unsupported language: ${language}` });
    }

    const apiKey = process.env.JUDGE0_API_KEY;
    if (!apiKey || apiKey === 'your_rapidapi_judge0_key_here') {
      // Demo mode: return mock output when no API key is set
      return res.json({
        success: true,
        output: `[Demo Mode] Code execution is disabled.\nPlease add your JUDGE0_API_KEY in server/.env\n\nYour ${language} code:\n${code.substring(0, 200)}${code.length > 200 ? '...' : ''}`,
        status: 'Demo',
        time: null,
        memory: null,
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com',
    };

    // Submit the code
    const submitResponse = await axios.post(
      `${JUDGE0_BASE_URL}/submissions?base64_encoded=false&wait=false`,
      {
        source_code: code,
        language_id: languageId,
        stdin: stdin,
      },
      { headers }
    );

    const token = submitResponse.data.token;

    // Poll for result (max 10 seconds)
    let result = null;
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 500));

      const resultResponse = await axios.get(
        `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=false&fields=status,stdout,stderr,compile_output,time,memory`,
        { headers }
      );

      result = resultResponse.data;
      // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, others=error
      if (result.status.id !== 1 && result.status.id !== 2) {
        break;
      }
    }

    if (!result) {
      return res.status(504).json({ success: false, message: 'Code execution timed out' });
    }

    // Build output string
    let output = '';
    if (result.compile_output) output += `Compilation Error:\n${result.compile_output}\n`;
    if (result.stderr) output += `Runtime Error:\n${result.stderr}\n`;
    if (result.stdout) output += result.stdout;
    if (!output) output = `Process exited with status: ${result.status.description}`;

    res.json({
      success: true,
      output,
      status: result.status.description,
      time: result.time,
      memory: result.memory,
    });
  } catch (err) {
    console.error('Code run error:', err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: err.response?.data?.message || 'Failed to execute code',
    });
  }
});

module.exports = router;
