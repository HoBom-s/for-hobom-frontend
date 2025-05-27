import type { BoundedRecord } from "./boundRecord.type";

export type ExactRecordType<Key extends PropertyKey, Value> = BoundedRecord<
  Record<Key, Value>,
  Partial<Record<Key, Value>>,
  Record<Key, Value>
>;
