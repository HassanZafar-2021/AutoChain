/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/car_nft.json`.
 */
export type CarNft = {
  "address": "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF",
  "metadata": {
    "name": "carNft",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeCar",
      "discriminator": [
        215,
        236,
        75,
        124,
        139,
        155,
        83,
        16
      ],
      "accounts": [
        {
          "name": "carAccount",
          "writable": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeCar",
      "discriminator": [
        77,
        65,
        17,
        16,
        229,
        175,
        148,
        74
      ],
      "accounts": [
        {
          "name": "carAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "vin",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "listCar",
      "discriminator": [
        26,
        154,
        28,
        79,
        225,
        255,
        128,
        254
      ],
      "accounts": [
        {
          "name": "carAccount",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unlistCar",
      "discriminator": [
        149,
        109,
        81,
        102,
        57,
        204,
        12,
        78
      ],
      "accounts": [
        {
          "name": "carAccount",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "updateMetadata",
      "discriminator": [
        170,
        182,
        43,
        239,
        97,
        78,
        225,
        186
      ],
      "accounts": [
        {
          "name": "carAccount",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newUri",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "carAccount",
      "discriminator": [
        164,
        111,
        205,
        167,
        132,
        100,
        131,
        126
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "You are not authorized to perform this action"
    }
  ],
  "types": [
    {
      "name": "carAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "vin",
            "type": "string"
          },
          {
            "name": "metadataUri",
            "type": "string"
          },
          {
            "name": "isListed",
            "type": "bool"
          },
          {
            "name": "price",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
