const createSummary = (content) => {
    if (!content) return "";
    const limit = 150;
    if (content.length <= limit) return content;
    return content.substring(0, content.lastIndexOf(' ', limit)) + "...";
};

module.exports = { createSummary };