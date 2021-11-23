import { Button, DatePicker, Form, Input, Tooltip, message } from "antd";
import { getFirstLoad, setFirstLoad } from "../helpers/notesManager";
import { useEffect, useState } from "react";

import { DeploymentUnitOutlined } from "@ant-design/icons";
import moment from "moment";

const NotesComponent = (props) => {
  const [form] = Form.useForm();
  const [hasDebounced, setHasDebounced] = useState(false);
  const [showGraphInfo, setShowGraphInfo] = useState(false);

  useEffect(() => {
    if (props.noteData) {
      form.setFieldsValue({
        ...props.noteData,
        date: moment(props.noteData.date, "DD/MM/YYYY"),
      });
      if (!getFirstLoad()) {
        setFirstLoad();
        message.info("Click on text to start editing...");
        setShowGraphInfo(true);
      }
    } else {
      form.resetFields();
      form.setFieldsValue({
        key: props.newKey,
      });
    }
  }, [props.noteData]);

  const saveNote = () => {
    if (!hasDebounced) {
      message.info("Autosaving note...", 1.5);
      setTimeout(() => {
        const values = form.getFieldsValue();
        props.saveNote({
          ...values,
          title: values.title || `Note${props.newKey}`,
          date: values.date ? values.date.format("DD/MM/YYYY") : moment().format("DD/MM/YYYY"),
        });
        setHasDebounced(false);
        message.info("Note has been saved!", 1.5);
      }, 2000);
      setHasDebounced(true);
    }
  };

  const showNetwork = () => {
    setShowGraphInfo(false);
    props.showNetwork();
  };

  return (
    <div>
      {props.noteData && (
        <Tooltip placement="top" title="Click to view Note's network">
          <Button
            type="primary"
            onClick={showNetwork}
            ghost
            style={{ float: "right", position: "absolute", right: "5%", top: "2%" }}
          >
            {showGraphInfo && "Click here to view network"}
            <DeploymentUnitOutlined />
          </Button>
        </Tooltip>
      )}
      <Form form={form} onChange={saveNote}>
        <Form.Item name="key" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="title">
          <Input placeholder="Enter title for Note" bordered={false} style={{ fontSize: "30px" }} />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item name="tags" style={{ display: "inline-block", width: "80%" }} initialValue="">
            <Input placeholder="Enter tags for Note separated by commas" bordered={false} allowClear />
          </Form.Item>
          <Form.Item
            name="date"
            initialValue={moment(new Date(), "DD/MM/YYYY")}
            style={{ display: "inline-block", width: "20%" }}
          >
            <DatePicker bordered={false} format="DD/MM/YYYY" />
          </Form.Item>
        </Form.Item>

        <Form.Item name="content" initialValue="">
          <Input.TextArea
            showCount
            bordered={false}
            placeholder="Enter content for Note"
            autoSize={{ minRows: 10 }}
            size="large"
            style={{ width: "100%" }}
            allowClear
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default NotesComponent;
