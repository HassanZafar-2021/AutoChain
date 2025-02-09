const apiKey = "sk_staging_673ogr4r8iSEr5cwnpDcYgD1MeKeyz2MSrNYA6fvnxw4VTTRuCBxbNVh1TAebdVKWw6ZVT4DZSKmvioTHgGRWn4gUV2Nqcp242SgwkDPbgGLzqDxYFFadfjr7nhKH1gmFaFPfQBEBnRyKuP4WZMcMaCA85jLF1nJnHXQwvRm8getAB67oDZApjDvdwV2ZE2w2dxR71BJDmjdDz6YcoxMGcRS";
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
