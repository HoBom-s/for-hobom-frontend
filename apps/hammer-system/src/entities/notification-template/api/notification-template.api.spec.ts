const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockDelete = vi.fn();

vi.mock("@/shared/api", () => ({
  supportHttpClient: {
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
    put: (...args: unknown[]) => mockPut(...args),
    delete: (...args: unknown[]) => mockDelete(...args),
  },
}));

const {
  fetchNotificationTemplates,
  fetchNotificationTemplate,
  postCreateNotificationTemplate,
  putUpdateNotificationTemplate,
  deleteNotificationTemplate,
} = await import("./notification-template.api");

describe("notification-template API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchNotificationTemplates calls GET /api/notification-templates", () => {
    fetchNotificationTemplates();

    expect(mockGet).toHaveBeenCalledWith("/api/notification-templates");
  });

  it("fetchNotificationTemplate calls GET /api/notification-templates/:id", () => {
    fetchNotificationTemplate("tmpl-123");

    expect(mockGet).toHaveBeenCalledWith("/api/notification-templates/tmpl-123");
  });

  it("postCreateNotificationTemplate calls POST /api/notification-templates with body", () => {
    const data = {
      templateKey: "auction_new",
      titleTemplate: "New Auction",
      bodyTemplate: "Body",
      channel: "Push" as const,
    };

    postCreateNotificationTemplate(data);

    expect(mockPost).toHaveBeenCalledWith("/api/notification-templates", data);
  });

  it("putUpdateNotificationTemplate calls PUT /api/notification-templates/:id with body", () => {
    const payload = {
      id: "tmpl-456",
      templateKey: "auction_updated",
      titleTemplate: "Updated",
      bodyTemplate: "Updated Body",
      channel: "Both" as const,
    };

    putUpdateNotificationTemplate(payload);

    expect(mockPut).toHaveBeenCalledWith("/api/notification-templates/tmpl-456", {
      templateKey: "auction_updated",
      titleTemplate: "Updated",
      bodyTemplate: "Updated Body",
      channel: "Both",
    });
  });

  it("deleteNotificationTemplate calls DELETE /api/notification-templates/:id", () => {
    deleteNotificationTemplate("tmpl-789");

    expect(mockDelete).toHaveBeenCalledWith("/api/notification-templates/tmpl-789");
  });
});
