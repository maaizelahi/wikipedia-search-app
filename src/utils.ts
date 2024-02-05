/**
 * Remove all HTML tags from wikipedia search snippet for security
 */
export function removeHtmlTagsExceptSearchMatch(inputString: string) {
  // Use a negative lookahead in the regular expression to exclude <span class="searchmatch">...</span> tags
  return inputString.replace(/<(?!\/?span(?:\s+[^>]*\s*)?>)[^>]*>/g, "");
}
