import type { AppProps } from "next/app";
import '@/styles/globals.css';
import { NextPageWithLayout } from "@/types";
import PrivateRoute from "@/utils/private-route";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import DefaultSeo from "@/components/ui/default-seo";

const Noop: React.FC<{children?: React.ReactNode}> = ({ children }) => (
  <>{children}</>
);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;
  // const getLayout = Component.getLayout ?? ((page)=>page);
  const [queryClient] = useState(()=> new QueryClient());
  
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <DefaultSeo/>
          { authProps ? (
            <PrivateRoute authProps={authProps}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PrivateRoute>
          ) : (
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          )}
      </QueryClientProvider>
    </div> 
  )
}
