export const constants = {
    API_PREFIX: '/api', // API base URL with version
    PAGE_SIZE: 20, // No of records per page
    INITIAL_PAGE: 1,
    BULK_ACTIONS: {
        activate: 'active',
        deactivate: 'inactive',
        delete: 'delete'
    },
    USER_STATUS: {
        active: 'Active',
        inactive: 'Inactive',
        pending: 'Pending'
    },
    USER_ROLES: {
        ADMIN: 'admin',
        STAFF: 'staff',
        USER: 'user'
    }
};