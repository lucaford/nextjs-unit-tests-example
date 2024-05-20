// app/login/__tests__/page.test.tsx

import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        message: "Login successful",
        user: { id: 1, username: "admin", token: "fake-jwt-token" },
      }),
  })
) as jest.Mock;

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // dame un ejemplo de unit test

  test("renders all the page components", () => {
    const loginPage = render(<LoginPage />);
    expect(loginPage.getByText("Username:")).toBeInTheDocument();
    expect(loginPage.getByText("Password:")).toBeInTheDocument();
    expect(loginPage.getByLabelText("Username:")).toBeInTheDocument();
    expect(loginPage.getByLabelText("Password:")).toBeInTheDocument();
    expect(loginPage.getByText("Login")).toBeInTheDocument();
    expect(loginPage.getByRole("button")).toBeInTheDocument();
  });

  test("updates the username and password fields", () => {
    const loginPage = render(<LoginPage />);

    const usernameInput = loginPage.getByLabelText(
      /username/i
    ) as HTMLInputElement;
    const passwordInput = loginPage.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });

    expect(usernameInput.value).toBe("admin");
    expect(passwordInput.value).toBe("admin");
  });

  test("submits the form and handles successful login", async () => {
    const loginPage = render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "admin" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "admin" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });
});
