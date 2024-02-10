// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const positiveTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

const negativeTestCases = [
  { a: 1, b: 'wrong input', action: Action.Add },
  { a: 'wrong input here', b: 2, action: Action.Add },
  { a: null, b: 2, action: Action.Add },
  { a: 'smth here', b: 'here too', action: Action.Subtract },
  { a: 1, b: 2, action: '++' },
  { a: 1, b: undefined, action: Action.Subtract },
  { a: 'smth here', b: 'here too', action: Action.Subtract },
];

describe.each(positiveTestCases)(
  'simpleCalculator positive test cases',
  ({ a, b, action, expected }) => {
    test('should perform $action with numbers $a and $b', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);

describe.each(negativeTestCases)(
  'simpleCalculator negative test cases',
  ({ a, b, action }) => {
    test('should return null for invalid $action or invalid $a and $b params', () => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    });
  },
);
