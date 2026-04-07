const postCreateMock = vi.fn();
const putUpdateMock = vi.fn();
const deleteMock = vi.fn();

vi.mock("./notification-template.api", () => ({
  postCreateNotificationTemplate: (...args: unknown[]) => postCreateMock(...args),
  putUpdateNotificationTemplate: (...args: unknown[]) => putUpdateMock(...args),
  deleteNotificationTemplate: (...args: unknown[]) => deleteMock(...args),
}));

const { notificationTemplateMutations } = await import("./notification-template.mutations");

describe("notificationTemplateMutations", () => {
  describe("mutationKey structure", () => {
    it("all() returns base key", () => {
      expect(notificationTemplateMutations.all()).toEqual(["notification-templates"]);
    });

    it("create() key extends base", () => {
      expect(notificationTemplateMutations.create().mutationKey).toEqual([
        "notification-templates",
        "create",
      ]);
    });

    it("update() key extends base", () => {
      expect(notificationTemplateMutations.update().mutationKey).toEqual([
        "notification-templates",
        "update",
      ]);
    });

    it("delete() key extends base", () => {
      expect(notificationTemplateMutations.delete().mutationKey).toEqual([
        "notification-templates",
        "delete",
      ]);
    });
  });

  describe("mutationFn delegation", () => {
    it("create delegates to postCreateNotificationTemplate", () => {
      const data = {
        templateKey: "test",
        titleTemplate: "title",
        bodyTemplate: "body",
        channel: "Push" as const,
      };

      notificationTemplateMutations.create().mutationFn(data);

      expect(postCreateMock).toHaveBeenCalledWith(data);
    });

    it("update delegates to putUpdateNotificationTemplate", () => {
      const data = {
        id: "123",
        templateKey: "test",
        titleTemplate: "title",
        bodyTemplate: "body",
        channel: "InApp" as const,
      };

      notificationTemplateMutations.update().mutationFn(data);

      expect(putUpdateMock).toHaveBeenCalledWith(data);
    });

    it("delete delegates to deleteNotificationTemplate", () => {
      notificationTemplateMutations.delete().mutationFn("id-to-delete");

      expect(deleteMock).toHaveBeenCalledWith("id-to-delete");
    });
  });
});
