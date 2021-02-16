import { createSelector } from 'reselect';

const shopSelector = state => state.shop;

export const shopSelectorCollections = createSelector(
    [shopSelector],
    shop => shop.collections
);