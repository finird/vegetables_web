class APIFeatures {
  constructor(query, queryJSON) {
    this.query = query;
    this.queryJSON = queryJSON;
  }

  filter() {
    const queryObj = { ...this.queryJSON };
    const excluded = ['page', 'sort', 'limit', 'fields'];
    excluded.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => {
      return `$${match}`;
    });
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryJSON.sort) {
      const sortBy = this.queryJSON.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryJSON.fields) {
      const fields = this.queryJSON.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryJSON.page * 1 || 1;
    const limit = this.queryJSON.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
