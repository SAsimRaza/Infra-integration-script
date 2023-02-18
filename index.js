const { Api, JsonRpc, RpcError } = require("alaiojs");
const { JsSignatureProvider } = require("alaiojs/dist/alaiojs-jssig");
const { default: axios } = require("axios");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { TextEncoder, TextDecoder } = require("text-encoding");

const defaultPrivateKey = "5Hxpz5eGQXJ2N3hKwnagNsrnds2xiYk4ETTbRfYhCWfxyAdbc9d"; // ocean2
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const hyperion = "https://hypertestapi.alacritys.net/";
const rpc = new JsonRpc("https://hypertestapi.alacritys.net", { fetch });

const api = new Api({
  rpc,
  signatureProvider, //,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

// console.log("api", { api });

const getUsername = async () => {
  // pubKey = "ALA" + pubKey.substring(3);
  let pubKey = "EOS7qFx8v8EmnxcCwLmkdyDkSYcHMnEy5jkJnUEdqurji6ECu2RKX";
  const url = `${hyperion}v1/history/get_key_accounts`;
  const body = {
    public_key: pubKey,
  };
  const config = {
    headers: {
      "Content-Type": "text/plain",
      Accept: "*/*",
    },
  };
  const response = await axios.post(url, body, config);
  console.log(response.data);
  const data = response.data;
  if (data && data.account_names && data.account_names.length > 0) {
    return data.account_names;
  } else {
    return false;
  }
};

getUsername();

// (async () => {
//   const result = await api.transact(
//     {
//       actions: [
//         {
//           account: "alaio.token",
//           name: "transfer",
//           authorization: [
//             {
//               actor: "ocean2",
//               permission: "active",
//             },
//           ],
//           data: {
//             from: "ocean2",
//             to: "influencer",
//             quantity: "0.0001 KPW",
//             memo: "transfer",
//           },
//         },
//       ],
//     },
//     {
//       blocksBehind: 3,
//       expireSeconds: 30,
//     }
//   );
//   console.dir(result);
// })();

// from infra token to any account (In Working)
// (async () => {
//   const result = await api.transact(
//     {
//       actions: [
//         {
//           account: "infratoken",
//           name: "transfer",
//           authorization: [
//             {
//               actor: "infratoken",
//               permission: "active",
//             },
//           ],
//           data: {
//             from: "infratoken",
//             to: "ocean2",
//             quantity: "0.0001 ASA",
//             memo: "transfer",
//           },
//         },
//       ],
//     },
//     {
//       blocksBehind: 3,
//       expireSeconds: 30,
//     }
//   );
//   console.dir(result);
// })();

(async () => {
  const result = await api.transact(
    {
      actions: [
        {
          account: "influencer", // contract account name
          name: "onboardbrand", // function name
          authorization: [
            {
              actor: "ocean2", // EOA
              permission: "active",
            },
          ],
          data: {
            user: "ocean2",
            metadata: "www.ocean2.com",
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
  console.dir(result);
})();
