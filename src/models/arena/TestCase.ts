export interface TestCase {
  id: number;
  name: string;
  testInput: string;
  testOutput?: string;
  testExpected?: string;
}
