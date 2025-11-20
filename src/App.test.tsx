import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  it("renders heading and logos", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /vite \+ react/i });
    expect(heading).toBeInTheDocument();

    const viteImg = screen.getByAltText("Vite logo");
    expect(viteImg).toBeInTheDocument();

    const reactImg = screen.getByAltText("React logo");
    expect(reactImg).toBeInTheDocument();
  });

  it("initial count is 0 and increments on click", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /count is 0/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(button).toHaveTextContent(/count is 1/i);
  });
});
