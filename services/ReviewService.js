const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing review data
 */
class ReviewService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the review data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get all review items
   */
  async getList() {
    const data = await this.getData();
    return data;
  }

  /**
   * Add a new review item
   * @param {*} name The name of the user
   * @param {*} title The title of the review message
   * @param {*} message The review message
   */
  async addEntry(name, email, title, message) {
    const data = (await this.getData()) || [];
    data.unshift({ name, email, title, message });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * Fetches review data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = ReviewService;
