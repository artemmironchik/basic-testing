// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = [1, 2, 3, 4];
  const linkedList = {
    next: {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 4,
        },
        value: 3,
      },
      value: 2,
    },
    value: 1,
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements)).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
