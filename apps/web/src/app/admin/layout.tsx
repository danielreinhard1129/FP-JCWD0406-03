import CardSidebar from "@/components/dashboardAdmin/Sidebar";

const layout = ({ children }: any) => {
  return (
    <div className="bg-[#151c2c] text-white min-h-screen m-0 p-0 box-border">
      <div className="flex">
        <div className=" bg-[#182237] p-[20px] w-[350px]">
          <CardSidebar />
        </div>
        <div className="flex-1 p-[20px]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
