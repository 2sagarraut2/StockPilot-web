import {
  Avatar,
  Divider,
  Input,
  Modal,
  Select,
  Tag,
  Spin,
  Timeline,
} from "antd";
import { SearchOutlined, ClockCircleOutlined } from "@ant-design/icons";
import ChangeCard from "./common/ChangeCard";
import UserCard from "./common/UserCard";
import ActionCard from "./common/ActionCard";
import { useEffect, useState } from "react";

const ShowHistoryModal = ({
  title,
  isModalVisible,
  setOpenHistoryModal,
  searchText,
  setSearchText,
  handlSearchClear,
  value,
  originalData,
  historyData,
  loading,
  onUserChange,
  onActionChange,
  selectedUser,
  selectedAction,
}) => {
  console.log(historyData);

  const actionOptions =
    originalData && originalData.length
      ? [...new Set(originalData.map((item) => item.action))].map((action) => ({
          label: action,
          value: action,
        }))
      : [];

  const userOptions =
    originalData && originalData.length
      ? [
          ...new Set(
            originalData
              .filter((item) => item.modifiedBy)
              .map((item) =>
                `${item.modifiedBy.firstName} ${item.modifiedBy.lastName}`.trim()
              )
          ),
        ].map((fullName) => ({
          label: fullName,
          value: fullName,
        }))
      : [];

  return (
    <Modal
      title={<span style={{ fontSize: "20px", fontWeight: 600 }}>{title}</span>}
      open={isModalVisible}
      onCancel={() => {
        setOpenHistoryModal(false);
      }}
      footer={null}
      width={600}
      styles={{
        body: {
          paddingRight: "10px",
          maxHeight: "70vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <div className="sticky top-0 bg-white z-10 pb-3">
              <div className="mb-3">
                <Input
                  variant="filled"
                  placeholder="Search products by name or SKU..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  style={{ fontSize: "16px" }}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                  onClear={handlSearchClear}
                  disabled={historyData && !historyData.length}
                />
              </div>

              <div className="mb-3 flex gap-2">
                <Select
                  value={selectedAction}
                  onChange={(value) => onActionChange?.(value)}
                  style={{ width: 200 }}
                  variant="filled"
                  options={actionOptions}
                  notFoundContent={
                    loading ? <Spin size="small" /> : "No actions"
                  }
                  placeholder="Select action"
                  disabled={historyData && !historyData.length}
                />
                <Select
                  value={selectedUser}
                  onChange={(value) => onUserChange?.(value)}
                  style={{ width: 200 }}
                  variant="filled"
                  options={userOptions}
                  notFoundContent={loading ? <Spin size="small" /> : "No users"}
                  placeholder="Select user"
                  disabled={historyData && !historyData.length}
                />
              </div>

              <Divider className="my-2" />
            </div>

            {/* 🧾 Scrollable History Section */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "8px",
                paddingLeft: "8px",
                paddingTop: "10px",
              }}
            >
              <Timeline
                className="pl-10"
                items={
                  Array.isArray(historyData) && historyData.length > 0
                    ? historyData.map((item) => ({
                        dot: (
                          <ClockCircleOutlined
                            style={{ fontSize: "24px", color: "#1890ff" }}
                          />
                        ),
                        children: (
                          <div className="p-4 mb-3 rounded-md bg-gray-50 hover:bg-gray-100 transition">
                            <section className="flex justify-between my-2">
                              {item.modifiedBy && (
                                <UserCard
                                  user={item.modifiedBy}
                                  role={item.modifiedBy.role.label}
                                  createdAt={item.createdAt}
                                />
                              )}
                              {item.action && <ActionCard data={item.action} />}
                            </section>

                            {item.action === "UPDATE" && (
                              <section className="my-2">
                                <h2 className="mb-2 font-semibold">Changes:</h2>
                                {item.changes?.map((change, index) => {
                                  return (
                                    <ChangeCard
                                      key={change._id || index}
                                      entity={change}
                                    />
                                  );
                                })}
                              </section>
                            )}
                          </div>
                        ),
                      }))
                    : [
                        {
                          children: "No history available",
                        },
                      ]
                }
              />
            </div>
          </>
        )}
      </>
    </Modal>
  );
};

export default ShowHistoryModal;
