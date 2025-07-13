/**
 * Escapes underscores in markdown strings to prevent unintended formatting
 * @param {string} str - The string to escape
 * @returns {string} The escaped string
 */
function escapeMarkdown(str) {
  return str.replace(/_/g, "\\_");
}

/**
 * Displays a temporary toast notification message
 * @param {string} msgText - The message to display
 */
function toast(msgText) {
  const msg = document.createElement("div");
  msg.textContent = msgText;
  msg.className =
    "fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-1 rounded";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);
}

/**
 * Copies content from an element to clipboard and shows toast notification
 * @param {HTMLElement} element - The element containing text to copy
 * @param {string} message - Success message to display
 */
function copyToClipboard(element, message) {
  element.select();
  document.execCommand("copy");
  toast(message);
}

/**
 * Validates dimension data structure
 * @param {Object} data - Data to validate
 * @returns {boolean} True if valid
 */
function validateDimensionData(data) {
  if (!data || typeof data !== "object") {
    return false;
  }

  if (!Array.isArray(data.latent_dimensions)) {
    return false;
  }

  // Check each dimension has required fields (minimal validation for shared URLs)
  return data.latent_dimensions.every(
    (dim) =>
      dim.name &&
      dim.value !== undefined &&
      dim.importance !== undefined,
  );
}

/**
 * Creates a simplified dimension object with only essential fields
 * @param {Object} dimension - The full dimension object
 * @param {string} dimension.name - Dimension name
 * @param {string} dimension.explanation - Dimension explanation
 * @param {string} dimension.value - Current dimension value
 * @param {number} dimension.importance - Importance rating (1-100)
 * @returns {Object} Simplified dimension object
 */
function createSimplifiedDimension(dimension) {
  return {
    name: dimension.name,
    explanation: dimension.explanation,
    value: dimension.value,
    importance: dimension.importance,
  };
}

/**
 * Gets the currently selected dimension from radio buttons
 * @param {Array<Object>} dimensions - Array of dimension objects
 * @returns {Object} Object containing selected dimension data
 * @returns {string} returns.propertyName - Name of selected property
 * @returns {string} returns.escapedName - Markdown-escaped name
 * @returns {Object} returns.varyingParam - The selected dimension object
 * @returns {Array<Object>} returns.fixedParams - All other dimensions
 */
function getSelectedDimension(dimensions) {
  const selectedElement = document.querySelector(
    '[name="variation"][type="radio"]:checked',
  );
  const propertyName = selectedElement
    ? selectedElement.value
    : dimensions[0].name;
  return {
    propertyName,
    escapedName: escapeMarkdown(propertyName),
    varyingParam: dimensions.find((d) => d.name === propertyName),
    fixedParams: dimensions.filter((d) => d.name !== propertyName),
  };
}

/**
 * Helper function for copying prompt content by textarea ID
 * @param {string} textareaId - The ID of the textarea element
 * @param {string} message - Success message to display
 */
function copyPromptById(textareaId, message) {
  const el = document.getElementById(textareaId);
  if (!el) return;
  el.select();
  try {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(el.value).then(() => {
        toast(message);
      });
    } else {
      document.execCommand("copy");
      toast(message);
    }
  } catch (e) {
    toast("❌ Could not copy");
  }
}
