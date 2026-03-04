import { sanitizeHtml } from "./sanitize-html.lib";

describe("sanitizeHtml", () => {
  it("keeps allowed tags intact", () => {
    const html = "<p>hello <strong>world</strong></p>";
    expect(sanitizeHtml(html)).toBe(html);
  });

  it("preserves anchor tags with href", () => {
    const html = '<a href="https://example.com">link</a>';
    expect(sanitizeHtml(html)).toBe(html);
  });

  it("strips script tags", () => {
    const html = '<p>safe</p><script>alert("xss")</script>';
    expect(sanitizeHtml(html)).toBe("<p>safe</p>");
  });

  it("strips event handler attributes", () => {
    const html = '<p onclick="alert(1)">click me</p>';
    expect(sanitizeHtml(html)).toBe("<p>click me</p>");
  });

  it("strips onerror on img tags (img not allowed)", () => {
    const html = '<img src="x" onerror="alert(1)" />';
    expect(sanitizeHtml(html)).toBe("");
  });

  it("strips javascript: protocol in href", () => {
    // eslint-disable-next-line no-script-url
    const html = '<a href="javascript:alert(1)">click</a>';
    expect(sanitizeHtml(html)).toBe("<a>click</a>");
  });

  it("strips iframe tags", () => {
    const html = '<iframe src="https://evil.com"></iframe>';
    expect(sanitizeHtml(html)).toBe("");
  });

  it("strips data attributes", () => {
    const html = '<p data-custom="value">text</p>';
    expect(sanitizeHtml(html)).toBe("<p>text</p>");
  });

  it("strips style attribute", () => {
    const html = '<p style="color:red">text</p>';
    expect(sanitizeHtml(html)).toBe("<p>text</p>");
  });

  it("keeps heading and list tags", () => {
    const html = "<h1>title</h1><ul><li>item</li></ul>";
    expect(sanitizeHtml(html)).toBe(html);
  });

  it("keeps code and pre tags", () => {
    const html = "<pre><code>const x = 1;</code></pre>";
    expect(sanitizeHtml(html)).toBe(html);
  });

  it("strips class attribute", () => {
    const html = '<p class="malicious-class">text</p>';
    expect(sanitizeHtml(html)).toBe("<p>text</p>");
  });

  it("handles empty string", () => {
    expect(sanitizeHtml("")).toBe("");
  });
});
