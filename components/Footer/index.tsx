import { NextPage } from "next";
import style from "./index.module.scss";

const Footer: NextPage = () => {
  return (
    <div className={style.footerWrap}>
      <h1>Next.js + React Blog</h1>
    </div>
  );
};

export default Footer;
