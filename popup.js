document.addEventListener('DOMContentLoaded', () => {
  const findDealsButton = document.getElementById('find-deals');
  const resultsDiv = document.getElementById('results');

  findDealsButton.addEventListener('click', () => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        browser.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js'],
        });
        resultsDiv.classList.remove('hidden');
      })
      .catch((error) => console.error('Error executing script:', error));
  });

  // Listen for product messages returned from the content script
  browser.runtime.onMessage.addListener((request) => {
    console.log('Received:', request);

    const updateLink = (elementId, productName, productUrl) => {
      const linkElement = document.getElementById(elementId);
      if (linkElement && productName && productUrl) {
        linkElement.textContent = productName;
        linkElement.href = productUrl;
      }
    };

    updateLink(
      'cheapest-url',
      request.cheapestProductName,
      request.cheapestProductUrl
    );
    updateLink(
      'highest-rated-url',
      request.highestRatedProductName,
      request.highestRatedProductUrl
    );
    updateLink(
      'fastest-url',
      request.fastestProductName,
      request.fastestProductUrl
    );
  });
});
