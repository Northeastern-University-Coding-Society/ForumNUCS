// `pages/_app.js`
import '../styles/main.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}