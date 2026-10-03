// Default starter code for each language
export const DEFAULT_CODE = {
  python: `# Python Hello World
print("Hello, World!")

# Try some basic operations
a, b = 10, 20
print(f"Sum: {a + b}")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)`,

  javascript: `// JavaScript Hello World
console.log("Hello, World!");

// Try some basic operations
const a = 10, b = 20;
console.log(\`Sum: \${a + b}\`);

// Arrow function & array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);`,

  typescript: `// TypeScript Hello World
interface User {
  id: number;
  name: string;
  role: string;
}

const user: User = {
  id: 1,
  name: "Codify Developer",
  role: "Full Stack Engineer"
};

console.log(\`Hello, \${user.name}! Role: \${user.role}\`);

// Function with typed parameters
function add(x: number, y: number): number {
  return x + y;
}
console.log("Sum:", add(15, 25));`,

  cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Vector demonstration
    vector<int> numbers = {10, 20, 30, 40, 50};
    int sum = 0;
    for (int n : numbers) {
        sum += n;
    }
    cout << "Sum of elements: " << sum << endl;
    
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    int a = 15, b = 25;
    printf("Sum: %d\\n", a + b);
    
    // Array example
    int arr[] = {2, 4, 6, 8, 10};
    int count = sizeof(arr) / sizeof(arr[0]);
    printf("Array elements: ");
    for(int i = 0; i < count; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Try some basic operations
        int a = 10, b = 20;
        System.out.println("Sum: " + (a + b));
        
        // Loop demonstration
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}`,

  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
        
        int a = 15, b = 35;
        Console.WriteLine($"Sum: {a + b}");
        
        string[] languages = { "C#", "Python", "JavaScript", "Rust" };
        Console.WriteLine("Languages:");
        foreach (var lang in languages) {
            Console.WriteLine($" - {lang}");
        }
    }
}`,

  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    a, b := 12, 18
    fmt.Printf("Sum: %d\\n", a + b)
    
    fruits := []string{"Apple", "Banana", "Cherry"}
    for idx, fruit := range fruits {
        fmt.Printf("%d: %s\\n", idx+1, fruit)
    }
}`,

  rust: `fn main() {
    println!("Hello, World!");
    
    let a = 20;
    let b = 30;
    println!("Sum: {}", a + b);
    
    let mut numbers = vec![1, 2, 3, 4, 5];
    numbers.push(6);
    println!("Vector: {:?}", numbers);
}`,

  kotlin: `fun main() {
    println("Hello, World!")
    
    val a = 10
    val b = 20
    println("Sum: \${a + b}")
    
    val items = listOf("Kotlin", "Java", "Scala")
    for (item in items) {
        println("Language: $item")
    }
}`,

  swift: `import Foundation

print("Hello, World!")

let a = 14
let b = 26
print("Sum: \\(a + b)")

let techStack = ["Swift", "iOS", "Backend"]
for tech in techStack {
    print("Learning \\(tech)")
}`,

  php: `<?php
echo "Hello, World!\n";

$a = 15;
$b = 35;
echo "Sum: " . ($a + $b) . "\n";

$frameworks = ["Laravel", "Symfony", "WordPress"];
echo "Frameworks:\n";
foreach ($frameworks as $fw) {
    echo " - $fw\n";
}
?>`,

  ruby: `puts "Hello, World!"

a = 10
b = 20
puts "Sum: #{a + b}"

colors = ["Red", "Green", "Blue"]
colors.each_with_index do |color, index|
  puts "#{index + 1}: #{color}"
end`,

  r: `cat("Hello, World!\n")

a <- 15
b <- 25
cat("Sum:", a + b, "\n")

numbers <- c(2, 4, 6, 8, 10)
cat("Mean:", mean(numbers), "\n")
`,
};

export const LANGUAGES = [
  { id: 'python', label: 'Python', monacoId: 'python', tag: 'PY', color: '#2563eb' },
  { id: 'javascript', label: 'JavaScript', monacoId: 'javascript', tag: 'JS', color: '#2563eb' },
  { id: 'typescript', label: 'TypeScript', monacoId: 'typescript', tag: 'TS', color: '#2563eb' },
  { id: 'cpp', label: 'C++', monacoId: 'cpp', tag: 'C++', color: '#2563eb' },
  { id: 'c', label: 'C', monacoId: 'c', tag: 'C', color: '#2563eb' },
  { id: 'java', label: 'Java', monacoId: 'java', tag: 'JV', color: '#2563eb' },
  { id: 'csharp', label: 'C#', monacoId: 'csharp', tag: 'C#', color: '#2563eb' },
  { id: 'go', label: 'Go', monacoId: 'go', tag: 'GO', color: '#2563eb' },
  { id: 'rust', label: 'Rust', monacoId: 'rust', tag: 'RS', color: '#2563eb' },
  { id: 'kotlin', label: 'Kotlin', monacoId: 'kotlin', tag: 'KT', color: '#2563eb' },
  { id: 'swift', label: 'Swift', monacoId: 'swift', tag: 'SW', color: '#2563eb' },
  { id: 'php', label: 'PHP', monacoId: 'php', tag: 'PHP', color: '#2563eb' },
  { id: 'ruby', label: 'Ruby', monacoId: 'ruby', tag: 'RB', color: '#2563eb' },
  { id: 'r', label: 'R', monacoId: 'r', tag: 'R', color: '#2563eb' },
];

export const LANGUAGE_MAP = Object.fromEntries(LANGUAGES.map((l) => [l.id, l]));
