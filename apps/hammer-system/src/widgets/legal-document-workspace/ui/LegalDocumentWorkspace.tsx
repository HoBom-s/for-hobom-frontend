import { GavelOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { LegalDocumentContent } from "@/features/manage-legal-documents";

export const LegalDocumentWorkspace = () => {
  return (
    <Hb.Box sx={{ p: 3 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Hb.Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GavelOutlined sx={{ color: "#fff", fontSize: 22 }} />
        </Hb.Box>
        <Hb.Box>
          <Hb.Text variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            Legal Documents
          </Hb.Text>
          <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
            이용약관과 개인정보처리방침을 관리할 수 있어요.
          </Hb.Text>
        </Hb.Box>
      </Hb.Box>

      <LegalDocumentContent />
    </Hb.Box>
  );
};
