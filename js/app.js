// --- GLOBAL VARIABLES ---
let sample = {
  latent_dimensions: [],
};
let examples = [];

// --- DOM ELEMENTS ---
const jsonInput = document.getElementById("jsonInput");
const sliderContainer = document.getElementById("sliderContainer");
const promptOutput = document.getElementById("promptOutput");
const llmPromptOutput = document.getElementById("llmPromptOutput");
const finalPromptOutput = document.getElementById("finalPromptOutput");
const gridPromptOutput = document.getElementById("gridPromptOutput");
const textVariationsPromptOutput = document.getElementById(
  "textVariationsPromptOutput",
);

// --- CORE FUNCTIONS ---

/**
 * Updates all prompt outputs with current dimension data
 * @param {Array<Object>} dimensions - Array of dimension objects
 */
function updateAllPrompts(dimensions) {
  // Update text prompt
  const textPrompt = dimensions.map((d) => `${d.name}: ${d.value}`).join(", ");
  promptOutput.value = textPrompt;

  // Update final prompt (text + JSON)
  const finalPrompt =
    `Generate content with these characteristics:\n${textPrompt}\n\nJSON Configuration:\n${
      JSON.stringify({ latent_dimensions: dimensions }, null, 2)
    }`;
  finalPromptOutput.value = finalPrompt;

  // Update grid prompt if function exists
  if (typeof generateGridPrompt === "function") {
    generateGridPrompt(dimensions);
  }

  // Update text variations prompt if function exists
  if (typeof generateTextVariationsPrompt === "function") {
    generateTextVariationsPrompt(dimensions);
  }
}

/**
 * Generates grid prompt with variations based on selected dimension
 * @param {Array<Object>} dimensions - Array of dimension objects
 */
function generateGridPrompt(dimensions) {
  const selectedDimension = getSelectedDimension(dimensions);

  // Create grid with variations of the selected dimension
  const gridPrompt =
    `Generate a grid of variations for "${selectedDimension.propertyName}" dimension:

Base Configuration:
${dimensions.map((d) => `${d.name}: ${d.value}`).join(", ")}

Grid Variations:
Create 9 variations by adjusting "${selectedDimension.propertyName}" through its full range:
- Top-left: ${selectedDimension.varyingParam.values[0]}
- Top-center: ${selectedDimension.varyingParam.values[2]}
- Top-right: ${selectedDimension.varyingParam.values[4]}
- Middle-left: ${selectedDimension.varyingParam.values[5]}
- Middle-center: ${selectedDimension.varyingParam.values[6]}
- Middle-right: ${selectedDimension.varyingParam.values[8]}
- Bottom-left: ${selectedDimension.varyingParam.values[9]}
- Bottom-center: ${selectedDimension.varyingParam.values[10]}

Each variation should maintain the other dimensions at their current values while only changing "${selectedDimension.propertyName}".

JSON for each variation:
${
      JSON.stringify(
        {
          base_config: dimensions.map((d) => ({
            name: d.name,
            value: d.value,
          })),
          variations: selectedDimension.varyingParam.values.map(
            (value) => ({
              [selectedDimension.propertyName]: value,
              description:
                `Variation with ${selectedDimension.propertyName}: ${value}`,
            }),
          ),
        },
        null,
        2,
      )
    }`;

  gridPromptOutput.value = gridPrompt;
}

/**
 * Generates text variations prompt based on selected dimension
 * @param {Array<Object>} dimensions - Array of dimension objects
 */
