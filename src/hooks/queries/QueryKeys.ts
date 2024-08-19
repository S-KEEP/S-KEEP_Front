// [Reference] https://yogjin.tistory.com/121

const LOCATION_KEYS = {
  all: ['locations'] as const,

  lists: () => [...LOCATION_KEYS.all, 'list'] as const, // ["locations", "list"]
  list: (filters: object) => [...LOCATION_KEYS.lists(), {filters}] as const, // ["locations", "list", "..."]

  details: () => [...LOCATION_KEYS.all, 'detail'] as const, // ["locations", "detail"]
  detail: (id: string) => [...LOCATION_KEYS.details(), id] as const, // ["locations", "detail", "id"]
};

export {LOCATION_KEYS};
