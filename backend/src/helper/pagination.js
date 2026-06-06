const setPagination = (page, perPage) => {
    const limit = perPage ? +perPage : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPaginatedData = (list, page, limit) => {
    const { count: totalRecord, rows: data } = list;
    const currentPage = page ? +page : 0;
    const totalPage = Math.ceil(totalRecord / limit);
    const perPage = limit;
    return {
        perPage,
        totalRecord,
        totalPage,
        currentPage,
        data
    };
};

module.exports = {
    setPagination,
    getPaginatedData
};

