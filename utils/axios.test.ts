import api from "./axios";
import axios from "axios";

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
    mockedAxios.create = jest.fn(() => ({
      get: jest.fn().mockResolvedValue(mockedResponse),
      defaults: { baseURL: "https://jsonplaceholder.typicode.com", timeout: 10000 },
    })) as any;

    const client = mockedAxios.create();
    const response = await client.get("/posts/1");

    expect(response).toEqual(mockedResponse);
    expect(client.get).toHaveBeenCalledWith("/posts/1");
  });
});
