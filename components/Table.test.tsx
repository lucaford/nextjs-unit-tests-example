import { RenderResult, render, screen } from "@testing-library/react";
import Table from "./Table";

describe("<Table />", () => {
  let component: RenderResult;
  const mockData = [
    { title: "Pepe 1" },
    { title: "Pepe 2" },
    { title: "Pepe 3" },
  ];

  beforeEach(() => {
    component = render(<Table data={mockData} />);
  });

  test("renders table with data", () => {
    const tableRows = screen.getAllByRole("row"); //explicar que es el getAllByRole
    expect(tableRows).toHaveLength(mockData.length);
  });

  test("every item should show the right title", () => {
    mockData.forEach((item) =>
      expect(component.getByText(item.title)).toBeInTheDocument()
    );
  });
});
