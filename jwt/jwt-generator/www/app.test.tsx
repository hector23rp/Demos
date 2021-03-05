import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./app";

describe("Principal Aplication", () => {

  it("should print 'Hello JWT' when is loaded", () => {
    render(<App />);

    const element = screen.getByText("Hello JWT");

    expect(element.textContent).toEqual("Hello JWT");
  })
});