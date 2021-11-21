import React, { useState, useEffect } from "react";
import { Table, InputNumber, Space, Popconfirm, Form, Typography } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { dispatchPolicyData } from "../../actions/policy/policy-action-creator";
import { SET_POLICY_DATA } from "../../actions/policy/types";
import { updatePolicyData } from "../../actions/policy/policy-api";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <InputNumber min={1} max={1000000} />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function DetailBoardCiTable() {
  const dispatch = useDispatch();

  const { policyData, pagination, loading } = useSelector(
    (state) => state.policyReducer
  );

  useEffect(() => {
    dispatch(dispatchPolicyData({}));
  }, []);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      premium: 0,
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const returnCheckOrCloseIcon = (val) => {
    return val ? (
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    ) : (
      <CloseCircleTwoTone twoToneColor="#eb2f96" />
    );
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const updatedData = policyData.map((item) =>
        id === item.id
          ? {
              ...item,
              ...row,
            }
          : item
      );
      dispatch({ type: SET_POLICY_DATA, payload: updatedData });
      updatePolicyData(id, row);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Policy ID",
      dataIndex: "policy_id",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Date of purchase",
      dataIndex: "date_of_purchase",
      width: 150,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Premium",
      dataIndex: "premium",
      width: 100,
      editable: true,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Bodily injury liability",
      dataIndex: "bodily_injury_liability",
      width: 100,
      ellipsis: true,
      align: "center",
      render: (val) => <>{returnCheckOrCloseIcon(val)}</>,
    },
    {
      title: "Personal injury protection",
      dataIndex: "personal_injury_protection",
      width: 100,
      ellipsis: true,
      align: "center",
      render: (val) => <>{returnCheckOrCloseIcon(val)}</>,
    },
    {
      title: "Property damage liability",
      dataIndex: "property_damage_liability",
      width: 100,
      ellipsis: true,
      align: "center",
      render: (val) => <>{returnCheckOrCloseIcon(val)}</>,
    },
    {
      title: "Collision",
      dataIndex: "collision",
      width: 80,
      ellipsis: true,
      align: "center",
      render: (val) => <>{returnCheckOrCloseIcon(val)}</>,
    },
    {
      title: "Comprehensive",
      dataIndex: "comprehensive",
      width: 80,
      ellipsis: true,
      align: "center",
      render: (val) => <>{returnCheckOrCloseIcon(val)}</>,
    },
    {
      title: "Customer gender",
      dataIndex: "customer_gender",
      width: 90,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Customer income group",
      dataIndex: "customer_income_group",
      width: 90,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Customer marital status",
      dataIndex: "customer_marital_status",
      width: 100,
      ellipsis: true,
      align: "center",
      render: (val) => <>{returnCheckOrCloseIcon(val)}</>,
    },
    {
      title: "Fuel",
      dataIndex: "fuel",
      width: 80,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Vehicle segment",
      dataIndex: "vehicle_segment",
      width: 90,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Customer region",
      dataIndex: "customer_region",
      width: 80,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Action",
      fixed: "right",
      width: 80,
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </Space>
        ) : (
          <Space size="middle">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          </Space>
        );
      },
    },
    ,
  ];

  //merging with extra props for the all the columns if the editable is true
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleTableChange = (paginate, _, __) => {
    dispatch(dispatchPolicyData({ pageNum: paginate.current }));
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        loading={loading}
        dataSource={policyData}
        rowKey={(record) => record.id}
        columns={mergedColumns}
        onChange={handleTableChange}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: false,
          pageSize: pagination.dataPerPage,
          total: pagination.totalPolicyCount,
          current: pagination.currentPage,
          hideOnSinglePage: true,
        }}
        scroll={{ y: 500, x: 3400 }}
      />
    </Form>
  );
}

export default React.memo(DetailBoardCiTable);
