"use client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/react-hooks";
import Link from "next/link";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <nav>
            <Link href="register">Register</Link>
            <Link href="login">Link</Link>
            <Link href="/">Home</Link>
          </nav>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </main>
      </body>
    </html>
  );
}
