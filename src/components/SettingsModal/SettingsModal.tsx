import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setTempAvatar,
  setTempName,
  setTempEmail,
  updateUser,
} from "../../features/auth/authSlice";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const tempAvatar = useSelector((state: RootState) => state.auth.tempAvatar);
  const tempName = useSelector((state: RootState) => state.auth.tempName);
  const tempEmail = useSelector((state: RootState) => state.auth.tempEmail);
  const [form] = Form.useForm();

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        dispatch(setTempAvatar(e.target.result as string));
      }
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleSave = () => {
    dispatch(updateUser());
    message.success("Settings updated successfully!");
    onClose();
  };

  return (
    <Modal
      title="Settings"
      visible={visible}
      onOk={handleSave}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          initialValue={tempName || user?.name}
        >
          <Input onChange={(e) => dispatch(setTempName(e.target.value))} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          initialValue={tempEmail || user?.email}
        >
          <Input onChange={(e) => dispatch(setTempEmail(e.target.value))} />
        </Form.Item>
        <Form.Item label="Avatar">
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
          {tempAvatar && (
            <img
              src={tempAvatar}
              alt="Avatar Preview"
              className="w-full mt-[10]"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SettingsModal;
