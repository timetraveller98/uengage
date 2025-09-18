import axios, { type AxiosInstance } from "axios";
import api from "./axios";

describe("Axios instance", () => {
  it("should have correct baseURL and timeout", () => {
    expect(api.defaults.baseURL).toBe("https://jsonplaceholder.typicode.com");
    expect(api.defaults.timeout).toBe(10000);
  });
});

describe("Axios requests", () => {
  it("should perform a GET request", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResponse = { data: { id: 1, title: "Test Post" } };

    const mockClient: jest.Mocked<AxiosInstance> = {
      get: jest.fn().mockResolvedValue(mockedResponse),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
      patch: jest.fn(),
      request: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      defaults: {
        baseURL: "https://jsonplaceholder.typicode.com",
        timeout: 10000,
        headers: {},
      },
    } as unknown as jest.Mocked<AxiosInstance>;

    mockedAxios.create = jest.fn(() => mockClient);

    const client = mockedAxios.create();
    const response = await client.get("/posts/1");

    expect(response).toEqual(mockedResponse);
    expect(client.get).toHaveBeenCalledWith("/posts/1");
  });
});
