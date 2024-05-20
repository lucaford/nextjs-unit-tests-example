"use client";
import React, { useEffect, useState } from "react";

type Character = {
  name: string;
};

type DataType = {
  results: Character[];
};

const TableWithApiCall = () => {
  const [data, setData] = useState<DataType>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <table className="w-full border-separate border-spacing-y-1 text-gray-700">
      <tbody>
        {data &&
          data.results.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableWithApiCall;
