const apiKey = "sk_staging_5k3oGycfrukiG7DcKUg1h6YnzHxgKWGPUFvjnTd39CMp3jWWEifGQzxqbKxvcGxt4xngvKuFDbRnedBV6V4g7RFr5HLvX99fQZGZFNJPduSHnaiF3b5GttTwv7DuNXZJwhsFqw7jXkzYDSdQEVxMBBD7Gyj1e3Tb4EuVF4U9TgWbnHcrcBE3KD4kSaNPqKG2vC8n9cAsewePtRoQRcVUz5ER";
const chain = "solana"; // or "polygon-amoy", "ethereum-sepolia", ...
const env = "staging"; // or "www"
const recipientEmail = "tejaschak2008@gmail.com";
const recipientAddress = `email:${recipientEmail}:${chain}`;

const url = `https://${env}.crossmint.com/api/2022-06-09/collections/default/nfts`;
const options = {
    method: "POST",
    headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": apiKey,
    },
    body: JSON.stringify({
        recipient: recipientAddress,
        metadata: {
            name: "2017 Subaru Forester",
            image: "https://i.ibb.co/qLS4ZKcf/full-resolution-pixelated-5.png",
            description: "a cool car frfr",
        },
    }),
};

fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
