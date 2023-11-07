/**
 * Parses a string representing a price into a float. If the string is not provided,
 * it returns the maximum number value.
 *
 * @param {string} priceString - The price string to parse.
 * @returns {number} The parsed price as a float or Number.MAX_VALUE if input is invalid.
 */
const parsePrice = (priceString) => {
  if (priceString) return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  return Number.MAX_VALUE;
};

/**
 * Parses a rating from a string. Expects the format 'X out of Y' and returns the X value as a float.
 *
 * @param {string} ratingString - The rating string to parse.
 * @returns {number} The rating as a float or 0 if parsing fails.
 */
const parseRating = (ratingString) =>
  parseFloat(ratingString.split(' out of')[0]) || 0;

/**
 * Parses a delivery date from an element's text content.
 *
 * @param {Element} dateElement - The DOM element containing the date text.
 * @param {Date} [currentDate=new Date()] - The current date for reference.
 * @returns {Date} The parsed delivery date or a far future date if parsing fails.
 */
const parseDeliveryDate = (dateElement, currentDate = new Date()) => {
  if (!dateElement) return new Date('9999-12-31');

  let dateText = dateElement.innerText.trim();
  let currentYear = currentDate.getFullYear();
  let deliveryDate = new Date(`${dateText} ${currentYear}`);

  // If the parsed date has passed, assume it's next year's date
  if (deliveryDate < currentDate) {
    deliveryDate.setFullYear(currentYear + 1);
  }

  return deliveryDate;
};

/**
 * Extracts product details such as name, price, rating, delivery date, and URL from a product element.
 *
 * @param {Element} product - The DOM element of the product.
 * @returns {Object} An object containing product details.
 */
function extractProductDetails(product) {
  const name =
    product.querySelector('.a-size-medium.a-color-base.a-text-normal')
      ?.innerText || 'Unknown Product';
  const price = parsePrice(
    product.querySelector('.a-price .a-offscreen')?.innerText
  );
  const rating = parseRating(product.querySelector('.a-icon-alt')?.innerText);
  const deliveryDate = parseDeliveryDate(
    product.querySelector(
      '.a-color-base.a-text-bold:not(.a-size-medium-plus):not(.a-badge-text):not(.a-size-base)'
    )
  );
  const url = product.querySelector('.a-link-normal.a-text-normal')?.href || '';

  console.log({ price });

  return { name, price, rating, deliveryDate, url };
}

/**
 * Extracts data for the cheapest, highest rated, and fastest delivered products from a list of products.
 *
 * @returns {Object} An object containing details of the extracted products.
 */
function extractProductData() {
  try {
    const products = document.querySelectorAll(
      'div[data-component-type="s-search-result"]'
    );
    let cheapestProduct = { price: Number.MAX_VALUE, url: '', name: '' };
    let highestRatedProduct = { rating: 0, url: '', name: '' };
    let fastestProduct = {
      deliveryDate: new Date('9999-12-31'),
      url: '',
      name: '',
    };

    products.forEach((product) => {
      const details = extractProductDetails(product);

      if (details.price < cheapestProduct.price) {
        cheapestProduct = details;
      }

      if (details.rating > highestRatedProduct.rating) {
        highestRatedProduct = details;
      }

      if (details.deliveryDate < fastestProduct.deliveryDate) {
        fastestProduct = details;
      }
    });

    console.log({
      cheapestProductName: cheapestProduct.name,
      cheapestProductUrl: cheapestProduct.url,
      highestRatedProductName: highestRatedProduct.name,
      highestRatedProductUrl: highestRatedProduct.url,
      fastestProductName: fastestProduct.name,
      fastestProductUrl: fastestProduct.url,
    });

    return {
      cheapestProductName: cheapestProduct.name,
      cheapestProductUrl: cheapestProduct.url,
      highestRatedProductName: highestRatedProduct.name,
      highestRatedProductUrl: highestRatedProduct.url,
      fastestProductName: fastestProduct.name,
      fastestProductUrl: fastestProduct.url,
    };
  } catch (err) {
    console.error('An error occurred during product data extraction:', err);
  }
}

/**
 * Sends product data back to the popup script via a runtime message.
 *
 * @param {Object} results - The product data to send back.
 */
function sendDataBack(results) {
  browser.runtime.sendMessage(results);
}

// Run the extraction function and handle the results
const productResults = extractProductData();
if (productResults) {
  sendDataBack(productResults);
} else {
  console.error('No product results found.');
}
