
const inArray = (searchElement, array) => {
    return (array.find(element => element === searchElement) !== 'undefined');
};

export const sortingOptions = (req, sortableFields, defaultSortBy='updated_at', defaultOrderBy='-1') => {

    const { sort_by, sort_order } = req.query;

    let sortOptions = {};
    let sortOrder = '1';
    if(sort_order && (sort_order === '1' || sort_order === '-1')) {
        sortOrder = sort_order;
    }

    if(sort_by && inArray(sort_by, sortableFields)) {
        sortOptions[sort_by] = sortOrder;
    } else {
        sortOptions[defaultSortBy] = defaultOrderBy;
    }

    return sortOptions;
};


export const searchOptions = (req) => {
    const { search_keyword } = req.query;

    if(search_keyword && search_keyword.trim()) {
        return {$text: {$search: search_keyword.trim()}};
    }

    return false;
};