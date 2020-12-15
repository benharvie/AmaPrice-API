# AmaPrice API

Amazon global price comparison API. Save money by finding deals across other parts of the world through Amazon, with a Prime membership, shipping will still be free!

Supports:

- .co.uk
- .fr
- .it
- .es
- .de
- .nl

## Usage

1. Install dependencies
   `npm i`

2. Start the server
   `node main.js`

3. Search for prices via. Amazon ASIN number via. http://localhost:3000/search/{ASIN}

---

## How to find the ASIN

The ASIN is a unique 10 character long string, that usually begins with a `B`. It can be found in the Amazon URL directly, eg. `https://www.amazon.co.uk/Anker-PowerCore-Slim-10000-Brown/dp/B07ZFM4L77/`, after the `/dp/` route. In this example it is `B07ZFM4L77`.

Alternatively, the ASIN is often listed in the `Product Details` section at the bottom of the product page.

## Example Output

```json
{
  "priceList": [
    {
      "domain": ".co.uk",
      "price": "£29.99"
    },
    {
      "domain": ".fr",
      "price": "£64.49"
    },
    {
      "domain": ".it",
      "price": "£58.76"
    },
    {
      "domain": ".es",
      "price": "£69.19"
    },
    {
      "domain": ".de",
      "price": "£70.19"
    },
    {
      "domain": ".nl",
      "price": null
    }
  ]
}
```

A `null` response value for `price` represents that the item is not available in that country, this could be as they do not stock the item at all or it may just be out of stock temporarily.

Please keep in mind that a lot electronic items for the UK that use a different mains socket to the rest of the EU will not produce results as they have individual ASIN numbers for that specicific plug.
