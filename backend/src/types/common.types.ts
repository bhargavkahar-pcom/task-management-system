export const SORT_ORDER = ["asc", "desc"] as const;

export type SortOrder = (typeof SORT_ORDER)[number];
