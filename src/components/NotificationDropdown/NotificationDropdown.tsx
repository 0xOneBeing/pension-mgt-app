import { Badge, Dropdown, List, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { markAsRead } from "../../features/notifications/notificationsSlice";
import { RootState } from "../../store";

const NotificationDropdown = () => {
  const dispatch = useDispatch();

  interface Notification {
    id: number;
    message: string;
    read: boolean;
  }

  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    dispatch(markAsRead(id));
  };

  const menu = (
    <List
      dataSource={notifications}
      renderItem={(item: Notification) => (
        <List.Item className={!item.read ? "font-bold" : ""}>
          {item.message}
          {!item.read && (
            <Button
              size="small"
              type="link"
              onClick={() => handleMarkAsRead(item.id)}
            >
              Mark as Read
            </Button>
          )}
        </List.Item>
      )}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Badge count={unreadCount} className="cursor-pointer">
        <BellOutlined style={{ fontSize: "20px" }} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;
