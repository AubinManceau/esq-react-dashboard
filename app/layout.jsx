import "./globals.css";

export default function RootLayout({ children }) {
  const title = "Esq React Dashboard";

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
