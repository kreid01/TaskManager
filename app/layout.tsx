"use client";
import { Nav } from "./components/UI/Nav";
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
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Footer } from "./components/UI/Footer";
import { LoadingSVG } from "./components/UI/LoadingSVG";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = new InMemoryCache({});

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(249 115 22)",
        dark: "rgb(194 65 12)",
        contrastText: "#fff",
      },
      secondary: {
        main: "rgb(239 68 68)",
        dark: "rgb(153 27 27)",
      },
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://167.99.86.251:4001/refresh_token", {
      method: "POST",
      credentials: "include",
      headers: {
        "x-forwarded-proto": "https",
      },
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (!loading) {
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
            return fetch("http://167.99.86.251:4001/refresh_token", {
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
          uri: "http://167.99.86.251:4001/graphql",
          credentials: "include",
        }),
      ]),
      cache,
    });

    return (
      <html className="overflow-x-hidden">
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>
            <Provider store={store}>
              <body>
                <main>
                  <Nav />
                  <div className="ml-[25%] lg:ml-[16.7%] min-h-[100vh]">
                    <div className="min-h-[85vh]"> {children} </div>
                    <Footer />
                  </div>
                </main>
              </body>
            </Provider>
          </MuiThemeProvider>
        </ApolloProvider>
      </html>
    );
  } else
    return (
      <html>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <body>
              <main>
                <div className="w-[100vw] ml-[45%]">
                  <LoadingSVG />
                </div>
              </main>
            </body>
          </Provider>
        </MuiThemeProvider>
      </html>
    );
}
