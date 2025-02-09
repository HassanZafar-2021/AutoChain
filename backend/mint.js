const apiKey = "sk_staging_5k3oGycfrukiG7DcKUg1h6YnzHxgKWGPUFvjnTd39CMp3jWWEifGQzxqbKxvcGxt4xngvKuFDbRnedBV6V4g7RFr5HLvX99fQZGZFNJPduSHnaiF3b5GttTwv7DuNXZJwhsFqw7jXkzYDSdQEVxMBBD7Gyj1e3Tb4EuVF4U9TgWbnHcrcBE3KD4kSaNPqKG2vC8n9cAsewePtRoQRcVUz5ER";
const chain = "solana"; // or "polygon-amoy", "ethereum-sepolia", ...
const env = "staging"; // or "www"
const recipientEmail = "tejaschak2008@gmail.com";
const recipientAddress = `email:${recipientEmail}:${chain}`;

const cars = [
    {
        name: "2017 Subaru Forester",
        image: "https://i.ibb.co/qLS4ZKcf/full-resolution-pixelated-5.png",
        description: "The 2017 Subaru Forester is a versatile SUV with excellent off-road capabilities. It offers a comfortable ride and a spacious interior, making it perfect for family adventures."
    },
    {
        name: "2025 Ford F150 Lightning",
        image: "https://i.ibb.co/mVSmzmJY/full-resolution-pixelated-4.png",
        description: "The 2025 Ford F150 Lightning is a groundbreaking electric truck with impressive towing capacity. Its advanced technology and powerful performance set a new standard for electric vehicles."
    },
    {
        name: "2022 Tesla Model X",
        image: "https://i.ibb.co/h1tpsN1m/full-resolution-pixelated-3.png",
        description: "The 2022 Tesla Model X is a luxury electric SUV with falcon-wing doors and a high-tech interior. It offers exceptional range and performance, making it a top choice for eco-conscious drivers."
    },
    {
        name: "2014 Mazda Miata MX5",
        image: "https://i.ibb.co/5hpVy6tF/full-resolution-pixelated-2.png",
        description: "The 2014 Mazda Miata MX5 is a classic roadster known for its agile handling and fun-to-drive nature. Its sleek design and responsive performance make it a favorite among sports car enthusiasts."
    },
    {
        name: "2001 Honda Accord",
        image: "https://i.ibb.co/LdkH1W61/full-resolution-pixelated-1.png",
        description: "The 2001 Honda Accord is a reliable and fuel-efficient sedan with a reputation for longevity. Its comfortable interior and smooth ride make it a practical choice for daily commuting."
    },
    {
        name: "2021 Toyota Gr86",
        image: "https://i.ibb.co/sdmmfvyP/full-resolution-pixelated.pngJ",
        description: "The 2021 Toyota Gr86 is a sporty coupe with sharp handling and a powerful engine. Its stylish design and engaging driving experience make it a standout in the sports car segment."
    }
];

for (const car of cars) {
    console.log(`Minting NFT for ${car.name}`);
    await new Promise(resolve => setTimeout(resolve, 10000));
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
                name: car.name,
                image: car.image,
                description: car.description,
            },
        }),
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error("error:" + err));
}

