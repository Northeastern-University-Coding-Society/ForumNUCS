// `pages/_app.js`
import '../styles/main.css';
import {trpc} from "@/utils/trpc";

function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