function generateTextVariationsPrompt(dimensions) {
  const selectedDimension = getSelectedDimension(dimensions);

  // Create markdown table with all values from the selected dimension
  const tableRows = selectedDimension.varyingParam.values.map((value) =>
    `| ${value} | [Insert variation of the phrase that matches "${value}" tone here] |`
  ).join("\n");

  const textVariationsPrompt = `Generate a markdown table titled:

**${selectedDimension.propertyName} variations**

Vary only the **"${selectedDimension.propertyName}"** latent dimension across the context. Use the following category values for **${selectedDimension.propertyName}**:

${selectedDimension.varyingParam.values.map((value) => `"${value}"`).join(", ")}

All other latent parameters must remain constant.

The markdown table must contain **two columns**:

* **${selectedDimension.propertyName}** – listing the current category for each row
* **Value** – a variation of the phrase from the context, rewritten to match the tone and aesthetic of the respective **${selectedDimension.propertyName}** value.

| ${selectedDimension.propertyName} | Value |
|---|---|
${tableRows}

After the table, insert this markdown section:

**Based on this context:**

> [Insert the original phrase/text from context here]

Do **not** include any JSON, images, or extra content. The style of the rewritten values must feel natural and match the ${selectedDimension.propertyName.toLowerCase()} dimension.

Include the full JSON for the varying parameter and the fixed parameters for reference:

\`\`\`json
${JSON.stringify(selectedDimension.varyingParam, null, 2)}
\`\`\`

\`\`\`json
{
  "latent_dimensions": [
${
    selectedDimension.fixedParams.map((param) =>
      `    ${JSON.stringify(param, null, 2).replace(/\n/g, "\n    ")}`
    ).join(",\n")
  }
  ]
}
\`\`\``;

  textVariationsPromptOutput.value = textVariationsPrompt;
}

/**
 * Builds slider controls for dimension adjustment
 * @param {Array<Object>} dimensions - Array of dimension objects
 */
