import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Play, Code2 } from 'lucide-react';

const TUTORIALS = [
  {
    id: 'python-basics',
    language: 'python',
    tag: 'PY',
    color: '#3fb950',
    title: 'Python Basics',
    description: 'Variables, data types, loops, functions, and more.',
    lessons: [
      {
        title: 'Hello World & Variables',
        explanation: 'Python is a beginner-friendly language. Variables don\'t need type declarations.',
        code: `# Variables and print
name = "Alice"
age = 25
height = 5.6
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Student: {is_student}")
`,
      },
      {
        title: 'Loops & Lists',
        explanation: 'Python loops are clean and readable. Lists can hold multiple values.',
        code: `# Lists and loops
fruits = ["apple", "banana", "cherry", "mango"]

# for loop
print("All fruits:")
for fruit in fruits:
    print(f"  - {fruit}")

# range loop
print("\\nSquares 1-5:")
for i in range(1, 6):
    print(f"  {i}^2 = {i**2}")
`,
      },
      {
        title: 'Functions',
        explanation: 'Functions let you reuse code. Python functions use the `def` keyword.',
        code: `# Functions
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(greet("Alice"))
print(greet("Bob", "Hi"))
print(f"5! = {factorial(5)}")
`,
      },
    ],
  },
  {
    id: 'js-basics',
    language: 'javascript',
    tag: 'JS',
    color: '#ffd33d',
    title: 'JavaScript Essentials',
    description: 'Variables, functions, arrays, and modern ES6+ syntax.',
    lessons: [
      {
        title: 'Variables & Types',
        explanation: 'Use const for values that won\'t change, let for variables. Avoid var.',
        code: `// Modern JavaScript variables
const name = "Alice";
let age = 25;
const isStudent = true;

console.log(\`Name: \${name}\`);
console.log(\`Age: \${age}\`);
console.log(\`Type of name: \${typeof name}\`);

// Arrays
const colors = ["red", "green", "blue"];
console.log("Colors:", colors);
console.log("First:", colors[0]);
`,
      },
      {
        title: 'Arrow Functions',
        explanation: 'Arrow functions are a concise way to write functions in modern JavaScript.',
        code: `// Arrow functions
const add = (a, b) => a + b;
const square = n => n * n;
const greet = name => \`Hello, \${name}!\`;

console.log(add(3, 4));
console.log(square(5));
console.log(greet("Alice"));

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);
`,
      },
    ],
  },
  {
    id: 'cpp-basics',
    language: 'cpp',
    tag: 'C++',
    color: '#58a6ff',
    title: 'C++ Fundamentals',
    description: 'Syntax, pointers, loops, and standard template library.',
    lessons: [
      {
        title: 'Hello World & Variables',
        explanation: 'C++ is a statically typed, compiled language. Every variable needs a type.',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Alice";
    int age = 25;
    double height = 5.6;
    bool isStudent = true;

    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    cout << "Student: " << (isStudent ? "Yes" : "No") << endl;

    return 0;
}`,
      },
      {
        title: 'Loops & Arrays',
        explanation: 'C++ has for, while, and do-while loops. Arrays have fixed sizes.',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Vector (dynamic array)
    vector<int> numbers = {1, 2, 3, 4, 5};

    // Range-based for loop (C++11)
    cout << "Numbers: ";
    for (int n : numbers) {
        cout << n << " ";
    }
    cout << endl;

    // Classic for loop - squares
    cout << "Squares: ";
    for (int i = 1; i <= 5; i++) {
        cout << i*i << " ";
    }
    cout << endl;

    return 0;
}`,
      },
    ],
  },
  {
    id: 'java-basics',
    language: 'java',
    tag: 'JAVA',
    color: '#f0883e',
    title: 'Java Fundamentals',
    description: 'Classes, OOP, collections, and Java syntax.',
    lessons: [
      {
        title: 'Hello World',
        explanation: 'Java requires a class with a main method as the entry point.',
        code: `public class Main {
    public static void main(String[] args) {
        // Variables
        String name = "Alice";
        int age = 25;
        double height = 5.6;
        boolean isStudent = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height);
        System.out.println("Student: " + isStudent);
    }
}`,
      },
      {
        title: 'Methods & Loops',
        explanation: 'Methods in Java are defined inside classes. Java uses traditional for/while loops.',
        code: `public class Main {
    // Static method
    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        System.out.println(greet("Alice"));

        // Print factorials
        for (int i = 1; i <= 6; i++) {
            System.out.println(i + "! = " + factorial(i));
        }
    }
}`,
      },
    ],
  },
  {
    id: 'c-basics',
    language: 'c',
    tag: 'C',
    color: '#8b949e',
    title: 'C Programming',
    description: 'Pointers, memory management, functions, and structs.',
    lessons: [
      {
        title: 'Variables & printf',
        explanation: 'C is the mother of modern programming languages. Use format specifiers like %d and %s.',
        code: `#include <stdio.h>

int main() {
    int age = 22;
    float score = 95.5;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Score: %.1f\\n", score);
    printf("Grade: %c\\n", grade);

    return 0;
}`,
      },
      {
        title: 'Arrays & Loops',
        explanation: 'Arrays in C store elements in contiguous memory. Arrays are indexed starting at 0.',
        code: `#include <stdio.h>

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int count = sizeof(numbers) / sizeof(numbers[0]);

    printf("Numbers:\\n");
    for (int i = 0; i < count; i++) {
        printf("Index %d: %d\\n", i, numbers[i]);
    }

    return 0;
}`,
      },
    ],
  },
  {
    id: 'ts-basics',
    language: 'typescript',
    tag: 'TS',
    color: '#3178c6',
    title: 'TypeScript Essentials',
    description: 'Static typing, interfaces, generics, and modern TS features.',
    lessons: [
      {
        title: 'Types & Interfaces',
        explanation: 'TypeScript adds optional static typing to JavaScript to catch bugs early.',
        code: `interface Book {
  title: string;
  author: string;
  pages: number;
}

const book: Book = {
  title: "Clean Code",
  author: "Robert C. Martin",
  pages: 464,
};

function formatBook(b: Book): string {
  return \`"\${b.title}" by \${b.author} (\${b.pages} pages)\`;
}

console.log(formatBook(book));`,
      },
    ],
  },
  {
    id: 'go-basics',
    language: 'go',
    tag: 'GO',
    color: '#00ADD8',
    title: 'Go (Golang)',
    description: 'Fast, concurrent, compiled language by Google.',
    lessons: [
      {
        title: 'Packages, Variables & Slices',
        explanation: 'Go programs are made of packages. The := operator declares and initializes variables.',
        code: `package main

import "fmt"

func main() {
    message := "Welcome to Go!"
    fmt.Println(message)

    scores := []int{85, 92, 78, 96}
    total := 0
    for _, score := range scores {
        total += score
    }
    fmt.Printf("Average: %.2f\\n", float64(total)/float64(len(scores)))
}`,
      },
    ],
  },
  {
    id: 'rust-basics',
    language: 'rust',
    tag: 'RS',
    color: '#dea584',
    title: 'Rust Programming',
    description: 'Memory safety without garbage collection, concurrency, and speed.',
    lessons: [
      {
        title: 'Variables & Vectors',
        explanation: 'Variables in Rust are immutable by default. Use `mut` to allow modification.',
        code: `fn main() {
    let greeting = "Hello from Rust!";
    println!("{}", greeting);

    let mut numbers = vec![1, 2, 3];
    numbers.push(4);
    numbers.push(5);

    let sum: i32 = numbers.iter().sum();
    println!("Vector: {:?}", numbers);
    println!("Sum: {}", sum);
}`,
      },
    ],
  },
  {
    id: 'csharp-basics',
    language: 'csharp',
    tag: 'C#',
    color: '#9B4F96',
    title: 'C# Fundamentals',
    description: '.NET development, object-oriented concepts, and LINQ.',
    lessons: [
      {
        title: 'Classes & Collections',
        explanation: 'C# is a modern, object-oriented, type-safe programming language developed by Microsoft.',
        code: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.WriteLine("Hello from C#!");

        var list = new List<string> { "C#", "TypeScript", "Python" };
        foreach (var lang in list) {
            Console.WriteLine($"Learning: {lang}");
        }
    }
}`,
      },
    ],
  },
];

export default function TutorialsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // { tutorial, lessonIndex }

  if (selected) {
    const { tutorial, lessonIndex } = selected;
    const lesson = tutorial.lessons[lessonIndex];
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: '13px', fontWeight: '500', padding: 0 }}>
            Tutorials
          </button>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--accent-blue)', fontWeight: '600' }}>{tutorial.title}</span>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--text-secondary)' }}>{lesson.title}</span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.5px' }}>{lesson.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '15px', lineHeight: 1.7 }}>{lesson.explanation}</p>

        {/* Code box */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 16px',
            background: 'var(--bg-tertiary)',
            borderBottom: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <Code2 size={14} />
              <span>{tutorial.title} — {lesson.title}</span>
            </div>
            <button
              onClick={() => navigate('/editor', { state: { code: lesson.code, language: tutorial.language } })}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              <Play size={12} fill="white" />
              Run in Editor
            </button>
          </div>
          <pre style={{
            padding: '20px',
            margin: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            lineHeight: 1.8,
            color: '#e6edf3',
            overflowX: 'auto',
          }}>
            {lesson.code}
          </pre>
        </div>

        {/* Lesson nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={() => setSelected({ tutorial, lessonIndex: lessonIndex - 1 })}
            disabled={lessonIndex === 0}
            className="btn-secondary"
            style={{ opacity: lessonIndex === 0 ? 0.4 : 1 }}
          >
            ← Previous
          </button>
          <span style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
            {lessonIndex + 1} / {tutorial.lessons.length}
          </span>
          {lessonIndex < tutorial.lessons.length - 1 ? (
            <button
              onClick={() => setSelected({ tutorial, lessonIndex: lessonIndex + 1 })}
              className="btn-primary"
            >
              Next →
            </button>
          ) : (
            <button onClick={() => setSelected(null)} className="btn-secondary">
              ← Back to Tutorials
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <BookOpen size={24} color="var(--accent-blue)" />
          <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>Learn to Code</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Structured lessons with runnable examples. Pick a language and start learning.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {TUTORIALS.map((tutorial) => (
          <div
            key={tutorial.id}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '24px',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Top */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '42px', height: '42px',
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px', fontWeight: '700',
                color: '#60a5fa',
              }}>
                {tutorial.tag}
              </div>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: '700' }}>{tutorial.title}</h2>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {tutorial.lessons.length} lessons
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
              {tutorial.description}
            </p>

            {/* Lessons list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {tutorial.lessons.map((lesson, i) => (
                <div
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelected({ tutorial, lessonIndex: i }); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg-tertiary)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-tertiary)'; }}
                >
                  <span style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'rgba(37, 99, 235, 0.15)',
                    color: '#60a5fa',
                    fontSize: '10px', fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  {lesson.title}
                  <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelected({ tutorial, lessonIndex: 0 })}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '13px', padding: '9px' }}
            >
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
