/**
 * Custom tab component that manages tab functionality with comprehensive API
 *
 * @fires NetsiTab#tab-selecting - Before tab activation (cancellable)
 * @fires NetsiTab#tab-selected - After tab activation
 * @fires NetsiTab#tab-deselecting - Before tab deactivation (cancellable)
 * @fires NetsiTab#tab-deselected - After tab deactivation
 *
 * @example
 * // Create a new tab
 * const tab = new NetsiTab('My Tab', 'content-id');
 *
 * // Add event listeners
 * tab.addEventListener('tab-selecting', (e) => {
 *   if (shouldPreventSelection()) {
 *     e.preventDefault(); // Cancels the selection
 *   }
 * });
 *
 * // Set loading state
 * NetsiTab.setLoading('tab1', true);
 *
 * // Add new tab
 * NetsiTab.add(new NetsiTab('New Tab', 'new-content'), NetsiTab.getCurrentTab(), true);
 */
class NetsiTab extends HTMLElement {
  /**
   * Creates a new NetsiTab instance
   * @param {string} [text] - The tab display text
   * @param {string} [contentId] - The ID of the content element to show
   */
  constructor(text, contentId) {
    super();

    if (text) this.textContent = text;
    if (contentId) this.setAttribute("name", contentId);

    this._isLoading = false;
    this._originalContent = "";

    this.addEventListener("click", this.handleClick.bind(this));
    this.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  /**
   * Called when the element is connected to the DOM
   */
  connectedCallback() {
    this.setAttribute("role", "tab");
    this.setAttribute("tabindex", "0");
    this.setAttribute("aria-selected", "false");

    this._originalContent = this.textContent;

    // Set initial active state
    if (this.hasAttribute("active")) {
      this.activate();
    }
  }

  /**
   * Handles click events on the tab
   * @param {Event} event - The click event
   */
  handleClick(event) {
    event.preventDefault();
    if (!this._isLoading) {
      this.activate();
    }
  }

  /**
   * Handles keyboard events for accessibility
   * @param {KeyboardEvent} event - The keyboard event
   */
  handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!this._isLoading) {
        this.activate();
      }
    }
  }

  /**
   * Activates this tab and deactivates siblings
   * @param {Object} [options] - Activation options
   * @param {boolean} [options.force=false] - Force activation even if event is cancelled
   * @returns {boolean} True if activation was successful
   */
  activate(options = {}) {
    const { force = false } = options;

    // Fire tab-selecting event (cancellable)
    const selectingEvent = new CustomEvent("tab-selecting", {
      bubbles: true,
      cancelable: true,
      detail: { tab: this, contentId: this.getContentId() },
    });

    this.dispatchEvent(selectingEvent);

    if (selectingEvent.defaultPrevented && !force) {
      return false;
    }

    const tabsContainer = this.closest("netsi-tabs");
    const contentId = this.getContentId();

    // Deactivate all tabs in the same container
    tabsContainer.querySelectorAll("netsi-tab").forEach((tab) => {
      if (tab !== this && tab.hasAttribute("active")) {
        tab.deactivate({ fromActivation: true });
      }
    });

    // Activate this tab
    this.setAttribute("active", "");
    this.setAttribute("aria-selected", "true");

    // Deactivate all tab content
    document.querySelectorAll("netsi-tab-content").forEach((content) => {
      content.removeAttribute("active");
    });

    // Activate corresponding content
    const targetContent = document.getElementById(contentId);
    if (targetContent) {
      targetContent.setAttribute("active", "");

      // Regenerate prompts for specific tabs
      if (
        contentId === "tab5" &&
        window.generateGridPrompt &&
        window.sample
      ) {
        window.generateGridPrompt(window.sample.latent_dimensions);
      }
      if (
        contentId === "tab6" &&
        window.generateTextVariationsPrompt &&
        window.sample
      ) {
        window.generateTextVariationsPrompt(window.sample.latent_dimensions);
      }
    }

    // Fire tab-selected event
    this.dispatchEvent(
      new CustomEvent("tab-selected", {
        bubbles: true,
        detail: { tab: this, contentId, targetContent },
      })
    );

    return true;
  }

  /**
   * Deactivates this tab
   * @param {Object} [options] - Deactivation options
   * @param {boolean} [options.force=false] - Force deactivation even if event is cancelled
   * @param {boolean} [options.fromActivation=false] - Internal flag indicating deactivation from another tab's activation
   * @returns {boolean} True if deactivation was successful
   */
  deactivate(options = {}) {
    const { force = false, fromActivation = false } = options;

    if (!this.hasAttribute("active")) {
      return true; // Already deactivated
    }

    // Fire tab-deselecting event (cancellable)
    const deselectingEvent = new CustomEvent("tab-deselecting", {
      bubbles: true,
      cancelable: true,
      detail: {
        tab: this,
        contentId: this.getContentId(),
        fromActivation,
      },
    });

    this.dispatchEvent(deselectingEvent);

    if (deselectingEvent.defaultPrevented && !force) {
      return false;
    }

    // Deactivate this tab
    this.removeAttribute("active");
    this.setAttribute("aria-selected", "false");

    // Fire tab-deselected event
    this.dispatchEvent(
      new CustomEvent("tab-deselected", {
        bubbles: true,
        detail: { tab: this, contentId: this.getContentId() },
      })
    );

    return true;
  }

  /**
   * Gets the content ID for this tab
   * @returns {string} The content ID
   */
  getContentId() {
    return this.getAttribute("content") || this.getAttribute("name");
  }

  /**
   * Sets the loading state of this tab
   * @param {boolean} loading - Whether the tab should show loading state
   */
  setLoading(loading) {
    this._isLoading = loading;

    if (loading) {
      this.classList.add("loading");
      this.setAttribute("aria-busy", "true");
      this.style.cursor = "not-allowed";
      this.style.opacity = "0.6";

      // Add loading spinner
      if (!this.querySelector(".loading-spinner")) {
        const spinner = document.createElement("span");
        spinner.className = "loading-spinner inline-block animate-spin ml-2";
        spinner.innerHTML = "⟳";
        this.appendChild(spinner);
      }
    } else {
      this.classList.remove("loading");
      this.removeAttribute("aria-busy");
      this.style.cursor = "";
      this.style.opacity = "";

      // Remove loading spinner
      const spinner = this.querySelector(".loading-spinner");
      if (spinner) {
        spinner.remove();
      }
    }
  }

  /**
   * Checks if the tab is currently loading
   * @returns {boolean} True if loading
   */
  isLoading() {
    return this._isLoading;
  }

  /**
   * Removes this tab and its associated content
   */
  remove() {
    const contentId = this.getContentId();
    const content = document.getElementById(contentId);

    // If this tab is active, activate another tab
    if (this.hasAttribute("active")) {
      const tabsContainer = this.closest("netsi-tabs");
      const nextTab = this.nextElementSibling || this.previousElementSibling;
      if (nextTab && nextTab.tagName === "NETSI-TAB") {
        nextTab.activate({ force: true });
      }
    }

    // Remove content element
    if (content) {
      content.remove();
    }

    // Remove tab element
    super.remove();
  }

  // --- STATIC METHODS ---

  /**
   * Sets the loading state for a tab by ID
   * @param {string} tabId - The tab name/ID
   * @param {boolean} [loading=true] - Whether to show loading state
   * @returns {boolean} True if tab was found and updated
   */
  static setLoading(tabId, loading = true) {
    const tab = document.querySelector(`netsi-tab[name="${tabId}"]`);
    if (tab) {
      tab.setLoading(loading);
      return true;
    }
    console.warn(`Tab with ID "${tabId}" not found`);
    return false;
  }

  /**
   * Gets the currently active tab
   * @returns {NetsiTab|null} The active tab element or null
   */
  static getCurrentTab() {
    return document.querySelector("netsi-tab[active]");
  }

  /**
   * Adds a new tab to the tabs container
   * @param {NetsiTab} newTab - The new tab element to add
   * @param {NetsiTab} [referenceTab] - The tab to insert relative to
   * @param {boolean} [before=false] - Whether to insert before the reference tab
   * @returns {boolean} True if tab was added successfully
   */
  static add(newTab, referenceTab = null, before = false) {
    const tabsContainer = document.querySelector("netsi-tabs");
    if (!tabsContainer) {
      console.error("No netsi-tabs container found");
      return false;
    }

    if (!(newTab instanceof NetsiTab)) {
      console.error("newTab must be an instance of NetsiTab");
      return false;
    }

    if (referenceTab) {
      if (before) {
        tabsContainer.insertBefore(newTab, referenceTab);
      } else {
        if (referenceTab.nextSibling) {
          tabsContainer.insertBefore(newTab, referenceTab.nextSibling);
        } else {
          tabsContainer.appendChild(newTab);
        }
      }
    } else {
      tabsContainer.appendChild(newTab);
    }

    return true;
  }

  /**
   * Removes a tab by ID
   * @param {string} tabId - The tab name/ID to remove
   * @returns {boolean} True if tab was found and removed
   */
  static removeById(tabId) {
    const tab = document.querySelector(`netsi-tab[name="${tabId}"]`);
    if (tab) {
      tab.remove();
      return true;
    }
    console.warn(`Tab with ID "${tabId}" not found`);
    return false;
  }

  /**
   * Activates a tab by ID
   * @param {string} tabId - The tab name/ID to activate
   * @param {Object} [options] - Activation options
   * @returns {boolean} True if tab was found and activated
   */
  static activateById(tabId, options = {}) {
    const tab = document.querySelector(`netsi-tab[name="${tabId}"]`);
    if (tab) {
      return tab.activate(options);
    }
    console.warn(`Tab with ID "${tabId}" not found`);
    return false;
  }

  /**
   * Gets all tabs in the container
   * @returns {NodeList} List of all tab elements
   */
  static getAllTabs() {
    return document.querySelectorAll("netsi-tab");
  }
}

