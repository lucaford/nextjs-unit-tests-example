import { render, screen, waitFor } from "@testing-library/react";
import TableWithApiCall from "./TableWithApiCall";

describe("<TableWithApiCall />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ name: "Pepe 1" }, { name: "Pepe 2" }],
          }),
      })
    ) as jest.Mock;
  });

  test("carga y muestra los datos", async () => {
    render(<TableWithApiCall />);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText("Pepe 1")).toBeInTheDocument();
      expect(screen.getByText("Pepe 2")).toBeInTheDocument();
    });
    const tableRows = screen.getAllByRole("row"); //explicar que es el getAllByRole
    expect(tableRows).toHaveLength(
      [{ name: "Pepe 1" }, { name: "Pepe 2" }].length
    );
  });
});
