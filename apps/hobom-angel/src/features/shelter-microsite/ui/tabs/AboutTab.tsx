import { Link } from "react-router-dom";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { AnimalCard, STATUS_LABEL, animalMeta, animalQueries } from "@/entities/animal";
import { formatShelterAddress, operatingYears } from "@/entities/shelter";
import { ROUTES, animalDetailPath } from "@/shared/config";
import type { Shelter, ShelterStats } from "@/entities/shelter";
import { styles } from "./AboutTab.styles";

/** 소개 tab — greeting, stat cards, and an animal preview on the left; visit /
 *  support guidance and a volunteer CTA in the sidebar. Matches the §04 design. */
export const AboutTab = ({ shelter, stats }: { shelter: Shelter; stats: ShelterStats }) => {
  const { data: roster } = useSuspenseQuery(animalQueries.byShelter(shelter.id));
  const years = operatingYears(shelter.operatingSince, new Date());
  const preview = roster.slice(0, 4);

  const statItems = [
    { value: stats.adoptedCount.toLocaleString(), label: "누적 입양" },
    { value: stats.shelteredCount.toLocaleString(), label: "보호 중" },
    ...(years != null ? [{ value: `${years}년`, label: "운영" }] : []),
  ];

  return (
    <div {...stylex.props(styles.grid)}>
      <Hb.Stack spacing={3}>
        {shelter.facilityPhotos.length > 0 && (
          <Hb.Gallery
            images={shelter.facilityPhotos.map((photo) => ({
              src: photo.url,
              alt: photo.caption ?? `${shelter.name} 시설 사진`,
            }))}
            alt={`${shelter.name} 시설`}
            ratio="16 / 9"
          />
        )}

        {shelter.intro && (
          <Hb.SectionCard title="인사말">
            <Hb.Markdown>{shelter.intro}</Hb.Markdown>
          </Hb.SectionCard>
        )}

        <Hb.StatGroup.Root columns={statItems.length} variant="card">
          {statItems.map((item) => (
            <Hb.StatGroup.Item key={item.label} value={item.value} label={item.label} />
          ))}
        </Hb.StatGroup.Root>

        {preview.length > 0 && (
          <Hb.SectionCard
            title="우리 보호소 아이들"
            action={
              <Link to="?tab=animals" style={{ color: "inherit" }}>
                <Hb.Button size="small" variant="ghost">
                  전체 보기
                </Hb.Button>
              </Link>
            }
          >
            <div {...stylex.props(styles.preview)}>
              {preview.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  name={animal.name}
                  status={STATUS_LABEL[animal.status]}
                  meta={animalMeta(animal)}
                  imageUrl={animal.photoUrl}
                  to={animalDetailPath(animal.id)}
                />
              ))}
            </div>
          </Hb.SectionCard>
        )}
      </Hb.Stack>

      <Hb.SectionCard title="방문·후원 안내">
        <Hb.DescriptionList.Root layout="stacked">
          <Hb.DescriptionList.Item term="지역">
            {formatShelterAddress(shelter.address)}
          </Hb.DescriptionList.Item>
          <Hb.DescriptionList.Item term="문의">사이트 메시지로 연락</Hb.DescriptionList.Item>
        </Hb.DescriptionList.Root>
        {shelter.visitGuide && <Hb.Markdown>{shelter.visitGuide}</Hb.Markdown>}
        {shelter.supportGuide && <Hb.Markdown>{shelter.supportGuide}</Hb.Markdown>}
        <Link to={ROUTES.VOLUNTEER} style={{ textDecoration: "none" }}>
          <Hb.Button variant="primary" fullWidth>
            봉사 신청하기
          </Hb.Button>
        </Link>
      </Hb.SectionCard>
    </div>
  );
};