/**
 * Custom tab content component with enhanced API
 *
 * @example
 * const content = new NetsiTabContent();
 * content.id = 'my-content';
 * content.innerHTML = '<p>Content here</p>';
 */
class NetsiTabContent extends HTMLElement {
  /**
   * Creates a new NetsiTabContent instance
   * @param {string} [content] - Initial HTML content
   */
  constructor(content) {
    super();
    if (content) {
      this.innerHTML = content;
    }
  }

  /**
   * Called when the element is connected to the DOM
   */
  connectedCallback() {
    this.setAttribute("role", "tabpanel");
    this.setAttribute("aria-hidden", "true");

    // Set initial active state
    if (!this.hasAttribute("active")) {
      this.style.display = "none";
    } else {
      this.setAttribute("aria-hidden", "false");
    }
  }

  /**
   * Called when attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old attribute value
   * @param {string} newValue - New attribute value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active") {
      const isActive = newValue !== null;
      this.style.display = isActive ? "block" : "none";
      this.setAttribute("aria-hidden", isActive ? "false" : "true");

      // Fire content visibility events
      const eventName = isActive ? "content-shown" : "content-hidden";
      this.dispatchEvent(
        new CustomEvent(eventName, {
          bubbles: true,
          detail: { content: this, contentId: this.id },
        })
      );
    }
  }

  /**
   * Observed attributes for the component
   * @returns {Array<string>} Array of attribute names to observe
   */
  static get observedAttributes() {
    return ["active"];
  }

