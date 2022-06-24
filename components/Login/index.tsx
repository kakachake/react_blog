import { NextPage } from "next";
import style from "./index.module.scss";
import { Button, Input } from "antd";
import React, { useState } from "react";
interface LoginProps {
  isShow: boolean;
  onClose: () => void;
}

const Login: NextPage<LoginProps> = ({ isShow, onClose }) => {
  const [form, setForm] = useState({
    phone: "",
    verify: "",
  });
  const handleClose = () => {
    onClose();
  };
  const handleGetCode = () => {};
  const handleLogin = () => {};
  const handleOAuthGithub = () => {};
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.value,
    });
  };
  return (
    <div className={style.loginArea} style={{ display: isShow ? "" : "none" }}>
      <div className={style.loginBox}>
        <div className={style.loginTitle}>
          <div>手机号登录</div>
          <div className={style.close} onClick={handleClose}>
            X
          </div>
        </div>
        <div>
          <Input
            name="phone"
            type={"text"}
            placeholder="请输入手机号"
            value={form.phone}
            onChange={handleFormChange}
          />
          <div className={style.verifyCodeArea}>
            <Input
              name="verify"
              type={"text"}
              placeholder="请输入验证码"
              value={form.verify}
              onChange={handleFormChange}
            />
            <Button onClick={handleGetCode}>获取验证码</Button>
          </div>
          <div className={style.loginBtn}>
            <Button type="primary" onClick={handleLogin}>
              登录
            </Button>
          </div>
          <div className={style.otherLogin} onClick={handleOAuthGithub}>
            使用github登录
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
