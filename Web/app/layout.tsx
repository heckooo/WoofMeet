"use client"
import './globals.css'
import { Quicksand } from 'next/font/google';
import { Client, Provider, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from './generated/graphql';
import { betterUpdateQuery } from '../utils/betterUpdateQuery';

const quick = Quicksand({ subsets: ['latin'] });

// const client = new Client({
//   url: 'http://localhost:4000/graphql',
//   exchanges: [cacheExchange({
//     updates: {
//       Mutation: {
//         login: (_result, args, cache, info) => {
//           betterUpdateQuery<LoginMutation, MeQuery>(
//             cache, 
//             { query: MeDocument },
//             _result,
//             (result, query) => {
//               if (result.login.errors) {
//                 return query;
//               } else {
//                 return {
//                   me: result.login.user,
//                 };
//               }
//             }
//           );
//         },
//         register: (_result, args, cache, info) => {
//           betterUpdateQuery<RegisterMutation, MeQuery>(
//             cache, 
//             { query: MeDocument },
//             _result,
//             (result, query) => {
//               if (result.register.errors) {
//                 return query;
//               } else {
//                 return {
//                   me: result.register.user,
//                 };
//               }
//             }
//           );
//         },
//         logout: (_result, args, cache, info) => {
//           betterUpdateQuery<LogoutMutation, MeQuery>(
//             cache, 
//             { query: MeDocument },
//             _result,
//             () => ({ me: null })
//           );
//         },
//       }
//     }
//   }), fetchExchange],
//   fetchOptions: {
//     credentials: "include",
//   },
// });

export default function RootLayout({ children, title = "Woof Meets" }: { children: React.ReactNode, title: string }) {
  return (
    //<Provider value={client}>
      <html lang="en">
        <head>
          <title>{title}</title>
        </head>
        <body className={quick.className}>
          {children}
        </body>
      </html>
    //</Provider>
  )
}
