import { Switch, Card } from "antd";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <DashboardLayout>
      <Card title="Notification Preferences">
        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <Switch
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default NotificationSettings;
