import confetti from "canvas-confetti";

export const runConfetti = () => {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

/**
 * Formats a tag string into a display-friendly format
 * @param {string} tag - The raw tag string (e.g. "formal traditional fusion")
 * @returns {string} - Formatted tag string (e.g. "Formal • Traditional • Fusion")
 */
export const formatTags = (tag) => {
  if (!tag) return "";

  return tag
    .split(" ")
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" • ");
};

/**
 * Formats price number with commas for thousands
 * @param {number} price - The price number
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Gets the primary category from a tag string
 * @param {string} tag - The raw tag string
 * @returns {string} - The first tag as category
 */
export const getPrimaryCategory = (tag) => {
  if (!tag) return "";

  return tag.split(" ")[0];
};

/**
 * Truncates a string to specified length with ellipsis
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated string
 */
export const truncateString = (str, length = 50) => {
  if (!str) return "";

  if (str.length <= length) return str;

  return str.substring(0, length) + "...";
};
