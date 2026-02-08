const createSummary = (content) => {
    if (!content) return "";
    // Basic logic: Get first 150 characters without cutting a word
    const limit = 150;
    if (content.length <= limit) return content;
    return content.substring(0, content.lastIndexOf(' ', limit)) + "...";
};

module.exports = { createSummary };