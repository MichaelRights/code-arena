import { Task, TestCase } from "@/models/tasks";

export const TESTCASES: TestCase[] = [
  {
    id: 1,
    name: "TestCase 1",
    parameters: [
      { key: "num", value: "[4,5,6]" },
      { key: "target", value: 4 },
    ],
  },
  {
    id: 2,
    name: "TestCase 2",
    parameters: [{ key: "num", value: "[1,2,3]" }],
  },
];
const markdown = `
Given an array of integers \`\`\`nums\`\`\` and an integer \`\`\`target\`\`\`, return *indices of the two numbers such that they add up to* \`\`\`target\`\`\`.

You may assume that each input would have ***exactly one*** solution, and you may not use the *same element* twice.

You can return the answer in any order.

##### Example 1:

> **Input:** 😂
> 
> **Output:** 😒


##### Example 2:

> **Input:** 😒
> 
> **Output:** 😂

##### Constraints:

- \`2 <= nums.length <= 10^4^\`
- \`-10^9^ <= nums[i] <= 10^9^\`
- \`-10^9^ <= target <= 10^9^\`
- Only one valid answer exists.
`;
export const TASKS: Task[] = [
  {
    id: 1,
    title: "Some Task",
    solved: false,
    submitions: [],
    testCases: TESTCASES,
    defaultCode: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
    
    }
};`,
    language: "cpp",
    description: markdown,
  },
];