  /**
   * Shows this content panel
   */
  show() {
    this.setAttribute("active", "");
  }

  /**
   * Hides this content panel
   */
  hide() {
    this.removeAttribute("active");
  }

  /**
   * Checks if this content panel is currently visible
   * @returns {boolean} True if visible
   */
  isVisible() {
    return this.hasAttribute("active");
  }
}

/**
 * Custom "New" badge component with expiry functionality
 *
 * @fires NetsiNew#badge-shown - When badge becomes visible
 * @fires NetsiNew#badge-hidden - When badge is hidden
 * @fires NetsiNew#badge-expired - When badge expires and is removed
 * @fires NetsiNew#tooltip-shown - When speech bubble is shown
 * @fires NetsiNew#tooltip-hidden - When speech bubble is hidden
 *
 * @example
 * // Basic usage
 * <netsi-new expires="2024-12-31">
 *   <h4>New Feature!</h4>
 *   <p>Check out our new sharing functionality</p>
 * </netsi-new>
 *
 * // Programmatic creation
 * const badge = new NetsiNew();
 * badge.setAttribute('expires', '2024-06-01');
 * badge.innerHTML = '<p>New update available!</p>';
 */
class NetsiNew extends HTMLElement {
  /**
   * Creates a new NetsiNew instance
   */
  constructor() {
    super();

    this._isVisible = false;
    this._speechBubbleVisible = false;
    this._hideTimeout = null;

    // Bind event handlers
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  /**
   * Called when the element is connected to the DOM
   */
  connectedCallback() {
    this.setAttribute("role", "complementary");
    this.setAttribute("aria-label", "New feature notification");

    // Require a unique id for each badge
    const id = this.getAttribute("id");
    if (!id) {
      console.warn(
        "netsi-new: Missing required id attribute. Badge will always show."
      );
    } else {
      // Use a shared localStorage key for all dismissed badges
      const dismissed = JSON.parse(
        localStorage.getItem("netsi-new-dismissed") || "[]"
      );
      if (dismissed.includes(id)) {
        this.remove();
        return;
      }
    }

    if (!this.checkExpiry()) {
      this.remove();
      return;
    }

    this.render();
    this.attachEventListeners();

    // Fire badge-shown event
    this.dispatchEvent(
      new CustomEvent("badge-shown", {
        bubbles: true,
        detail: {
          badge: this,
          expires: this.getAttribute("expires"),
        },
      })
    );
  }

  /**
   * Called when the element is disconnected from the DOM
   */
  disconnectedCallback() {
    this.detachEventListeners();
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
  }

  /**
   * Called when attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old attribute value
   * @param {string} newValue - New attribute value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "expires" && this.isConnected) {
      if (!this.checkExpiry()) {
        this.expire();
      }
    } else if (name === "label" && this.isConnected && this._badge) {
      // Update badge text when label changes
      this._badge.textContent = newValue || "NEW";
    }
  }

  /**
   * Observed attributes for the component
   * @returns {Array<string>} Array of attribute names to observe
   */
  static get observedAttributes() {
    return ["expires", "label"];
  }

  /**
   * Checks if the badge has expired
   * @returns {boolean} True if badge is still valid
   */
  checkExpiry() {
    const expiryDate = this.getAttribute("expires");

    if (!expiryDate) {
      return true; // No expiry set, always show
    }

    const expiry = new Date(expiryDate);
    const now = new Date();

    if (isNaN(expiry.getTime())) {
      console.warn("Invalid expiry date format:", expiryDate);
      return true; // Invalid date, show badge
    }

    return now <= expiry;
  }

  /**
   * Expires and removes the badge
   */
  expire() {
    // Fire badge-expired event
    this.dispatchEvent(
      new CustomEvent("badge-expired", {
        bubbles: true,
        detail: {
          badge: this,
          expires: this.getAttribute("expires"),
        },
      })
    );

    // Animate out and remove
    this.style.transition = "all 0.3s ease";
    this.style.opacity = "0";
    this.style.transform = "scale(0.8)";

    setTimeout(() => {
      this.remove();
    }, 300);
  }

  /**
   * Renders the badge and speech bubble
   */
  render() {
    // Create badge element
    const badge = document.createElement("div");
    badge.className = "new-badge";
    // Get label from attribute or default to "NEW"
    const label = this.getAttribute("label") || "NEW";
    badge.textContent = label;
    badge.setAttribute("aria-label", "New feature");

    // Add close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-x";
    closeBtn.innerHTML = "&times;";
    closeBtn.title = "Dismiss";
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      this.dismissBadge();
    };
    badge.appendChild(closeBtn);

    // Create speech bubble
    const speechBubble = document.createElement("div");
    speechBubble.className = "new-speech-bubble";
    speechBubble.setAttribute("role", "tooltip");
    speechBubble.setAttribute("aria-hidden", "true");

    // Move original content to speech bubble
    const content = this.innerHTML;
    speechBubble.innerHTML = content;
    this.innerHTML = "";

    // Append elements
    this.appendChild(badge);
    this.appendChild(speechBubble);

    // Store references
    this._badge = badge;
    this._speechBubble = speechBubble;
  }

