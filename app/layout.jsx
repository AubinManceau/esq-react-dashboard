import "./globals.css";

export default function RootLayout({ children }) {
  const title = "Esq React Dashboard";

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
