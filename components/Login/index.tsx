import { NextPage } from "next";
import style from "./index.module.scss";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import CountDown from "components/CountDown";

import axRequest from "request";

interface LoginProps {
  isShow: boolean;
  onClose: () => void;
}

const Login: NextPage<LoginProps> = ({ isShow, onClose }) => {
  const [form, setForm] = useState({
    phone: "",
    verify: "",
  });
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const handleClose = () => {
    onClose();
  };
  const handleGetCode = () => {
    if (!form.phone) {
      message.warn("请输入手机号！");
      return;
    } else {
      axRequest
        .post({
          url: "/api/user/sendVerifyCode",
          data: {
            to: form.phone,
            templateId: 1,
          },
        })
        .then((res) => {
          if (res.code === 0) {
            setIsShowVerifyCode(true);
          } else {
            throw Error(res.msg || "未知错误");
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  };
  const handleLogin = () => {
    axRequest
      .post({
        url: "/api/user/login",
        data: {
          ...form,
        },
      })
      .then((res) => {
        if (res.code === 0) {
          //登录成功
          onClose();
          message.success("登陆成功");
        } else {
          message.error(res.msg || "未知错误");
        }
      });
  };
  const handleOAuthGithub = () => {
    console.log(11);
  };
  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };
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
            <Button onClick={handleGetCode}>
              {isShowVerifyCode ? (
                <CountDown time={10} onEnd={handleCountDownEnd} />
              ) : (
                "获取验证码"
              )}
            </Button>
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