function buildSliders(dimensions) {
  sliderContainer.innerHTML = "";

  dimensions.forEach((dimension, index) => {
    const sliderDiv = document.createElement("div");
    sliderDiv.className =
      "bg-white p-4 rounded-lg shadow-sm border border-gray-200 slider has-[input:checked]:outline";

    const currentValueIndex = dimension.values.indexOf(dimension.value);
    const sliderValue = currentValueIndex !== -1 ? currentValueIndex : 5;

    sliderDiv.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <label class="text-sm font-medium text-gray-700">${dimension.name}</label>
        <span class="text-xs text-gray-500">${dimension.importance}/100</span>
      </div>
      <div class="mb-3">
        <label class="flex items-center">
          <input 
            type="radio" 
            name="variation" 
            value="${dimension.name}" 
            ${index === 0 ? "checked" : ""}
            class="mr-2"
          >
          <span class="text-xs text-gray-600">Use for variations</span>
        </label>
      </div>
      <input 
        type="range" 
        min="0" 
        max="10" 
        value="${sliderValue}" 
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        data-dimension="${dimension.name}"
        data-index="${index}"
      >
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>${dimension.values[0]}</span>
        <span>${dimension.values[5]}</span>
        <span>${dimension.values[10]}</span>
      </div>
      <div class="mt-2">
        <label class="text-xs text-gray-600">Current: ${dimension.value}</label>
      </div>
      <div class="mt-1">
        <label class="text-xs text-gray-500">${dimension.explanation}</label>
      </div>
    `;

    const slider = sliderDiv.querySelector('input[type="range"]');
    slider.addEventListener("input", function () {
      const newValueIndex = parseInt(this.value);
      const newValue = dimension.values[newValueIndex];
      dimension.value = newValue;

      // Update the display
      const currentLabel = sliderDiv.querySelector("label:last-of-type");
      currentLabel.textContent = `Current: ${newValue}`;

      // Update all prompts
      updateAllPrompts(dimensions);
    });

    // Add event listener for radio button
    const radioButton = sliderDiv.querySelector('input[type="radio"]');
    radioButton.addEventListener("change", function () {
      // Update all prompts when selected dimension changes
      updateAllPrompts(dimensions);
    });

    sliderContainer.appendChild(sliderDiv);
  });
}

/**
 * Populates the examples tab with example cards
 */
function populateExamplesTab() {
  const container = document.getElementById("examplesContainer");
  if (!container) {
    console.error("❌ examplesContainer element not found");
    return;
  }

  console.log(`🔧 Populating examples tab with ${examples.length} examples`);
  container.innerHTML = "";

  if (examples.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <p class="text-gray-500 mb-4">No examples available</p>
        <p class="text-sm text-gray-400">Examples will load from dimensions.json when available</p>
      </div>
    `;
    return;
  }

  examples.forEach((example, index) => {
    console.log(
      `📋 Creating card for example ${index + 1}: "${example.title}"`,
    );
    const card = document.createElement("div");
    card.className =
      "border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer bg-gray-50";

    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-800">${example.title}</h3>
        <span class="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">${example.category}</span>
      </div>
      <p class="text-gray-600 text-sm mb-3">${example.description}</p>
      <button class="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors text-sm font-medium">
        Load Example
      </button>
    `;

    // Add click event
    card.addEventListener("click", () => {
      console.log(`🔄 Loading example: "${example.title}"`);
      loadExample(example);
    });

    container.appendChild(card);
  });

  console.log(`✅ Successfully populated ${examples.length} example cards`);
}

/**
 * Loads an example into the application
 * @param {Object} example - The example object to load
 */
function loadExample(example) {
  try {
    // Update sample data
    sample = example.dimensions;

    // Update JSON input
    jsonInput.value = JSON.stringify(sample, null, 2);

    // Rebuild sliders
    buildSliders(sample.latent_dimensions);

    // Set selected dimension if specified
    if (example.selectedDimension) {
      setTimeout(() => {
        const radioButton = document.querySelector(
          `input[name="variation"][value="${example.selectedDimension}"]`,
        );
        if (radioButton) {
          radioButton.checked = true;
          // Trigger change event to update prompts
          radioButton.dispatchEvent(new Event("change"));
        }
      }, 100);
    }

    // Update all prompts
    updateAllPrompts(sample.latent_dimensions);

    // Switch to Adjust Dimensions tab
    const adjustTab = document.querySelector('netsi-tab[name="tab2"]');
    if (adjustTab) {
      adjustTab.activate();
    }

    toast(`✅ Loaded "${example.title}" example!`);
  } catch (error) {
    console.error("Error loading example:", error);
    toast("❌ Error loading example");
  }
}

/**
 * Loads examples from dimensions.json file
 */
async function loadExamplesFromFile() {
  try {
    const response = await fetch("examples/dimensions.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    examples = data;

    // Load the first example on startup
    if (examples.length > 0) {
      loadExample(examples[0]);
    }

    // Populate examples tab
    populateExamplesTab();
    console.log(`✅ Loaded ${examples.length} examples from dimensions.json`);
  } catch (error) {
    console.error("Error loading examples:", error);

    // Create fallback examples when file loading fails
    examples = [
      {
        id: "fallback-example",
        title: "Sample Configuration",
        description:
          "A basic example to get you started. This loads when the examples file is unavailable.",
        category: "Demo",
        selectedDimension: null,
        dimensions: {
          latent_dimensions: [
            {
              name: "Emotional Tone",
              explanation:
                "Represents the dominant emotional tone conveyed in the subject's expression",
              value: "Neutral",
              importance: 87,
              example_value: '"A calm and thoughtful gaze"',
              values: [
                "Flat",
                "Muted",
                "Slightly Sad",
                "Melancholic",
                "Subdued",
                "Neutral",
                "Balanced",
                "Uplifted",
                "Joyful",
                "Playful",
                "Radiant",
              ],
            },
            {
              name: "Visual Complexity",
              explanation:
                "Controls the amount of detail and visual elements present",
              value: "Moderate",
              importance: 75,
              example_value: '"Clean lines with subtle texture"',
              values: [
                "Minimal",
                "Sparse",
                "Simple",
                "Clean",
                "Balanced",
                "Moderate",
                "Detailed",
                "Rich",
                "Complex",
                "Intricate",
                "Overwhelming",
              ],
            },
            {
              name: "Color Saturation",
              explanation: "Intensity and vibrancy of colors used",
              value: "Balanced",
              importance: 82,
              example_value: '"Soft pastels with selective accent colors"',
              values: [
                "Grayscale",
                "Desaturated",
                "Muted",
                "Soft",
                "Natural",
                "Balanced",
                "Vibrant",
                "Rich",
                "Intense",
                "Saturated",
                "Neon",
              ],
            },
          ],
        },
      },
    ];

    // Load the fallback example
    if (examples.length > 0) {
      loadExample(examples[0]);
    }

    // Populate examples tab with fallback
    populateExamplesTab();

    // Show user-friendly message
    toast("ℹ️ Using demo examples (dimensions.json not found)");
    console.log("✅ Loaded fallback examples");
  }
}

/**
 * Shares the current style configuration
 */
function shareCurrentStyle() {
  if (
    !sample || !sample.latent_dimensions ||
    sample.latent_dimensions.length === 0
  ) {
    toast("❌ No dimension data available to share");
    return;
  }

  // Get the currently selected dimension
  const selectedDimension =
    document.querySelector('input[name="variation"]:checked')?.value || "";

  // Create share content
  const shareContent = `Latent Dimension Prompt Builder - Style Configuration

Current Configuration:
${sample.latent_dimensions.map((d) => `${d.name}: ${d.value}`).join("\n")}

Selected Dimension for Variations: ${selectedDimension || "None"}

Instructions:
1. Copy the JSON below
2. Paste it into the JSON input field
3. Click "Load Dimensions"
4. Adjust sliders as needed
5. Select which dimension to use for variations

JSON Configuration:
${JSON.stringify(sample, null, 2)}

Share URL: https://netsi1964.github.io/LatentDimensionPromptBuilder/`;

  // Copy to clipboard
  navigator.clipboard.writeText(shareContent).then(() => {
    toast("✅ Style configuration copied to clipboard!");
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = shareContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast("✅ Style configuration copied to clipboard!");
  });
}

// --- EVENT HANDLERS ---

/**
 * Handles the load button click to parse JSON input
 */
function handleLoadButton() {
  try {
    const inputText = jsonInput.value.trim();
    if (!inputText) {
      toast("❌ Please enter JSON data");
      return;
    }

    const data = JSON.parse(inputText);
    if (!validateDimensionData(data)) {
      toast("❌ Invalid JSON format");
      return;
    }

    sample = data;
    buildSliders(sample.latent_dimensions);
    updateAllPrompts(sample.latent_dimensions);
    toast("✅ Dimensions loaded successfully!");
  } catch (error) {
    console.error("Error parsing JSON:", error);
    toast("❌ Invalid JSON format");
  }
}

// --- MODAL FUNCTIONALITY ---

/**
 * Initialize modal functionality
 */
function initializeModal() {
  const modal = document.getElementById("prepareExampleModal");
  const prepareExampleBtn = document.getElementById("prepareExampleBtn");

  if (!modal || !prepareExampleBtn) {
    console.warn("Modal or button not found, modal functionality disabled");
    return;
  }

  // Open modal
  prepareExampleBtn.addEventListener("click", () => {
    try {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      initializeModalForm();
    } catch (error) {
      console.error("Error in modal click handler:", error);
    }
  });

  // Close modal functionality
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Close modal when clicking backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

/**
 * Initialize modal form elements
 */
function initializeModalForm() {
  const cancelBtn = document.querySelector("#cancelBtn");
  const form = document.querySelector("#prepareExampleForm");
  const selectedDimensionChips = document.querySelector(
    "#selectedDimensionChips",
  );

  if (!cancelBtn || !form || !selectedDimensionChips) {
    console.error("Form elements not found");
    toast("❌ Error loading modal form. Please try again.");
    return;
  }

  setupModalForm(cancelBtn, form, selectedDimensionChips);
}

/**
 * Setup the modal form with event handlers
 */
function setupModalForm(cancelBtn, form, selectedDimensionChips) {
  const modal = document.getElementById("prepareExampleModal");

  // Populate selected dimension chips with current dimensions
  populateSelectedDimensionChips(selectedDimensionChips);

  // Set default values
  setDefaultFormValues();

  // Focus first input
  const exampleIdInput = document.querySelector("#exampleId");
  if (exampleIdInput) {
    exampleIdInput.focus();
  }

  // Close modal function
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    form.reset();
  }

  // Cancel button closes modal
  cancelBtn.addEventListener("click", closeModal);

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate that we have current dimension data
    if (
      !sample || !sample.latent_dimensions ||
      sample.latent_dimensions.length === 0
    ) {
      toast(
        "❌ No dimension data available. Please load some dimensions first.",
      );
      return;
    }

    // Get form data
    const formData = {
      id: document.querySelector("#exampleId").value.trim(),
      title: document.querySelector("#exampleTitle").value.trim(),
      description: document.querySelector("#exampleDescription").value.trim(),
      category: document.querySelector("#exampleCategory").value,
      selectedDimension:
        document.querySelector('.dimension-chip[data-selected="true"]')?.dataset
          .value || null,
      dimensions: sample,
    };

    // Validate required fields
    if (
      !formData.id || !formData.title || !formData.description ||
      !formData.category
    ) {
      toast("❌ Please fill in all required fields.");
      return;
    }

    // Validate ID format
    if (!/^[a-z0-9-]+$/.test(formData.id)) {
      toast(
        "❌ Example ID must contain only lowercase letters, numbers, and hyphens.",
      );
      return;
    }

    // Generate the example JSON
    const exampleJson = JSON.stringify(formData, null, 2);

    // Copy to clipboard
    navigator.clipboard.writeText(exampleJson).then(() => {
      toast(
        "✅ Example JSON copied to clipboard! You can now paste it into dimensions.json",
      );
      closeModal();
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = exampleJson;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast(
        "✅ Example JSON copied to clipboard! You can now paste it into dimensions.json",
      );
      closeModal();
    });
  });
}

/**
 * Populate selected dimension chips
 */
function populateSelectedDimensionChips(chipsContainer) {
  // Clear existing chips except the "No dimension selected" option
  const noDimensionChip = chipsContainer.querySelector('[data-value=""]');
  chipsContainer.innerHTML = "";
  chipsContainer.appendChild(noDimensionChip);

  // Get the currently selected dimension from the main interface
  const currentlySelectedDimension =
    document.querySelector('input[name="variation"]:checked')?.value || "";

  // Track if we found a selected dimension
  let foundSelected = false;

  if (sample && sample.latent_dimensions) {
    sample.latent_dimensions.forEach((dimension) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className =
        "chip dimension-chip px-3 py-1 text-sm font-medium rounded-full border-2 transition-all cursor-pointer";
      chip.dataset.value = dimension.name;
      chip.dataset.selected = "false";
      chip.textContent = dimension.name;

      // Check if this dimension is currently selected in the main interface
      if (dimension.name === currentlySelectedDimension) {
        chip.dataset.selected = "true";
        foundSelected = true;
      }

      // Add click event listener
      chip.addEventListener("click", () => {
        // Deselect all chips
        chipsContainer.querySelectorAll(".dimension-chip").forEach((c) => {
          c.dataset.selected = "false";
        });
        // Select this chip
        chip.dataset.selected = "true";
        updateChipStyles();
      });

      chipsContainer.appendChild(chip);
    });
  }

  // Set "No dimension selected" chip only if no other is selected
  if (noDimensionChip) {
    if (!foundSelected) {
      noDimensionChip.dataset.selected = "true";
    } else {
      noDimensionChip.dataset.selected = "false";
    }
    // Add click event listener
    noDimensionChip.addEventListener("click", () => {
      chipsContainer.querySelectorAll(".dimension-chip").forEach((c) => {
        c.dataset.selected = "false";
      });
      noDimensionChip.dataset.selected = "true";
      updateChipStyles();
    });
  }

  // Update chip styles after adding all chips
  updateChipStyles();
}

