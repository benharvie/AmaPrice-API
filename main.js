const fetch = require("node-fetch");
const express = require("express");

const domains = [
  // [ EUROPE ]
  ".co.uk",
  ".fr",
  ".it",
  ".es",
  ".de",
  ".nl",

  // [ WORLDWIDE ]
  // ".com",
  // ".ca",
  // ".cn",
  // ".in",
  // ".co.jp",
  // ".sg",
  // ".com.tr",
  // ".com.mx",
  // ".com.au",
  // ".com.br",
];

async function getPrice(asin) {
  return await Promise.all(
    domains.map((domain) =>
      fetch(
        `https://www.amazon${domain}/gp/aws/cart/add.html?AssociateTag=x&ASIN.1=${asin}&Quantity.1=1`
      )
        .then((response) => response.text())
        .then((htmlResponse) => {
          const url = `https://www.amazon${domain}/gp/aws/cart/add.html?AssociateTag=x&ASIN.1=${asin}&Quantity.1=1`;
          // Parse HTML response for price text
          const unsanitizedPrice = htmlResponse
            .split('<td nowrap class="price item-row" valign="top">')[1]
            .split("</td>")[0];

          // If price is in EUR, sanitize & convert price to GBP
          if (domain !== ".co.uk") {
            // Output eg. `EUR 59,99`
            const sanitizedPrice = (
              parseFloat(
                unsanitizedPrice.replace(",", ".").replace("EUR", "")
              ) * 0.9
            ) // Current rate, 1.00 EUR === 0.90 GBP
              .toFixed(2);
            return {
              domain,
              url,
              price: `£${sanitizedPrice}`,
            };
          } else {
            return {
              domain,
              url,
              price: unsanitizedPrice,
            };
          }
        })
        .catch(() => {
          return { domain, price: null };
        })
    )
  ).then((priceList) => JSON.stringify({ priceList }));
}

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/search/:asin", async function (req, res) {
  // Prevents weird bug that passes favicon in as param
  if (req.params.asin !== "favicon.ico")
    res.send(await getPrice(req.params.asin));
});

// Start server
if (!module.parent) {
  const port = process.env.PORT || 3333;
  app.listen(port);
  console.log(
    `Express started, search via. http://localhost:${port}/search/{ASIN}`
  );
}
