// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/todos');

    jest.runAllTimers();

    expect(spy).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const url = '/todos';
    const spy = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(url);

    jest.runAllTimers();

    expect(spy).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const data = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
      {
        userId: 1,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
      },
    ];

    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({ data });

    const result = await throttledGetDataFromApi('/todos');

    expect(result).toBe(data);
  });
});
