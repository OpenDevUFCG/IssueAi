// @flow

export const SortField = {
    STARS_ASC: 'stars-asc',
    STARS_DESC: 'stars-desc',
};

export type SortFieldOption = $Values<typeof SortField>;

export default { SortField };
