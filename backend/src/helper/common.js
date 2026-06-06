const dataFilter = (req) => {
    const tempFilter = {};
    const {
        category,
        name,
        mobile,
        status,
        createdAt,
        rangeAt,
    } = req.query;

    if (req.parentId) {
        tempFilter.parent = req.parentId;
    }

    if (category) {
        tempFilter.category = category;
    }

    if (name) {
        tempFilter.name = {
            $regex: name,
            $options: 'i'
        };
    }

    if (mobile) {
        tempFilter.mobile = {
            $regex: mobile,
            $options: 'i'
        };
    }

    if (status) {
        tempFilter.status = status;
    }


    if (createdAt) {
        tempFilter.createdAt = {
            $gte: new Date(`${createdAt}T00:00:00Z`),
            $lte: new Date(`${createdAt}T23:59:59Z`)
        };
    }

    if (rangeAt) {
        const [start, end] = rangeAt.split(',');
        tempFilter.createdAt = {
            $gte: new Date(start),
            $lte: new Date(end)
        };
    }

    return tempFilter;
};

module.exports = {
    dataFilter
};
