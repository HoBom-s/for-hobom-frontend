import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import topology from "./korea-provinces.topo.json";
import type { GeometryCollection, Topology } from "topojson-specification";

/** Vendored South Korea province boundaries (KOSTAT 2018, simplified) from the
 *  public `southkorea/southkorea-maps` dataset. Projected once at import so the
 *  SVG just scales via its viewBox — no runtime sizing needed. */
const OBJECT_KEY = "skorea_provinces_2018_geo";

/** Internal projection resolution; the rendered SVG scales to fit its box. */
const VIEW = 800;

/** Extra room around the outline so marker labels above a pin aren't clipped. */
const PAD = 26;

const topo = topology as unknown as Topology;
const object = topo.objects[OBJECT_KEY] as GeometryCollection<{ name: string }>;
const collection = feature(topo, object);

const projection = geoMercator().fitSize([VIEW, VIEW], collection);
const path = geoPath(projection);

const [[minX, minY], [maxX, maxY]] = path.bounds(collection);

export interface KoreaProvince {
  name: string;
  d: string;
}

export interface KoreaMap {
  viewBox: string;
  provinces: KoreaProvince[];
  /** Project a lng/lat into the same space as the province paths. */
  project: (lng: number, lat: number) => [number, number] | null;
}

export const KOREA_MAP: KoreaMap = {
  viewBox: `${minX - PAD} ${minY - PAD} ${maxX - minX + PAD * 2} ${maxY - minY + PAD * 2}`,
  provinces: collection.features.map((f) => ({ name: f.properties.name, d: path(f) ?? "" })),
  project: (lng, lat) => {
    const point = projection([lng, lat]);

    return point ? [point[0], point[1]] : null;
  },
};
