import { Switch, Card } from "antd";
import { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { ShowToast } from "../../../components/ShowToast/ShowToast";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

  const onSwitchChange = (checked: boolean) => {
    setEmailNotifications(checked);
    if (checked) {
      ShowToast("info", "Email notification turned on");
    } else {
      ShowToast("info", "Email notification turn off");
    }
  };

  return (
    <DashboardLayout>
      <Card title="Notification Preferences">
        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <Switch checked={emailNotifications} onChange={onSwitchChange} />
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default NotificationSettings;
