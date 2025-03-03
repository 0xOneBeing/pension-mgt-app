// // import React, { useState } from "react";
// import { Modal, Form, Input, Upload, Button, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { setTempAvatar, updateUserAvatar } from "../../features/auth/authSlice";

// interface SettingsModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const tempAvatar = useSelector((state: RootState) => state.auth.tempAvatar);
//   const [form] = Form.useForm();

//   const handleUpload = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       if (e.target?.result) {
//         dispatch(setTempAvatar(e.target.result as string)); // Store the image temporarily
//       }
//     };
//     reader.readAsDataURL(file);
//     return false; // Prevent default upload behavior
//   };

//   const handleSave = () => {
//     if (tempAvatar) {
//       dispatch(updateUserAvatar(tempAvatar)); // Update the user's avatar in the store
//       message.success("Avatar updated successfully!");
//     }
//     onClose();
//   };

//   return (
//     <Modal
//       title="Settings"
//       visible={visible}
//       onOk={handleSave}
//       onCancel={onClose}
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item label="Name" name="name" initialValue={user?.name}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Email" name="email" initialValue={user?.email}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Avatar">
//           <Upload
//             beforeUpload={handleUpload}
//             showUploadList={false}
//             accept="image/*"
//           >
//             <Button icon={<UploadOutlined />}>Upload Avatar</Button>
//           </Upload>
//           {tempAvatar && (
//             <img
//               src={tempAvatar}
//               alt="Avatar Preview"
//               style={{ width: 100, marginTop: 10 }}
//             />
//           )}
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default SettingsModal;

// import React, { useState } from "react";
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
        dispatch(setTempAvatar(e.target.result as string)); // Store the image temporarily
      }
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  const handleSave = () => {
    // Dispatch updateUser to save temporary values to the user object
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
          initialValue={tempName || user?.name} // Use tempName if available, otherwise use user.name
        >
          <Input
            onChange={(e) => dispatch(setTempName(e.target.value))} // Update tempName on change
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          initialValue={tempEmail || user?.email} // Use tempEmail if available, otherwise use user.email
        >
          <Input
            onChange={(e) => dispatch(setTempEmail(e.target.value))} // Update tempEmail on change
          />
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
              style={{ width: 100, marginTop: 10 }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SettingsModal;
