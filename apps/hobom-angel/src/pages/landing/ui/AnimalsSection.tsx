import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { AnimalCard } from "@/entities/animal";
import { ANIMALS, ANIMAL_FILTERS } from "../model/landing.fixtures";
import { styles } from "./AnimalsSection.styles";

export const AnimalsSection = () => (
  <section {...stylex.props(styles.section)} id="adopt">
    <div {...stylex.props(styles.inner)}>
      <header {...stylex.props(styles.head)}>
        <h2 {...stylex.props(styles.title)}>지금 만날 수 있는 친구들</h2>
        <div {...stylex.props(styles.filters)}>
          {ANIMAL_FILTERS.map((filter, index) => (
            <Hb.Chip
              key={filter}
              size="small"
              variant={index === 0 ? "soft" : "outlined"}
              color={index === 0 ? "primary" : "default"}
            >
              {filter}
            </Hb.Chip>
          ))}
        </div>
      </header>
      <div {...stylex.props(styles.grid)}>
        {ANIMALS.map((animal) => (
          <AnimalCard key={animal.name} name={animal.name} status={animal.status} meta={animal.meta} />
        ))}
      </div>
    </div>
  </section>
);
