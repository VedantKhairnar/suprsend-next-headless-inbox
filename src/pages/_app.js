// import "@/styles/globals.css";
import { SuprSendProvider } from "@suprsend/react-inbox";

export default function App({ Component, pageProps }) {
  return (
    <SuprSendProvider
        workspaceKey=''
        subscriberId=''
        distinctId=''
    >
      <Component {...pageProps} />
    </SuprSendProvider>
  );
}
