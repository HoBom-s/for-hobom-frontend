import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import { EmptyState, Hb } from "hobom-design-system";
import { ArticleOutlined, ExpandMore } from "hobom-design-system/icons";
import { shelterQueries } from "@/entities/shelter";
import type { ShelterFaq } from "@/entities/shelter";

const FaqItem = ({ faq }: { faq: ShelterFaq }) => {
  const [open, setOpen] = useState(false);

  return (
    <Hb.Accordion.Root expanded={open} onChange={(_, next) => setOpen(next)}>
      <Hb.Accordion.Summary expandIcon={<ExpandMore />}>{faq.question}</Hb.Accordion.Summary>
      <Hb.Accordion.Details>
        <Hb.Text variant="body2" color="text.secondary" style={{ whiteSpace: "pre-line" }}>
          {faq.answer}
        </Hb.Text>
      </Hb.Accordion.Details>
    </Hb.Accordion.Root>
  );
};

/** FAQ tab — each entry an independently toggled accordion. */
export const FaqTab = ({ shelterId }: { shelterId: string }) => {
  const { data } = useSuspenseQuery(shelterQueries.faqs(shelterId));

  if (data.length === 0) {
    return (
      <EmptyState
        icon={<ArticleOutlined style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />}
        message="등록된 FAQ가 없어요."
      />
    );
  }

  return (
    <Hb.Stack spacing={1}>
      {data.map((faq) => (
        <FaqItem key={faq.id} faq={faq} />
      ))}
    </Hb.Stack>
  );
};
