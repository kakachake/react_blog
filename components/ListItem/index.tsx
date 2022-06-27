import { EyeOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

import { NextPage } from "next";
import Link from "next/link";
import { IArticle } from "pages/api";
import { fromNow } from "util/index";
import { markdownToTxt } from "markdown-to-txt";

import style from "./index.module.scss";

interface IProps {
  article: IArticle;
}

const ListItem: NextPage<IProps> = ({ article }) => {
  return (
    <Link href={`/article/${article.id}`}>
      <div className={style.container}>
        <div className={style.article}>
          <div className={style.header}>
            <div className={style.userInfo}>
              <Avatar className={style.avatar} src={article?.user?.avatar} />
              <div className={style.userName}>{article?.user?.nickname}</div>
            </div>
            <div>
              <div className={style.date}>{fromNow(article?.update_time)}</div>
            </div>
          </div>
          <div className={style.title}>{article?.title}</div>
          <div className={style.content}>{markdownToTxt(article.content)}</div>
          <div className={style.footer}>
            <div className={style.views}>
              <EyeOutlined />
              <span>{article?.views}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
