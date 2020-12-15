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

1. Install dependencies:\
   `npm i`

2. Start the server\
   `node main.js`

3. Search for prices via. Amazon ASIN number via. http://localhost:3000/search/{ASIN}

## How to find the ASIN

The ASIN is a unique 10 character long string, that begins with the letter `B`. It can be found in the Amazon URL directly, eg. `https://www.amazon.co.uk/Nescaf%C3%A9-Dolce-Gusto-Jovia-DeLonghi/dp/B00J5ERXZM/`, after the `/dp/` route. In this example the ASIN would be `B00J5ERXZM`.\\

Alternatively, the ASIN is often listed in the `Product Details` section at the bottom of the Amazon product's page.

## Live Demo

Live Demo: http://amaprice.herokuapp.com/search/B00J5ERXZM

## Example Output

```json
{
  "priceList": [
    {
      "domain": ".co.uk",
      "url": "https://www.amazon.co.uk/gp/aws/cart/add.html?ASIN.1=B00J5ERXZM&Quantity.1=1",
      "price": "£69.99"
    },
    {
      "domain": ".fr",
      "price": "£29.99"
    },
    {
      "domain": ".it",
      "url": "https://www.amazon.it/gp/aws/cart/add.html?ASIN.1=B00J5ERXZM&Quantity.1=1",
      "price": "£69.29"
    },
    {
      "domain": ".es",
      "url": "https://www.amazon.es/gp/aws/cart/add.html?ASIN.1=B00J5ERXZM&Quantity.1=1",
      "price": "£67.49"
    },
    {
      "domain": ".de",
      "url": "https://www.amazon.de/gp/aws/cart/add.html?ASIN.1=B00J5ERXZM&Quantity.1=1",
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

Please keep in mind that a lot electronic items for the UK that use a different mains socket to the rest of the EU will not produce results as they have individual ASIN numbers for that specific plug socket.
