import { Popconfirm, Table } from "antd";

import { DeleteFilled } from "@ant-design/icons";
import moment from "moment";

const TableComponent = (props) => {
  const columnDetails = [
    {
      title: "Title",
      dataIndex: "title",
      width: "80%",
      sorter: (a, b) => {
        const titleOne = a.title.toUpperCase(),
          titleTwo = b.title.toUpperCase();
        if (titleOne < titleTwo) {
          return -1;
        }
        if (titleOne > titleTwo) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "30%",
      sorter: (a, b) => {
        const dateA = moment(a.date, "DD/MM/YYYY"),
          dateB = moment(b.date, "DD/MM/YYYY");
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Delete",
      key: "action",
      align: "center",
      render: (record) => (
        <Popconfirm
          placement="right"
          title={`Are you sure you want to delete this note?`}
          onConfirm={() => props.deleteNote(record)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteFilled style={{ color: "#f91529" }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      onRow={(record) => {
        return {
          onClick: () => {
            props.noteClicked(record);
          },
        };
      }}
      columns={columnDetails}
      dataSource={[...props.notes]}
      className="leftHandItems"
    />
  );
};

export default TableComponent;