  /**
   * Dismisses the badge and stores a flag in localStorage
   */
  dismissBadge() {
    const id = this.getAttribute("id");
    if (id) {
      let dismissed = JSON.parse(
        localStorage.getItem("netsi-new-dismissed") || "[]"
      );
      if (!dismissed.includes(id)) {
        dismissed.push(id);
        localStorage.setItem(
          "netsi-new-dismissed",
          JSON.stringify(dismissed)
        );
      }
    }
    this.remove();
  }

  /**
   * Attaches event listeners
   */
  attachEventListeners() {
    if (this._badge) {
      this._badge.addEventListener("mouseenter", this.handleMouseEnter);
      this._badge.addEventListener("mouseleave", this.handleMouseLeave);
      this._badge.addEventListener("touchstart", this.handleTouchStart, {
        passive: true,
      });
    }
    if (this._speechBubble) {
      this._speechBubble.addEventListener("mouseenter", this.handleMouseEnter);
      this._speechBubble.addEventListener("mouseleave", this.handleMouseLeave);
    }
  }

  /**
   * Detaches event listeners
   */
  detachEventListeners() {
    if (this._badge) {
      this._badge.removeEventListener("mouseenter", this.handleMouseEnter);
      this._badge.removeEventListener("mouseleave", this.handleMouseLeave);
      this._badge.removeEventListener("touchstart", this.handleTouchStart);
    }
    if (this._speechBubble) {
      this._speechBubble.removeEventListener("mouseenter", this.handleMouseEnter);
      this._speechBubble.removeEventListener("mouseleave", this.handleMouseLeave);
    }
    document.removeEventListener("click", this.handleDocumentClick);
  }

