import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";
import { NotificationContextProvider } from "../store/notificationContext";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events Finder</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="NextJS Events Finder" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
