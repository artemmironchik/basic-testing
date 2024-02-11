// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const interval = 1000;
    const callback = jest.fn();

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const callback = jest.fn();
    const callAmount = 5;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * callAmount);

    expect(callback).toHaveBeenCalledTimes(callAmount);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    const fileName = 'tsconfig.json';

    await readFileAsynchronously(fileName);

    expect(spy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const fileName = 'non existing file';

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(fileName);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileName = 'filepath.txt';
    const mockValue = 'some value';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockValue);

    const result = await readFileAsynchronously(fileName);

    expect(result).toBe(mockValue);
  });
});