  /**
   * Handles mouse enter events
   * @param {MouseEvent} event - The mouse event
   */
  handleMouseEnter(event) {
    this._hovering = true;
    this.showSpeechBubble();
  }

  /**
   * Handles mouse leave events
   * @param {MouseEvent} event - The mouse event
   */
  handleMouseLeave(event) {
    this._hovering = false;
    setTimeout(() => {
      if (!this._hovering) {
        this.hideSpeechBubble();
      }
    }, 100); // Small delay to allow moving between badge and bubble
  }

  /**
   * Handles touch start events for mobile
   * @param {TouchEvent} event - The touch event
   */
  handleTouchStart(event) {
    event.preventDefault();

    if (this._speechBubbleVisible) {
      this.hideSpeechBubble();
    } else {
      this.showSpeechBubble();
      // Add document click listener to close on outside tap
      setTimeout(() => {
        document.addEventListener("click", this.handleDocumentClick);
      }, 100);
    }
  }

  /**
   * Handles document click to close speech bubble on mobile
   * @param {MouseEvent} event - The click event
   */
  handleDocumentClick(event) {
    if (!this.contains(event.target)) {
      this.hideSpeechBubble();
      document.removeEventListener("click", this.handleDocumentClick);
    }
  }

  /**
   * Shows the speech bubble
   */
  showSpeechBubble() {
    if (this._speechBubbleVisible || !this._speechBubble) return;

    this._speechBubbleVisible = true;
    this._speechBubble.classList.add("show");
    this._speechBubble.setAttribute("aria-hidden", "false");

    // Clear any pending hide timeout
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    // Fire tooltip-shown event
    this.dispatchEvent(
      new CustomEvent("tooltip-shown", {
        bubbles: true,
        detail: {
          badge: this,
          content: this._speechBubble.innerHTML,
        },
      })
    );
  }

  /**
   * Hides the speech bubble
   */
  hideSpeechBubble() {
    if (!this._speechBubbleVisible || !this._speechBubble) return;

    this._speechBubbleVisible = false;
    this._speechBubble.classList.remove("show");
    this._speechBubble.setAttribute("aria-hidden", "true");

    // Fire tooltip-hidden event
    this.dispatchEvent(
      new CustomEvent("tooltip-hidden", {
        bubbles: true,
        detail: { badge: this },
      })
    );
  }

  /**
   * Gets the expiry date of the badge
   * @returns {Date|null} Expiry date or null if not set
   */
  getExpiryDate() {
    const expiryDate = this.getAttribute("expires");
    if (!expiryDate) return null;

    const expiry = new Date(expiryDate);
    return isNaN(expiry.getTime()) ? null : expiry;
  }

  /**
   * Sets the expiry date of the badge
   * @param {string|Date} date - The expiry date
   */
  setExpiryDate(date) {
    if (date instanceof Date) {
      this.setAttribute("expires", date.toISOString().split("T")[0]);
    } else {
      this.setAttribute("expires", date);
    }
  }

  /**
   * Gets the content of the speech bubble
   * @returns {string} HTML content
   */
  getContent() {
    return this._speechBubble ? this._speechBubble.innerHTML : "";
  }

  /**
   * Sets the content of the speech bubble
   * @param {string} content - HTML content
   */
  setContent(content) {
    if (this._speechBubble) {
      this._speechBubble.innerHTML = content;
    }
  }

