import useApi from "../hooks/useApi";

export type Characters = {
  info: {
    count: number;
  };
};

const ExampleWithHook = () => {
  const { data } = useApi();

  return <div>{data && <p>{data.info.count}</p>}</div>;
};

export default ExampleWithHook;
