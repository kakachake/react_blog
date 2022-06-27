import ListItem from "components/ListItem";
import type { NextPage } from "next";
import { Divider } from "antd";
import axRequest from "request";
import { IArticle } from "./api";

interface IProps {
  articles: IArticle[];
}

const Home: NextPage = ({ articles }: IProps) => {
  console.log(articles);

  return (
    <div className={`content-layout`}>
      {articles.map((article) => {
        return (
          <>
            <ListItem key={article.id} article={article} />
            <Divider style={{ margin: 0 }} />
          </>
        );
      })}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const { data: articles } = await axRequest.get({
    baseURL: "http://localhost:3000",
    url: "/api/article/list",
  });

  return {
    props: {
      articles: articles || [],
    },
  };
}
