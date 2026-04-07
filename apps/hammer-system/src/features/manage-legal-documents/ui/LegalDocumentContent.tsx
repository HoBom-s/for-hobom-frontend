import { useState } from "react";
import { AddOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { useLegalDocumentList } from "../model/useLegalDocumentList";
import { LegalDocumentCard } from "./LegalDocumentCard";
import { LegalDocumentFormDialog } from "./LegalDocumentFormDialog";

export const LegalDocumentContent = () => {
  const { terms, privacy } = useLegalDocumentList();
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  return (
    <>
      <Hb.Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Hb.Button
          variant="primary"
          startIcon={<AddOutlined />}
          onClick={() => setFormDialogOpen(true)}
        >
          새 버전 등록
        </Hb.Button>
      </Hb.Box>

      <Hb.Stack spacing={3}>
        <LegalDocumentCard title="이용약관 (Terms of Service)" document={terms} />
        <LegalDocumentCard title="개인정보처리방침 (Privacy Policy)" document={privacy} />
      </Hb.Stack>

      <LegalDocumentFormDialog open={formDialogOpen} onClose={() => setFormDialogOpen(false)} />
    </>
  );
};
