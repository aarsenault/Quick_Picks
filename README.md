# Amazon Quick Picks Extension

Amazon Quick Picks is an extension for the Firefox browser that simplifies your Amazon shopping experience by quickly identifying the cheapest deals, highest-rated products, and products with the fastest delivery times based on your search results.

## Installation

Currently, the extension is not available on the browser stores and has to be installed manually. Here are the steps to install the extension in developer mode:

### For Firefox:

1. Open Firefox and navigate to `about:debugging`.
2. Click on "This Firefox" (or "Load Temporary Add-on").
3. Browse to the location of your extension's directory.
4. Select the manifest file (`manifest.json`) and click "Open".

### For Chrome:

 - Not yet supported

## Usage

After installation, navigate to any Amazon search results page. The extension icon will highlight showing it can provide insights. 
![Screenshot 2023-11-07 at 3 54 40 PM](https://github.com/aarsenault/Quick_Picks/assets/5014978/51daa40a-2247-4b94-b424-d0405721d872)


Click on the extension icon and then click on "Find Best Products". A popup will appear with the best deals according to:

- Cheapest Price
- Highest Rating
- Fastest Delivery

You can click on the links provided to go directly to the product pages.

![Screenshot 2023-11-07 at 3 57 04 PM](https://github.com/aarsenault/Quick_Picks/assets/5014978/9af1a41a-cdef-436c-b8ba-7bb5c5da1700)


## Next Steps

Further development and enhancements are planned to improve the functionality and user experience of the Amazon Quick Picks extension.

### Code Improvements

#### Transition to a Modern Framework

The current version of the extension is built using basic JavaScript, HTML, and CSS. To scale the application and add more complex features while improving maintainability, we plan to transition the codebase to a modern front-end framework like React. This will allow us to:

- Create a more dynamic and responsive user interface.
- Manage state more effectively across the extension.
- Break down the application into reusable components.
- Leverage the rich ecosystem of tools and libraries available for React.

#### Adoption of TypeScript

To enhance code quality and maintainability, we aim to adopt TypeScript in place of plain JavaScript. TypeScript's static type-checking abilities will bring the following advantages:

- Early detection of type-related bugs at compile time rather than at runtime.
- Improved developer tooling for better autocompletion, code navigation, and refactoring capabilities.
- Easier management of data structures and models used throughout the extension.

These code improvements will set the foundation for a robust application that can grow in features and maintain high-quality standards.

### Background Script Implementation

- **Automatic Popup**: We will investigate the addition of a background script to automatically present the popup on Amazon search result pages, enhancing the user experience by providing immediate insights.
- **Relevant Page Detection**: The script will include logic to determine if a user is on an applicable Amazon page to trigger the popup accordingly.

### Testing

- **Unit Testing**: Setting up a suite of unit tests to ensure each function behaves as expected.
- **Integration Testing**: Ensuring that the extension works seamlessly with the Amazon website as a whole.
- **User Testing**: Gathering user feedback to refine the extension's usability and feature set.


### Code improvements
## Considerations

### Website Structure Changes

The Amazon Quick Picks extension relies on the current structure of Amazon's web pages to function correctly. As such, changes to the structure of Amazon's product listings or search result pages may impact the extension's ability to parse and retrieve product information accurately. Here are specific considerations:

- **DOM Elements**: The extension identifies products and their details (price, rating, delivery date) through specific classes and identifiers in the HTML. If Amazon updates these elements, the selectors used in the extension's scripts may no longer be valid.
- **Page Layout**: Significant redesigns to Amazon's page layout could alter the DOM structure enough that the extension's current logic might not be able to find the necessary information.

To mitigate these issues, the extension will require regular updates and maintenance to ensure compatibility with Amazon's website changes. Users are encouraged to report any malfunctions through the issue tracker, and developers should monitor the Amazon website for changes that could affect the extension's functionality.

### Language Support

Currently, the Amazon Quick Picks extension is designed to work with the English language version of Amazon. It parses text content based on English words and phrases (such as "out of" for ratings or "Delivery" for delivery dates), and therefore may not function correctly on non-English versions of the site. Here are specific limitations:

- **Text Parsing**: The extension may not accurately parse information if the text is in a language other than English, as the parsing logic is based on English language strings.
- **Localization**: The extension does not support localization and may not display content correctly formatted for other languages or regions.

Future updates may include support for additional languages and improved localization to enhance the extension's usability across different Amazon regional websites.
