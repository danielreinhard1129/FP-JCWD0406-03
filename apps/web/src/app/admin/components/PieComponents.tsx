import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Pendapatan", value: 400 },
  { name: "Property ", value: 300 },
  { name: "Room", value: 300 },
  { name: "Transaction", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieComponents = () => {
  return (
    <div>
      {" "}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className=" grid grid-cols-4 p-2">
        {data.map((item, index) => (
          <p
            key={index}
            className=" text-gray-700  cursor-pointer font-bold  items-center justify-center flex "
          >
            {" "}
            {item.name}{" "}
          </p>
        ))}
      </div>
      <div className=" grid grid-cols-4 mt-[6px] p-2 ">
        {COLORS.map((item, index) => (
          <div
            className="h-[30px] w-[30px] items-center justify-center flex ml-8"
            style={{ backgroundColor: item }}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PieComponents;
