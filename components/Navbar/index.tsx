import { NextPage } from "next";
import Link from "next/link";
import { navs } from "./config";
import style from "./index.module.scss";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Login from "components/Login";
import { useStore } from "store/index";
const menu = (
  <Menu>
    <Menu.Item>个人主页</Menu.Item>
    <Menu.Item>退出</Menu.Item>
  </Menu>
);

const NavBar: NextPage = () => {
  const store = useStore();
  const { userId, avatar, nickname } = store.user.userInfo;
  const { pathname } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);
  console.log(pathname);

  const handleToEdit = () => {};
  const handleToLogin = () => {
    setIsShowLogin(true);
  };
  const handleClose = () => {
    setIsShowLogin(false);
  };

  return (
    <div className={style.container}>
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
          <Dropdown overlay={menu} className={style.userInfoArea}>
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
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default NavBar;
