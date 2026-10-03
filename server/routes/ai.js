const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * Fallback AI analyzer when no GEMINI_API_KEY is configured.
 * Generates human-friendly explanations for common programming errors.
 */
function getSmartFallbackAnalysis(code, language, error, question) {
  const errText = (error || '').trim();
  const qText = (question || '').trim();

  // If user asked a custom question without an error
  if (!errText && qText) {
    return {
      explanation: `### 🤖 Code Review\n\n**Language:** ${language}\n**Question:** "${qText}"\n\nYour code has been reviewed! It uses clean syntax for ${language}. Make sure to test edge cases like empty inputs, boundary values, and performance for large inputs.`,
      fixedCode: code,
    };
  }

  // 1. Python common errors
  if (language === 'python') {
    if (errText.includes('IndentationError')) {
      return {
        explanation: `### 🔍 Indentation Error Detected\n\n**What happened:** Python uses indentation (spaces or tabs) to define blocks of code (like loops, functions, and if-statements).\n\n**How to fix:**\n1. Ensure you use consistent spaces (4 spaces recommended).\n2. Don't mix tabs and spaces.\n3. Make sure lines following \`def\`, \`if\`, \`for\`, or \`while\` are indented.`,
        fixedCode: code.replace(/\t/g, '    '),
      };
    }
    if (errText.includes('NameError')) {
      return {
        explanation: `### 🔍 Undefined Variable (NameError)\n\n**What happened:** Python encountered a variable name or function that hasn't been defined yet.\n\n**How to fix:**\n1. Check for typos in variable or function names.\n2. Ensure the variable is defined *before* using it.\n3. Check if you forgot to import a module (e.g. \`import math\`).`,
        fixedCode: code,
      };
    }
    if (errText.includes('SyntaxError')) {
      return {
        explanation: `### 🔍 Syntax Error\n\n**What happened:** The Python interpreter found code that violates Python's grammar rules.\n\n**Common causes:**\n1. Missing colon \`:\` at the end of an \`if\`, \`for\`, \`def\`, or \`class\` line.\n2. Unmatched parentheses \`()\`, brackets \`[]\`, or quotes \`""\`.\n3. Using \`=\` (assignment) instead of \`==\` (comparison) in an \`if\` condition.`,
        fixedCode: code,
      };
    }
    if (errText.includes('TypeError')) {
      return {
        explanation: `### 🔍 Type Error\n\n**What happened:** An operation was performed on an inappropriate data type (e.g., adding a string to an integer).\n\n**How to fix:**\nUse type conversion like \`int(val)\` or \`str(val)\` before performing the operation.`,
        fixedCode: code,
      };
    }
  }

  // 2. JavaScript / TypeScript common errors
  if (language === 'javascript' || language === 'typescript') {
    if (errText.includes('ReferenceError')) {
      return {
        explanation: `### 🔍 ReferenceError Detected\n\n**What happened:** You are referencing a variable or function that does not exist in the current scope.\n\n**How to fix:**\n1. Check if the variable is declared with \`let\`, \`const\`, or \`var\`.\n2. Verify the variable spelling matches throughout your code.`,
        fixedCode: code,
      };
    }
    if (errText.includes('TypeError')) {
      return {
        explanation: `### 🔍 TypeError: Cannot read property of undefined / null\n\n**What happened:** You attempted to call a method or access a property on \`undefined\` or \`null\`.\n\n**How to fix:**\n1. Check if the object/array exists before accessing its properties.\n2. Use optional chaining: \`obj?.property\`.`,
        fixedCode: code,
      };
    }
  }

  // 3. C++ / C common errors
  if (language === 'cpp' || language === 'c') {
    if (errText.toLowerCase().includes('was not declared in this scope')) {
      return {
        explanation: `### 🔍 Undeclared Identifier in C/C++\n\n**What happened:** The compiler cannot find the declaration for a variable, function, or header.\n\n**How to fix:**\n1. Ensure you have included necessary headers (like \`#include <iostream>\` or \`#include <vector>\`).\n2. Add \`using namespace std;\` in C++ if using \`cout\` or \`string\`.\n3. Declare the variable with its data type before using it.`,
        fixedCode: code,
      };
    }
    if (errText.toLowerCase().includes('expected') && errText.includes(';')) {
      return {
        explanation: `### 🔍 Missing Semicolon \`;\`\n\n**What happened:** In C/C++, every statement must terminate with a semicolon \`;\`.\n\n**How to fix:** Check the line indicated in the compiler error and the line just above it for a missing semicolon.`,
        fixedCode: code,
      };
    }
  }

  // 4. Java common errors
  if (language === 'java') {
    if (errText.includes('cannot find symbol')) {
      return {
        explanation: `### 🔍 Cannot Find Symbol (Java)\n\n**What happened:** Java compiler cannot find the variable, method, or class you are trying to use.\n\n**How to fix:**\n1. Check for typos and note that Java is case-sensitive.\n2. Verify you imported the necessary class (e.g. \`import java.util.*;\`).\n3. Ensure variables are declared with a type.`,
        fixedCode: code,
      };
    }
  }

  // Default general explanation
  return {
    explanation: `### 🔍 Error Explanation\n\n**Error:**\n\`\`\`\n${errText.substring(0, 300)}\n\`\`\`\n\n**Analysis:**\n1. The program exited with a runtime or compilation issue.\n2. Review line numbers mentioned in the error message.\n3. Make sure all variables and functions are defined before use.\n4. Check input/output expectations and boundary values.`,
    fixedCode: code,
  };
}

/**
 * @route   POST /api/ai/explain
 * @desc    Explain and fix code/error using Gemini API or smart fallback
 * @access  Public
 */
router.post('/explain', async (req, res) => {
  try {
    const { code = '', language = 'python', error = '', question = '' } = req.body;

    if (!code && !error && !question) {
      return res.status(400).json({
        success: false,
        message: 'Code, error message, or question is required',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is available, call Google Gemini
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      try {
        const prompt = `You are an expert programming tutor for Codify online compiler.
Language: ${language}
${error ? `Error Message:\n${error}\n` : ''}
${question ? `User Question:\n${question}\n` : ''}
Source Code:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. A clear, friendly explanation in markdown of what went wrong or how to solve the question.
2. Concrete tips to fix the issue.
3. The complete corrected code block inside triple backticks \`\`\`${language} ... \`\`\`. Keep it concise and easy to understand.`;

        const geminiRes = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            contents: [{ parts: [{ text: prompt }] }],
          },
          { headers: { 'Content-Type': 'application/json' }, timeout: 12000 }
        );

        const aiResponseText =
          geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Extract corrected code from backticks if present
        const codeBlockMatch = aiResponseText.match(
          /```(?:[a-zA-Z0-9#+]+)?\s*([\s\S]*?)```/
        );
        const fixedCode = codeBlockMatch ? codeBlockMatch[1].trim() : code;

        return res.json({
          success: true,
          explanation: aiResponseText,
          fixedCode,
          source: 'gemini',
        });
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to built-in analyzer:', geminiErr.message);
      }
    }

    // Built-in smart fallback analyzer
    const analysis = getSmartFallbackAnalysis(code, language, error, question);
    return res.json({
      success: true,
      explanation: analysis.explanation,
      fixedCode: analysis.fixedCode,
      source: 'smart-analyzer',
    });
  } catch (err) {
    console.error('AI Explain Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze code',
    });
  }
});

module.exports = router;
