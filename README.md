Este repositorio contiene ejemplos y buenas prácticas para implementar tests unitarios en proyectos de React utilizando Jest y Testing Library.

## Instalación y Configuración

Para comenzar a usar este repositorio, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/lucaford/nextjs-unit-tests-example
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd nextjs-unit-tests-example
   ```

3. Instala las dependencias:

   ```bash
   yarn
   ```

4. Corre los tests:

   ```bash
   yarn test
   yarn test --coverage
   ```

## Buenas Prácticas de Testing

### Organización de Tests

1. **describe**

   - Agrupa tests relacionados a un componente específico. Utiliza `describe` para organizar tus tests y mantener el código limpio y estructurado.

   ```javascript
   describe("<ComponentName />", () => {
     // tests
   });
   ```

### Mocking

1. **jest.fn**

   - Crea funciones mock para verificar si han sido llamadas y cuántas veces. `jest.fn()` es útil para simular y espiar funciones.

   ```javascript
   const mockFn = jest.fn();
   ```

### Mocking Hooks

1. **jest.mock**

   - Utiliza `jest.mock` para mockear hooks u otras dependencias.

   ```javascript
   jest.mock("../hooks/useApi");
   ```

2. **Mockear Return Values de Hooks**

   - Mockea el valor de retorno de los hooks para controlar el estado dentro de tus pruebas.

   ```javascript
   useApi.mockReturnValue({ data: { info: { count: 300 } } });
   ```

3. **Mockear Fetch**

   - Mockea la función `fetch` para simular llamadas a APIs y controlar el estado de las respuestas en tus pruebas.

   ```javascript
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
   ```

### Renderización y Limpieza

1. **Render**

   - Utiliza `render` de Testing Library para renderizar el componente dentro de cada test. Esto asegura que cada test tenga su propia instancia del componente y evita interferencias entre tests.

   ```javascript
   import { RenderResult, render } from "@testing-library/react";
   import ComponentName from "./ComponentName";

   let component: RenderResult;

   beforeEach(() => {
     component = render(<ComponentName prop1="value1" onClick={mockFn} />);
   });
   ```

2. **cleanup**

   - Utiliza `cleanup` de Testing Library para desmontar y limpiar el DOM entre pruebas, asegurando que no haya interferencias entre pruebas consecutivas.

   ```javascript
   import { cleanup } from "@testing-library/react";

   beforeEach(() => {
     cleanup();
   });
   ```

### Interacciones y Verificaciones

1. **fireEvent**

   - Simula eventos del usuario, como clicks, y verifica que las funciones mock han sido llamadas correctamente. `fireEvent` ayuda a replicar las interacciones del usuario en el componente.

   ```javascript
   import { fireEvent } from "@testing-library/react";

   fireEvent.click(component.getByText("ButtonText"));
   expect(mockFn).toHaveBeenCalledTimes(1);
   ```

2. **Verificación Condicional**

   - Verifica el comportamiento condicional del componente. Esto puede incluir la renderización de estados específicos del componente y la verificación de elementos en diferentes estados (por ejemplo, un botón deshabilitado cuando está en estado de "cargando").

   ```javascript
   test("render loading if true", () => {
     const componentWithLoading = render(
       <ComponentName prop1="value1" loading={true} />
     );
     componentWithLoading.getByText("Loading...");
     expect(componentWithLoading.getByText("Loading...")).toBeDisabled();
   });
   ```

### Métodos de Testing Library

1. **screen.getAllByRole**

   - Utiliza `screen.getAllByRole` para obtener todos los elementos que tienen el rol especificado. En este caso, se utiliza para obtener todas las filas (`row`) de una tabla.

   ```javascript
   const tableRows = screen.getAllByRole("row");
   expect(tableRows).toHaveLength(mockData.length);
   ```

2. **screen.getByText**

   - Utiliza `screen.getByText` para obtener un elemento que contenga el texto especificado. Esto es útil para verificar que ciertos textos están presentes en el documento.

   ```javascript
   mockData.forEach((item) =>
     expect(screen.getByText(item.title)).toBeInTheDocument()
   );
   ```

3. **waitFor**

   - Utiliza `waitFor` para esperar que ocurran cambios en el DOM antes de realizar una verificación. Esto es útil para componentes que realizan operaciones asíncronas como llamadas a API.

   ```javascript
   import { waitFor } from "@testing-library/react";

   await waitFor(() => {
     expect(screen.getByText("Pepe 1")).toBeInTheDocument();
     expect(screen.getByText("Pepe 2")).toBeInTheDocument();
   });
   ```
