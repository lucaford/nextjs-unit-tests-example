type DataType = {
  title: string;
};

type Props = {
  data: DataType[];
};

const Table = ({ data }: Props) => {
  return (
    <table className="w-full border-separate border-spacing-y-1 text-gray-70">
      <tbody>
        {data.map((item, index) => {
          return <tr key={index}>{item.title}</tr>;
        })}
      </tbody>
    </table>
  );
};

export default Table;
