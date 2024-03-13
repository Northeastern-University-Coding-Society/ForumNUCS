import "./globals.css";
import App from "@/components/App";
import Copyright from "@/components/widgets/Copyright";
import * as React from "react";

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
