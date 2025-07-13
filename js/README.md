# JavaScript Files Structure

This directory contains the JavaScript files for the Latent Dimension Prompt
Builder, split from the original monolithic `index.html` file.

## File Organization

### `utils.js`

Contains utility functions used throughout the application:

- `escapeMarkdown()` - Escapes markdown characters
- `toast()` - Shows toast notifications
- `copyToClipboard()` - Copies content to clipboard
- `validateDimensionData()` - Validates dimension data structure
- `createSimplifiedDimension()` - Creates simplified dimension objects
- `getSelectedDimension()` - Gets currently selected dimension
- `copyPromptById()` - Helper for copying prompts

### `web-components.js`

Contains all custom web components:

- `NetsiTab` - Custom tab component with comprehensive API
- `NetsiTabContent` - Tab content component
- `NetsiNew` - "New" badge component with expiry functionality
- `NetsiModal` - Modal component (currently not used but available)

### `app.js`

Contains the main application logic:

- Global variables and DOM element references
- Core functions for updating prompts and building UI
- Event handlers for user interactions
- Modal functionality for the "Prepare Example" feature
- Examples loading from `dimensions.json`
- Share functionality
- Application initialization

## Loading Order

The files are loaded in this specific order in `index.html`:

1. `utils.js` (utilities used by other files)
2. `web-components.js` (custom components)
3. `app.js` (main application logic)

This ensures that dependencies are available when needed.

## Global Variables

Some variables and functions are exposed globally on the `window` object to
allow communication between components:

- `window.sample` - Current sample data
- `window.generateGridPrompt` - Grid prompt generation function
- `window.generateTextVariationsPrompt` - Text variations prompt generation
  function

## File Reduction

The original `index.html` file was reduced from **2,785 lines** to **491 lines**
by moving:

- **CSS styles** to `css/styles.css`
- **JavaScript code** to separate files in `js/` directory

This makes the codebase much more maintainable and easier to work with.
