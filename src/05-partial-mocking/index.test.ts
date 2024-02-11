// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => undefined),
    mockTwo: jest.fn(() => undefined),
    mockThree: jest.fn(() => undefined),
  };
});

describe('partial mocking', () => {
  let spy;

  beforeAll(() => {
    spy = jest.fn();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    spy = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(spy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    spy = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(spy).toHaveBeenCalled();
  });
});
