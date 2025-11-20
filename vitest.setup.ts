import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { server } from "./src/mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// Mock window.URL.createObjectURL
Object.defineProperty(window.URL, "createObjectURL", {
  value: vi.fn(),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
