import { Suspense, useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import {
  ADDRESS_VISIBILITY_LABEL,
  FACILITY_PHOTO_KIND_LABEL,
  SIGNAL_LABEL,
  SIGNAL_STATUS_COLOR,
  SIGNAL_STATUS_LABEL,
  shelterQueries,
} from "@/entities/shelter";
import { ErrorBoundary, LoadingState } from "@/shared/ui";
import { styles } from "./ShelterVerificationDialog.styles";

interface ShelterVerificationDialogProps {
  shelterId: string;
  deciding: boolean;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onClose: () => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div {...stylex.props(styles.row)}>
    <span {...stylex.props(styles.rowKey)}>{label}</span>
    <span {...stylex.props(styles.rowValue)}>{value}</span>
  </div>
);

/** The dossier body — loads the shelter's submitted registration and renders it
 *  for review. Suspends on the fetch. */
const Dossier = ({ shelterId }: { shelterId: string }) => {
  const { data } = useSuspenseQuery(shelterQueries.verification(shelterId));

  const address = [data.address.region, data.address.city, data.address.roadAddress]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...stylex.props(styles.body)}>
      <div {...stylex.props(styles.titleRow)}>
        <h2 {...stylex.props(styles.shelterName)}>{data.name}</h2>
        <Hb.Chip
          label={`/${data.slug}`}
          size="small"
          variant="soft"
          color="default"
        />
      </div>

      <div {...stylex.props(styles.section)}>
        <span {...stylex.props(styles.sectionLabel)}>제출 정보</span>
        <div {...stylex.props(styles.rows)}>
          <Row label="주소" value={address} />
          <Row label="공개 범위" value={ADDRESS_VISIBILITY_LABEL[data.addressVisibility]} />
          <Row label="등록번호" value={data.registrationNumber ?? "미입력"} />
          <Row label="사업자번호" value={data.businessNumber ?? "미입력"} />
          <Row label="대표자" value={data.registrant?.nickname ?? "알 수 없음"} />
        </div>
      </div>

      <div {...stylex.props(styles.section)}>
        <span {...stylex.props(styles.sectionLabel)}>자동 검증</span>
        {data.verificationSignals && data.verificationSignals.length > 0 ? (
          <div {...stylex.props(styles.signals)}>
            {data.verificationSignals.map((signal) => (
              <span key={signal.key} {...stylex.props(styles.signal)}>
                <span {...stylex.props(styles.signalKey)}>
                  {SIGNAL_LABEL[signal.key] ?? signal.key}
                </span>
                <Hb.Chip
                  label={SIGNAL_STATUS_LABEL[signal.status]}
                  size="small"
                  variant="soft"
                  color={SIGNAL_STATUS_COLOR[signal.status]}
                />
              </span>
            ))}
          </div>
        ) : (
          <span {...stylex.props(styles.muted)}>자동 검증이 수행되지 않았어요. 수동으로 확인해주세요.</span>
        )}
      </div>

      {data.facilityPhotos.length > 0 && (
        <div {...stylex.props(styles.section)}>
          <span {...stylex.props(styles.sectionLabel)}>시설 사진</span>
          <div {...stylex.props(styles.photos)}>
            {data.facilityPhotos.map((photo, index) => (
              <div key={`${photo.url}-${index}`} {...stylex.props(styles.photo)}>
                <img
                  src={photo.url}
                  alt={photo.caption ?? FACILITY_PHOTO_KIND_LABEL[photo.kind]}
                  {...stylex.props(styles.photoImg)}
                />
                <span {...stylex.props(styles.photoKind)}>
                  {FACILITY_PHOTO_KIND_LABEL[photo.kind]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.rejectionReason && (
        <div {...stylex.props(styles.rejection)}>
          <span {...stylex.props(styles.sectionLabel)}>이전 반려 사유</span>
          <span {...stylex.props(styles.muted)}>{data.rejectionReason}</span>
        </div>
      )}
    </div>
  );
};

/** §09 보호소 검증 심사 — reviews a pending shelter's dossier, then approves or
 *  rejects (reject requires a reason). */
export const ShelterVerificationDialog = ({
  shelterId,
  deciding,
  onApprove,
  onReject,
  onClose,
}: ShelterVerificationDialogProps) => {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const canReject = reason.trim().length > 0;

  return (
    <Hb.Dialog.Root open onClose={onClose} size="sm">
      <Hb.Dialog.Title>보호소 검증 심사</Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <ErrorBoundary
          fallback={() => (
            <p {...stylex.props(styles.muted)}>
              보호소 정보를 불러올 수 없어요. 그래도 승인·반려는 진행할 수 있어요.
            </p>
          )}
        >
          <Suspense fallback={<LoadingState />}>
            <Dossier shelterId={shelterId} />
          </Suspense>
        </ErrorBoundary>
        {rejecting && (
          <Hb.TextField
            label="반려 사유"
            placeholder="반려 사유를 입력하세요"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            multiline
            minRows={2}
            fullWidth
            autoFocus
            style={{ marginTop: 16 }}
          />
        )}
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        {rejecting ? (
          <>
            <Hb.Button variant="ghost" onClick={() => setRejecting(false)} disabled={deciding}>
              취소
            </Hb.Button>
            <Hb.Button
              variant="danger"
              onClick={() => onReject(reason.trim())}
              disabled={!canReject || deciding}
            >
              반려 확정
            </Hb.Button>
          </>
        ) : (
          <>
            <Hb.Button variant="ghost" onClick={() => setRejecting(true)} disabled={deciding}>
              반려
            </Hb.Button>
            <Hb.Button variant="primary" onClick={onApprove} disabled={deciding}>
              승인
            </Hb.Button>
          </>
        )}
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
