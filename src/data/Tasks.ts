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
    description: `
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1f1f1f; color: #ffffff; margin: 0; padding: 0;">
    
        <div style="max-width: 800px;  padding: 20px; background-color: #2c2c2c; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);">
            <div data-track-load="description_content" style="margin-bottom: 20px;">
                <p style="margin-bottom: 15px;">Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
                <p style="margin-bottom: 15px;">You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>
                <p style="margin-bottom: 15px;">You can return the answer in any order.</p>
                <div style="margin-bottom: 15px; background-color: #333333; padding: 10px; border-radius: 5px; overflow-x: auto;">
                    <p style="margin: 0; font-family: 'Courier New', Courier, monospace; white-space: nowrap; line-height: 1.5;">
                        <strong>Input:</strong> nums = [2,7,11,15], target = 9<br>
                        <strong>Output:</strong> [0,1]<br>
                        <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                    </p>
                </div>
                <div style="margin-bottom: 15px; background-color: #333333; padding: 10px; border-radius: 5px; overflow-x: auto;">
                    <p style="margin: 0; font-family: 'Courier New', Courier, monospace; white-space: nowrap; line-height: 1.5;">
                        <strong>Input:</strong> nums = [3,2,4], target = 6<br>
                        <strong>Output:</strong> [1,2]
                    </p>
                </div>
                <div style="margin-bottom: 15px; background-color: #333333; padding: 10px; border-radius: 5px; overflow-x: auto;">
                    <p style="margin: 0; font-family: 'Courier New', Courier, monospace; white-space: nowrap; line-height: 1.5;">
                        <strong>Input:</strong> nums = [3,3], target = 6<br>
                        <strong>Output:</strong> [0,1]
                    </p>
                </div>
                <p style="margin-bottom: 15px;">Constraints:</p>
                <ul style="list-style: none; padding-left: 0; margin-bottom: 15px;">
                    <li style="margin-bottom: 5px;"><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
                    <li style="margin-bottom: 5px;"><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
                    <li style="margin-bottom: 5px;"><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
                    <li><strong>Only one valid answer exists.</strong></li>
                </ul>
                <p><strong>Follow-up: </strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code> time complexity?</p>
            </div>
        </div>
    
    </body>`,
  },
];
