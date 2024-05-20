import { RenderResult, fireEvent, render } from "@testing-library/react";
import Button from "./Button";

describe("<Button />", () => {
  let component: RenderResult;
  const mockFn = jest.fn();

  beforeEach(() => {
    component = render(<Button label="Presionar" onClick={mockFn} />);
  });

  test("renders the label with a text", () => {
    component.getByText("Presionar");
  });

  test("render loading if true", () => {
    const componentWithLoading = render(
      <Button label="Presionar" loading={true} />
    );
    componentWithLoading.getByText("cargando...");
    expect(componentWithLoading.getByText("cargando...")).toBeDisabled();

    //me gustaria que no me muestre el componente
    // expect(componentWithLoading.getByText("Presionar")).not.toBeInTheDocument();
  });

  test("test onClick func", () => {
    fireEvent.click(component.getByText("Presionar"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
