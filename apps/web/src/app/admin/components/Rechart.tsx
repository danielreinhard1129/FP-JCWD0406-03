import { FaEllipsisV } from "react-icons/fa";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PieComponents from "./PieComponents";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Rechart = () => {
  return (
    <div className=" flex mt-[22px] w-full gap-[30px] pb-16 ">
      <div className="  border bg-white shadow-md cursor-pointer rounded-[4px]">
        <div className=" bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
          <h2 className=" text-black font-semibold">Earning Overfiew</h2>
          <FaEllipsisV color="gray" className=" cursor-pointer" />
        </div>
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div
        className=" basis-[40%] bg-white shadow-md cursor-pointer
       rounded-[4px] w-[40%]"
      >
        <div className=" bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed]">
          <h2 className=" text-black font-semibold">Revenue Resorce</h2>
          <FaEllipsisV color="gray" className="cursor-pointer" />
        </div>
        <div className="">
          <PieComponents />
        </div>
      </div>
    </div>
  );
};

export default Rechart;
