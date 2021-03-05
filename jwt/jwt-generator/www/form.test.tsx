import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import Form from "./form";

describe("Formulario tests", () => {

  beforeEach(() => {
    render(<Form />)
  })

  it("should print 'Username' label", () => {
    const element = screen.getByText("Username");

    expect(element.textContent).toEqual("Username");
  })

  it("should print 'Password' label", () => {
    const element = screen.getByText("Password");

    expect(element.textContent).toEqual("Password");
  })

  it("should print 'pepe' when it write it as username", () => {
    const input = screen.getByLabelText("Username") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'pepe' }});

    expect(input.value).toEqual('pepe')
  })

  it("should print '1234' when it write it as password", () => {
    const input = screen.getByLabelText("Password") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '1234' }});

    expect(input.value).toEqual('1234')
  })
});