// [Reference] https://yogjin.tistory.com/121

const LOCATION_KEYS = {
  all: ['locations'] as const,

  lists: () => [...LOCATION_KEYS.all, 'list'] as const, // ["locations", "list"]
  list: (filters: object) => [...LOCATION_KEYS.lists(), {filters}] as const, // ["locations", "list", "..."]

  details: () => [...LOCATION_KEYS.all, 'detail'] as const, // ["locations", "detail"]
  detail: (id: string) => [...LOCATION_KEYS.details(), id] as const, // ["locations", "detail", "id"]
};

const CATEGORY_KEYS = {
  all: ['categories'] as const,

  lists: () => [...CATEGORY_KEYS.all, 'list'] as const, // ["categories", "list"]
  list: (filters: object) => [...CATEGORY_KEYS.lists(), {filters}] as const, // ["categories", "list", {filters}]
};

const WEATHER_KEYS = {
  all: ['weathers'] as const,

  details: () => [...WEATHER_KEYS.all, 'detail'] as const, // ["weathers", "detail"]
  detail: (location: {x: string; y: string}) =>
    [...WEATHER_KEYS.details(), {x: location.x, y: location.y}] as const, // ["weathers", "detail", {x: "x", y: "y"}]
};

const TOUR_KEYS = {
  all: ['tours'] as const,

  details: () => [...TOUR_KEYS.all, 'detail'] as const, // ["tours", "detail"]
  detail: (location: {x: string; y: string}) =>
    [...TOUR_KEYS.details(), {x: location.x, y: location.y}] as const, // ["tours", "detail", {x: "x", y: "y"}]
};

export {LOCATION_KEYS, CATEGORY_KEYS, WEATHER_KEYS, TOUR_KEYS};
