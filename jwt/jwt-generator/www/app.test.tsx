import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

import App from "./app";

describe("Principal Aplication", () => {

  it("should print 'JWT Login' as default page", () => {
    render(<App />, { wrapper: MemoryRouter });

    const element = screen.getByText("JWT");

    expect(element.textContent).toEqual("JWT");
  })
});