# Personal comments on this project
## Project Structure and Focus
This project's primary focus was establishing a robust and scalable structure. No additional user interface components were added to maintain simplicity and concentrate on the core architecture.

Little to no boilerplates were used to ensure no extra weight or unknown configuration was present.

Note: The input for the Year was intentionally left as an open input rather than using a Combobox. This design decision allows the possibility of user errors.

## Testing and Quality Assurance
### In-Browser Testing
A significant next step in quality assurance will be in-browser testing, potentially utilizing BrowserStack services within a CI/CD pipeline. This approach will explore using ARIA labels for testing rather than data-testids. This method aligns tests closer to real-world usage and enhances accessibility.

## Future Development
### Router Implementation
Although not included in the current scope to maintain focus, a router would be essential for seamlessly navigating between different parts of the application.

## Essential Components for MVP
A minimal viable product (MVP) for this project should include the following:

- Datastore (Redux): For state management.
- i18n: For internationalization, although current translations are incomplete, they mainly serve to demonstrate error management capabilities.
- Router: While not currently included, it is deemed necessary for future development to handle routing efficiently.
## Emphasis on Testing
Testing is a important component of this project. Based on my experience, tests can be categorized into three types: verification, validation, and destructive.

### Verification Tests
These are development tools aimed at improving code efficiency and maintainability. However, they are highly implementation-specific (white-box testing) and can become less reliable over time as they do not retain the knowledge of the code's intended behaviour.

### Validation Tests
Located in the /features-validation directory, these black-box tests are designed to be very literal and are crucial for maintaining the code's purpose. They have proven helpful in various scenarios, such as preventing feature overlap and ensuring that no essential features are inadvertently removed.

### Destructive Tests
These tests aim to uncover "unexpected features" or edge cases. They help identify areas where either verification or validation tests can be developed to incorporate this new knowledge, ensuring comprehensive coverage and robustness of the application.

## Conclusion
The project prioritizes a scalable and maintainable architecture with an emphasis on testing. Future enhancements will include implementing a router and refining the internationalization features. The focus on rigorous testing methodologies ensures that the project remains robust and reliable over time.


