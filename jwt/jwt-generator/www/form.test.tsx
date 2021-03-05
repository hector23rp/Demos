import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Form from "./form";

describe("Formulario tests", () => {
  const server = setupServer(
    rest.post("/login", (req, res, ctx) => {
      return res(ctx.json({ token: "new_token" }));
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());
  
  afterAll(() => server.close());

  beforeEach(() => {
    render(<Form />);
  });

  it("should print 'Username' label", () => {
    const element = screen.getByText("Username");

    expect(element.textContent).toEqual("Username");
  });

  it("should print 'Password' label", () => {
    const element = screen.getByText("Password");

    expect(element.textContent).toEqual("Password");
  });

  it("should print 'pepe' when it write it as username", () => {
    const input = screen.getByLabelText("Username") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "pepe" } });

    expect(input.value).toEqual("pepe");
  });

  it("should print '1234' when it write it as password", () => {
    const input = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "1234" } });

    expect(input.value).toEqual("1234");
  });

  it("should print token when it login succesfully", async () => {
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("new_token")).toBeDefined()
    })
  });

  it("should print 'Request failed with status code 401' when its wrong username or password", async () => {
    server.use(
      rest.post('/login', (req, res, ctx) => {
        return res(ctx.status(401))
      })
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Request failed with status code 401")).toBeDefined()
    })

  })
});
