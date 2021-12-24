import { constants } from './../config/constants.js';

export const pagination = (req) => {

    // Default pagination data
    let pageData = {
        limit: constants.PAGE_SIZE, 
        offset: constants.INITIAL_PAGE - 1,
        page: constants.INITIAL_PAGE
    };

    let  pageSize   = Number.parseInt(req.query.page_size);
    let  page       = Number.parseInt(req.query.page);
    
    if(!Number.isNaN(pageSize) && pageSize > 0 && pageSize <= constants.PAGE_SIZE) {
        pageData.limit = pageSize;
    }

    if(!Number.isNaN(page) && page > 0) {
        pageData.offset = pageData.limit * (page - 1);
        pageData.page = page;
    }

    return pageData;
};


export const paginateOptions = (req, sortByObj) => {
    const paginationData = pagination(req);
    return {
        page: paginationData.page,
        limit: paginationData.limit,
        sort: sortByObj,
        customLabels: {
            totalDocs: 'count',
            docs: 'users',
            limit: 'page_size',
            page: 'current_page',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'page_count',
            hasPrevPage: 'has_prev_page',
            hasNextPage: 'has_next_page',
            pagingCounter: false
        }
    };
};