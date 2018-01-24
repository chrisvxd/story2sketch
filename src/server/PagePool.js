/* eslint-disable no-console */

const qler = require("qler");

export default class PagePool {
  constructor(browser, numPages) {
    this.numPages = numPages;
    this.browser = browser;

    this.freePages = [];
    this.qler = qler(numPages);

    this.fns = [];
    this.numExecuted = 0;
  }

  async init() {
    for (let i = 0; i < this.numPages; i++) {
      this.freePages.push(await this.browser.newPage());
    }
  }

  finishCheck() {
    this.numExecuted += 1;

    return this.numExecuted === this.fns.length;
  }

  queue(fn) {
    this.fns.push(() => {
      const page = this.freePages[0];

      this.freePages.splice(0, 1);

      return fn(page)
        .then(() => {
          this.freePages.push(page);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  execute() {
    return new Promise(resolve => {
      for (let i = 0; i < this.fns.length; i++) {
        const fn = this.fns[i];

        this.qler.queue(releaseQueue => {
          fn()
            .then(() => {
              releaseQueue();

              if (this.finishCheck()) {
                resolve();
              }
            })
            .catch(error => {
              console.error(error);
            });
        });
      }
    });
  }

  reset() {
    this.numExecuted = 0;
    this.fns = [];
  }
}
