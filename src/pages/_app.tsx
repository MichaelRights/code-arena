import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Code Arena</title>
        <meta
          name="description"
          content="Code Arena is a coding tournament platform. It is developed for organizing large and small tournaments"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