/**
 * Update chip styles based on selected state
 */
function updateChipStyles() {
  const chips = document.querySelectorAll(".dimension-chip");
  chips.forEach((chip) => {
    const isSelected = chip.dataset.selected === "true";

    if (isSelected) {
      // Selected state - teal background like examples
      chip.className =
        "chip dimension-chip px-3 py-1 text-sm font-medium rounded-full border-2 border-teal-500 bg-teal-100 text-teal-800 transition-all cursor-pointer";
    } else {
      // Normal state - gray border
      chip.className =
        "chip dimension-chip px-3 py-1 text-sm font-medium rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50 transition-all cursor-pointer";
    }
  });
}

/**
 * Set default form values
 */
function setDefaultFormValues() {
  const currentDate = new Date().toISOString().split("T")[0];
  const timestamp = Date.now();

  const exampleIdInput = document.querySelector("#exampleId");
  const exampleTitleInput = document.querySelector("#exampleTitle");
  const exampleDescriptionInput = document.querySelector("#exampleDescription");
  const exampleCategoryInput = document.querySelector("#exampleCategory");

  if (exampleIdInput) {
    exampleIdInput.value = `custom-example-${timestamp}`;
  }
  if (exampleTitleInput) {
    exampleTitleInput.value = "My Custom Style";
  }
  if (exampleDescriptionInput) {
    exampleDescriptionInput.value =
      "A custom style configuration created with the Latent Dimension Prompt Builder.";
  }
  if (exampleCategoryInput) {
    exampleCategoryInput.value = "Custom";
  }
}

