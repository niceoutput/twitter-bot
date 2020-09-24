const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class Sheet {
  constructor(args) {
    this.doc = new GoogleSpreadsheet(
      "1xhU5lWmbL2bYJFfzo2Lk1r_mDSMsLQlHnZF5ytih3XA"
    );
  }
  async load() {
    // load directly from json file if not in secure environment
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    // loads document properties and worksheets
    await this.doc.loadInfo();
  }
  async getRows() {
    const sheet = this.doc.sheetsByIndex[0];
    return await sheet.getRows();
  }
};