  /**
   * Checks if the speech bubble is currently visible
   * @returns {boolean} True if visible
   */
  isSpeechBubbleVisible() {
    return this._speechBubbleVisible;
  }

  /**
   * Manually shows the badge (useful for testing)
   */
  show() {
    this.style.display = "inline-block";
    this._isVisible = true;

    this.dispatchEvent(
      new CustomEvent("badge-shown", {
        bubbles: true,
        detail: { badge: this, manual: true },
      })
    );
  }

  /**
   * Manually hides the badge
   */
  hide() {
    this.style.display = "none";
    this._isVisible = false;
    this.hideSpeechBubble();

    this.dispatchEvent(
      new CustomEvent("badge-hidden", {
        bubbles: true,
        detail: { badge: this, manual: true },
      })
    );
  }

  // --- STATIC METHODS ---

  /**
   * Creates a new badge programmatically
   * @param {string} content - HTML content for speech bubble
   * @param {string} [expires] - Expiry date (YYYY-MM-DD format)
   * @returns {NetsiNew} New badge instance
   */
  static create(content, expires = null) {
    const badge = new NetsiNew();
    badge.innerHTML = content;

    if (expires) {
      badge.setAttribute("expires", expires);
    }

    return badge;
  }

  /**
   * Removes all expired badges from the document
   * @returns {number} Number of badges removed
   */
  static cleanupExpired() {
    const badges = document.querySelectorAll("netsi-new");
    let removed = 0;

    badges.forEach((badge) => {
      if (!badge.checkExpiry()) {
        badge.expire();
        removed++;
      }
    });

    return removed;
  }

  /**
   * Gets all active badges in the document
   * @returns {NodeList} List of all badge elements
   */
  static getAllBadges() {
    return document.querySelectorAll("netsi-new");
  }
}

/**
 * Custom modal component with comprehensive API
 *
 * @example
 * const modal = new NetsiModal();
 * modal.title = 'My Modal';
 * modal.innerHTML = '<p>Modal content here</p>';
 * modal.show();
 */
class NetsiModal extends HTMLElement {
  constructor() {
    super();
    this._isVisible = false;
    this._backdrop = null;
    this._modalContent = null;
    this._titleElement = null;
    this._closeButton = null;
  }

  connectedCallback() {
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.setAttribute("aria-hidden", "true");

    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" style="display: none;">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 class="text-xl font-bold text-gray-800">${
              this.getAttribute("title") || "Modal"
            }</h2>
            <button class="text-gray-400 hover:text-gray-600 text-2xl font-bold" aria-label="Close modal">&times;</button>
          </div>
          <div class="p-6">
            <slot></slot>
          </div>
        </div>
      </div>
    `;

    this._backdrop = this.querySelector("div");
    this._modalContent = this._backdrop.querySelector("div");
    this._titleElement = this._backdrop.querySelector("h2");
    this._closeButton = this._backdrop.querySelector("button");

    // Ensure slot content is properly assigned
    this._slot = this.querySelector("slot");
  }

  attachEventListeners() {
    this._closeButton.addEventListener("click", () => this.hide());
    this._backdrop.addEventListener("click", (e) => {
      if (e.target === this._backdrop) {
        this.hide();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this._isVisible) {
        this.hide();
      }
    });
  }

  detachEventListeners() {
    // Event listeners will be cleaned up automatically
  }

  show() {
    this._isVisible = true;
    this._backdrop.style.display = "flex";
    this.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    this.dispatchEvent(
      new CustomEvent("modal-shown", {
        bubbles: true,
        detail: { modal: this },
      })
    );
  }

  hide() {
    this._isVisible = false;
    this._backdrop.style.display = "none";
    this.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";

    this.dispatchEvent(
      new CustomEvent("modal-hidden", {
        bubbles: true,
        detail: { modal: this },
      })
    );
  }

  get title() {
    return this.getAttribute("title") || "";
  }

  set title(value) {
    this.setAttribute("title", value);
    if (this._titleElement) {
      this._titleElement.textContent = value;
    }
  }

  get isVisible() {
    return this._isVisible;
  }
}

// Register custom elements
customElements.define("netsi-new", NetsiNew);
customElements.define("netsi-tab", NetsiTab);
customElements.define("netsi-tab-content", NetsiTabContent);
customElements.define("netsi-modal", NetsiModal); 