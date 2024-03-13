import "./globals.css";
import App from "@/components/App";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <App>
              {children}
          </App>
      </body>
    </html>
  );
}
