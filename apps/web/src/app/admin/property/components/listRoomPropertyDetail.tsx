import useGetRoomByPropertyId from "@/hooks/useGetRoomByIdProperty";
import { Table } from "flowbite-react";

interface Props {
  propertyId: number;
}

const RoomListPropertyDetail = ({ propertyId }: Props) => {
  const { rooms } = useGetRoomByPropertyId(propertyId);

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Spacious Room</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {rooms.map((room, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {room.type}
              </Table.Cell>
              <Table.Cell>{room.price}</Table.Cell>
              <Table.Cell>{room.status}</Table.Cell>
              <Table.Cell>{room.spaciousRoom}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RoomListPropertyDetail;