// --- INITIALIZATION ---

/**
 * Initialize the application
 */
function initializeApp() {
  // Load examples from file
  loadExamplesFromFile();

  // Initialize modal functionality
  initializeModal();

  // Initialize share functionality
  const shareBtnMain = document.getElementById("shareBtn-main");
  const shareBtn = document.getElementById("shareBtn");

  if (shareBtnMain) {
    shareBtnMain.addEventListener("click", shareCurrentStyle);
  }
  if (shareBtn) {
    shareBtn.addEventListener("click", shareCurrentStyle);
  }

  // Initialize load button
  const loadBtn = document.getElementById("loadBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", handleLoadButton);
  }

  // Initialize copy buttons
  const copyMap = [
    {
      btn: "copyLLMPromptBtn",
      ta: "llmPromptOutput",
      msg: "✅ Copied LLM prompt!",
    },
    { btn: "copyBtn", ta: "promptOutput", msg: "✅ Copied text prompt!" },
    {
      btn: "copyFinalBtn",
      ta: "finalPromptOutput",
      msg: "✅ Copied text/JSON prompt!",
    },
    {
      btn: "copyGridBtn",
      ta: "gridPromptOutput",
      msg: "✅ Copied grid prompt!",
    },
    {
      btn: "copyTextVariationsBtn",
      ta: "textVariationsPromptOutput",
      msg: "✅ Copied text variations prompt!",
    },
  ];

  copyMap.forEach(({ btn, ta, msg }) => {
    const button = document.getElementById(btn);
    if (button) {
      button.addEventListener("click", () => copyPromptById(ta, msg));
    }
  });
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);

// Expose functions globally for web components
window.sample = sample;
window.generateGridPrompt = generateGridPrompt;
window.generateTextVariationsPrompt = generateTextVariationsPrompt;
