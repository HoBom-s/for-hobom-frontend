const fetchNotificationTemplatesMock = vi.fn();

vi.mock("./notification-template.api", () => ({
  fetchNotificationTemplates: (...args: unknown[]) => fetchNotificationTemplatesMock(...args),
}));

const { notificationTemplateQueries } = await import("./notification-template.queries");

describe("notificationTemplateQueries", () => {
  describe("queryKey structure", () => {
    it("all() returns base key", () => {
      expect(notificationTemplateQueries.all()).toEqual(["notification-templates"]);
    });

    it("list() includes 'list' in key", () => {
      const opts = notificationTemplateQueries.list();

      expect(opts.queryKey).toEqual(["notification-templates", "list"]);
    });
  });

  describe("queryFn delegation", () => {
    it("list queryFn calls fetchNotificationTemplates", () => {
      const opts = notificationTemplateQueries.list();

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchNotificationTemplatesMock).toHaveBeenCalled();
    });
  });

  describe("staleTime configuration", () => {
    it("list has 5min staleTime (SLOW)", () => {
      expect(notificationTemplateQueries.list().staleTime).toBe(300_000);
    });
  });
});
