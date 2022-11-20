"use client";
import { Nav } from "./components/Nav";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  Observable,
  HttpLink,
} from "@apollo/client";
import { getAccessToken, setAccessToken } from "./utils/accessToken";
import { onError } from "@apollo/client/link/error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./globals.css";
import { Footer } from "./components/Footer";

const cache = new InMemoryCache({});

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(249 115 22)",
      dark: "rgb(194 65 12)",
      contrastText: "#fff",
    },
    secondary: {
      main: "rgb(253 186 116);",
    },
  },
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token) as JwtPayload;
          if (Date.now() >= (exp as number) * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch("http://localhost:3001/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:3001/graphql",
      credentials: "include",
    }),
  ]),
  cache,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <body>
            <main>
              <Nav />
              <div className="ml-60">
                {children} <Footer />
              </div>
            </main>
          </body>
        </MuiThemeProvider>
      </ApolloProvider>
    </html>
  );
}
