import type { AppProps } from "next/app";
import Layout from "components/layout";
import "styles/globals.css";
import "styles/reset.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "antd/dist/antd.css";
import { StoreProvider } from "store/index";
import { observer } from "mobx-react-lite";

interface IProps extends AppProps {
  initialValue: any;
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </StoreProvider>
  );
}

export default observer(MyApp);

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { id, nickname, avatar } = ctx.req.cookies;
  console.log(id, nickname, avatar);

  return {
    initialValue: {
      user: {
        userInfo: {
          id,
          nickname,
          avatar,
        },
      },
    },
  };
};
