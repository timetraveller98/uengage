import "@testing-library/jest-dom";
import "whatwg-fetch";
jest.mock("next/navigation", () => {
  const actualNav = jest.requireActual("next/navigation");
  return {
    ...actualNav,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
  };
});
