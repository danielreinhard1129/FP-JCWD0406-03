import CardSidebar from "@/components/dashboardAdmin/Sidebar";

const layout = ({ children }: any) => {
  return (
    <div className="bg-quaternary text-white min-h-screen m-0 p-0 box-border">
      <div className="flex">
        <div className=" bg-[#182237]  p-4 w-[200px]">
          <CardSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
