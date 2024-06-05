import { render, screen, cleanup } from "@testing-library/react";
import ExampleWithHook from "./ExampleWithHook";
import useApi from "../hooks/useApi";

jest.mock("../hooks/useApi");

describe("App", () => {
  beforeEach(() => {
    cleanup();

    useApi.mockReturnValue({ data: { info: { count: 300 } } });
  });

  it("should render loading text", () => {
    render(<ExampleWithHook />);
  });
});
