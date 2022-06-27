import { NextPage } from "next";
import Link from "next/link";
import { navs } from "./config";
import style from "./index.module.scss";
import { Avatar, Button, Dropdown, Menu, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Login from "components/Login";
import { useStore } from "store/index";
import { LoginOutlined, HomeOutlined } from "@ant-design/icons";
import axRequest from "request";
import { observer } from "mobx-react-lite";

const NavBar: NextPage = () => {
  const store = useStore();
  const handleLogout = () => {
    axRequest
      .post({
        url: "/api/user/logout",
      })
      .then((res) => {
        console.log(res);

        if (res.code === 0) {
          store.user.setUserInfo({});
          message.success("退出成功");
        }
      });
  };
  const { id: userId, avatar, nickname } = store.user.userInfo;

  const { pathname, push } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleToEdit = () => {
    if (userId) {
      push("/editor/new");
    }
  };
  const handleToLogin = () => {
    setIsShowLogin(true);
  };
  const handleClose = () => {
    setIsShowLogin(false);
  };
  const handleGoHome = () => {
    push(`/user/${userId}`);
  };
  const Menus = () => {
    return (
      <Menu
        items={[
          {
            key: "1",
            label: (
              <div key={1} onClick={handleGoHome}>
                <HomeOutlined /> 个人主页
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div key={2} onClick={handleLogout}>
                <LoginOutlined /> 退出
              </div>
            ),
          },
        ]}
      ></Menu>
    );
  };
  return (
    <div className={`${style.container}`}>
      <div className={`content-layout ${style.container}`}>
        <section className={style.logoArea}>BLOG</section>
        <section className={style.linkArea}>
          {navs?.map((item) => {
            return (
              <Link key={item.label} href={item.value}>
                <a className={pathname === item.value ? style.active : ""}>
                  {item.label}
                </a>
              </Link>
            );
          })}
        </section>
        <section className={style.operationArea}>
          <Button onClick={handleToEdit}>写文章</Button>
          {userId ? (
            <Dropdown overlay={Menus} className={style.userInfoArea}>
              <div>
                <Avatar src={avatar} />
                <span>{nickname}</span>
              </div>
            </Dropdown>
          ) : (
            <Button onClick={handleToLogin} type="primary">
              登录
            </Button>
          )}
        </section>
      </div>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default observer(NavBar);
