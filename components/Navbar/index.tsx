import { NextPage } from "next";
import Link from "next/link";
import { navs } from "./config";
import style from "./index.module.scss";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Login from "components/Login";

const NavBar: NextPage = () => {
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
        <Button onClick={handleToLogin} type="primary">
          登录
        </Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default NavBar;
