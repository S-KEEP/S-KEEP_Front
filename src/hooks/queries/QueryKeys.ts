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

const FRIEND_LOCATION_KEYS = {
  all: ['locations'] as const,

  details: () => [...FRIEND_LOCATION_KEYS.all, 'detail'] as const, // ["locations", "detail"]
  detail: (id: string) => [...FRIEND_LOCATION_KEYS.details(), id] as const, // ["locations", "detail", "id"]
};

const FRIEND_KEYS = {
  all: ['friends'] as const,

  lists: () => [...FRIEND_KEYS.all, 'list'] as const, // ["friends", "list"]
  list: (filters: object) => [...FRIEND_KEYS.lists(), {filters}] as const, // ["friends", "list", "..."]

  details: () => [...FRIEND_KEYS.all, 'detail'] as const, // ["friends", "detail"]
  detail: (id: string) => [...FRIEND_KEYS.details(), id] as const, // ["friends", "detail", "id"]
};

const FRIEND_DETAIL_KEYS = {
  all: ['friendsDetail'] as const,

  lists: () => [...FRIEND_DETAIL_KEYS.all, 'list'] as const, // ["friends", "list"]
  list: (filters: object) =>
    [...FRIEND_DETAIL_KEYS.lists(), {filters}] as const, // ["friends", "list", "..."]

  details: () => [...FRIEND_DETAIL_KEYS.all, 'detail'] as const, // ["friends", "detail"]
  detail: (id: string) => [...FRIEND_DETAIL_KEYS.details(), id] as const, // ["friends", "detail", "id"]
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

const NOTIFICATION_KEYS = {
  all: ['notifications'] as const,

  lists: () => [...NOTIFICATION_KEYS.all, 'list'] as const, // ["notifications", "list"]
  list: (filters: object) => [...NOTIFICATION_KEYS.lists(), {filters}] as const, // ["notifications", "list", "..."]

  details: () => [...NOTIFICATION_KEYS.all, 'detail'] as const, // ["notifications", "detail"]
  detail: (id: string) => [...NOTIFICATION_KEYS.details(), id] as const, // ["notifications", "detail", "id"]
};


export {
  LOCATION_KEYS,
  CATEGORY_KEYS,
  WEATHER_KEYS,
  TOUR_KEYS,
  NOTIFICATION_KEYS,
  FRIEND_KEYS,
  FRIEND_DETAIL_KEYS,
  FRIEND_LOCATION_KEYS,
};
