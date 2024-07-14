import "./globals.css";
import App from "@/components/App";
import * as React from "react";
import '../styles/font.css';
import '../styles/main.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <App>
              {children}
              {/*<Copyright sx={{mt: 5}}/>*/}
          </App>
      </body>
    </html>
  );
}