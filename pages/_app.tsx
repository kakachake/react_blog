import type { AppProps } from "next/app";
import Layout from "components/layout";
import "styles/globals.css";
import "styles/reset.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "antd/dist/antd.css";
import { StoreProvider } from "store/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider initialValue={{}}>
      <ConfigProvider locale={zhCN}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </StoreProvider>
  );
}

export default MyApp;
