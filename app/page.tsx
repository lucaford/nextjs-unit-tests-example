"use client";

import Button from "@/components/Button";
import Table from "@/components/Table";
import TableWithApiCall from "@/components/TableWithApiCall";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">App Router</h1>
      <Button label="Presionar" />
      <h2>Tabla</h2>
      <Table
        data={[{ title: "Pepe 1" }, { title: "Pepe 2" }, { title: "Pepe 3" }]}
      />
      <h2>Tabla API Call</h2>
      <TableWithApiCall />
    </div>
  );
}
