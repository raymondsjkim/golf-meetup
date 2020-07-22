const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching golfers information
 */
class GolferService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the golfers data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of golfers name and short name
   */
  async getNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((golfer) => {
      return { name: golfer.name, shortname: golfer.shortname };
    });
  }

  /**
   * Get all scorecard
   */
  async getAllScorecard() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all golfers and
    // create an array that contains all scorecard
    const scorecard = data.reduce((acc, elm) => {
      if (elm.scorecard) {
        // eslint-disable-next-line no-param-reassign
        acc = [...acc, ...elm.scorecard];
      }
      return acc;
    }, []);
    return scorecard;
  }

  /**
   * Get all scorecard of a given golfer
   * @param {*} shortname The golfers short name
   */
  async getScorecardForSpeaker(shortname) {
    const data = await this.getData();
    const golfer = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!golfer || !golfer.scorecard) return null;
    return golfer.scorecard;
  }

  /**
   * Get golfer information provided a shortname
   * @param {*} shortname
   */
  async getGolfer(shortname) {
    const data = await this.getData();
    const golfer = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!golfer) return null;
    return {
      title: golfer.title,
      name: golfer.name,
      shortname: golfer.shortname,
      description: golfer.description,
    };
  }

  /**
   * Returns a list of golfers with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map((golfer) => {
      return {
        name: golfer.name,
        shortname: golfer.shortname,
        title: golfer.title,
      };
    });
  }

  /**
   * Get a list of golfers
   */
  async getList() {
    const data = await this.getData();
    return data.map((golfer) => {
      return {
        name: golfer.name,
        shortname: golfer.shortname,
        title: golfer.title,
        summary: golfer.summary,
      };
    });
  }

  /**
   * Fetches golfers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).golfers;
  }
}

module.exports = GolferService;
