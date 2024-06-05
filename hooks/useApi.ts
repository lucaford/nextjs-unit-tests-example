import { useEffect, useState } from "react";

type Characters = {
  info: {
    count: number;
  };
};

const useApi = () => {
  const [data, setData] = useState<Characters>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  return { data };
};

export default useApi;
