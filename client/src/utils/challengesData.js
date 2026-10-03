export const CHALLENGES = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['Most Popular', 'Interview Prep'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, find the indices of two numbers such that they add up to \`target\`.

You may assume that each input has exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] == 6.' },
    ],
    starterCode: {
      python: `# Two Sum Problem
def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test with example
print(two_sum([2, 7, 11, 15], 9))
`,
      javascript: `// Two Sum Problem
function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Test with example
console.log(twoSum([2, 7, 11, 15], 9));
`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> result = twoSum(nums, 9);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] res = twoSum(nums, 9);
        System.out.println(Arrays.toString(res));
    }
}`,
    },
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    difficulty: 'Easy',
    category: 'Strings',
    tags: ['Beginner', 'Strings'],
    description: `A phrase or string is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    examples: [
      { input: '"racecar"', output: 'true', explanation: 'Reads the same backward and forward.' },
      { input: '"hello"', output: 'false', explanation: 'Does not read same backward.' },
    ],
    starterCode: {
      python: `# Palindrome Check
def is_palindrome(s):
    # Clean string: lowercase and alphanumeric only
    clean = ''.join(c.lower() for c in s if c.isalnum())
    return clean == clean[::-1]

print("racecar ->", is_palindrome("racecar"))
print("hello ->", is_palindrome("hello"))
`,
      javascript: `// Palindrome Check
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

console.log("racecar ->", isPalindrome("racecar"));
console.log("hello ->", isPalindrome("hello"));
`,
      cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

bool isPalindrome(string s) {
    string clean = "";
    for (char c : s) {
        if (isalnum(c)) clean += tolower(c);
    }
    string rev = clean;
    reverse(rev.begin(), rev.end());
    return clean == rev;
}

int main() {
    cout << "racecar -> " << (isPalindrome("racecar") ? "true" : "false") << endl;
    cout << "hello -> " << (isPalindrome("hello") ? "true" : "false") << endl;
    return 0;
}`,
      java: `public class Main {
    public static boolean isPalindrome(String s) {
        String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        String rev = new StringBuilder(clean).reverse().toString();
        return clean.equals(rev);
    }

    public static void main(String[] args) {
        System.out.println("racecar -> " + isPalindrome("racecar"));
        System.out.println("hello -> " + isPalindrome("hello"));
    }
}`,
    },
  },
  {
    id: 'fizz-buzz',
    title: 'FizzBuzz Classic',
    difficulty: 'Easy',
    category: 'Algorithms',
    tags: ['Interview Classic', 'Logic'],
    description: `Given an integer \`n\`, return a string representation of numbers from 1 to \`n\`:
- For multiples of 3, print "Fizz"
- For multiples of 5, print "Buzz"
- For numbers which are multiples of both 3 and 5, print "FizzBuzz"
- Otherwise, print the number.`,
    examples: [
      { input: 'n = 15', output: '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz' },
    ],
    starterCode: {
      python: `# FizzBuzz
def fizz_buzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizz_buzz(15))
`,
      javascript: `// FizzBuzz
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(String(i));
  }
  return result;
}

console.log(fizzBuzz(15));
`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n = 15;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) cout << "FizzBuzz ";
        else if (i % 3 == 0) cout << "Fizz ";
        else if (i % 5 == 0) cout << "Buzz ";
        else cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        int n = 15;
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) System.out.print("FizzBuzz ");
            else if (i % 3 == 0) System.out.print("Fizz ");
            else if (i % 5 == 0) System.out.print("Buzz ");
            else System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
    },
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    category: 'Strings',
    tags: ['Beginner', 'Fundamentals'],
    description: `Write a function that reverses a string. The input string is given as an array of characters or string.`,
    examples: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"Codify"', output: '"yfidoC"' },
    ],
    starterCode: {
      python: `# Reverse a String
def reverse_string(s):
    return s[::-1]

print(reverse_string("hello"))
print(reverse_string("Codify"))
`,
      javascript: `// Reverse a String
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("hello"));
console.log(reverseString("Codify"));
`,
      cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string reverseString(string s) {
    reverse(s.begin(), s.end());
    return s;
}

int main() {
    cout << reverseString("hello") << endl;
    cout << reverseString("Codify") << endl;
    return 0;
}`,
      java: `public class Main {
    public static String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    public static void main(String[] args) {
        System.out.println(reverseString("hello"));
        System.out.println(reverseString("Codify"));
    }
}`,
    },
  },
  {
    id: 'find-maximum',
    title: 'Find Maximum in Array',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['Arrays', 'Fundamentals'],
    description: `Given an array of numbers, find the largest element in the array without using built-in max functions.`,
    examples: [
      { input: '[12, 45, 2, 89, 34]', output: '89' },
    ],
    starterCode: {
      python: `# Find Maximum in Array
def find_max(numbers):
    if not numbers:
        return None
    max_val = numbers[0]
    for num in numbers:
        if num > max_val:
            max_val = num
    return max_val

nums = [12, 45, 2, 89, 34]
print("Max value:", find_max(nums))
`,
      javascript: `// Find Maximum in Array
function findMax(numbers) {
  if (!numbers.length) return null;
  let maxVal = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxVal) {
      maxVal = numbers[i];
    }
  }
  return maxVal;
}

const nums = [12, 45, 2, 89, 34];
console.log("Max value:", findMax(nums));
`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findMax(const vector<int>& numbers) {
    int maxVal = numbers[0];
    for (int n : numbers) {
        if (n > maxVal) maxVal = n;
    }
    return maxVal;
}

int main() {
    vector<int> nums = {12, 45, 2, 89, 34};
    cout << "Max value: " << findMax(nums) << endl;
    return 0;
}`,
      java: `public class Main {
    public static int findMax(int[] numbers) {
        int maxVal = numbers[0];
        for (int n : numbers) {
            if (n > maxVal) maxVal = n;
        }
        return maxVal;
    }

    public static void main(String[] args) {
        int[] nums = {12, 45, 2, 89, 34};
        System.out.println("Max value: " + findMax(nums));
    }
}`,
    },
  },
  {
    id: 'fibonacci-number',
    title: 'Fibonacci Number',
    difficulty: 'Medium',
    category: 'Math',
    tags: ['Recursion', 'Dynamic Programming'],
    description: `The **Fibonacci numbers**, commonly denoted \`F(n)\`, form a sequence where each number is the sum of the two preceding ones, starting from 0 and 1:
\`F(0) = 0, F(1) = 1\`
\`F(n) = F(n - 1) + F(n - 2)\`, for \`n > 1\`.
Given \`n\`, calculate \`F(n)\`.`,
    examples: [
      { input: 'n = 6', output: '8', explanation: 'Sequence: 0, 1, 1, 2, 3, 5, 8' },
      { input: 'n = 10', output: '55' },
    ],
    starterCode: {
      python: `# Fibonacci Number
def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print("F(6) =", fibonacci(6))
print("F(10) =", fibonacci(10))
`,
      javascript: `// Fibonacci Number
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

console.log("F(6) =", fibonacci(6));
console.log("F(10) =", fibonacci(10));
`,
      cpp: `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

int main() {
    cout << "F(6) = " << fibonacci(6) << endl;
    cout << "F(10) = " << fibonacci(10) << endl;
    return 0;
}`,
      java: `public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }

    public static void main(String[] args) {
        System.out.println("F(6) = " + fibonacci(6));
        System.out.println("F(10) = " + fibonacci(10));
    }
}`,
    },
  },
];
