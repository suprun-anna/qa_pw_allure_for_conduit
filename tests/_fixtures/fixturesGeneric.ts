import { rmSync } from 'fs';
import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

export const test = base.extend<
  {
    usersNumber;
    contextsNumber;
    pages;
    user;
    users;
    infoTestLog;
    addAllureTestHierarchy;
  },
  {
    logger;
    deleteAllureResults;
  }
>({
  usersNumber: [1, { option: true }],
  contextsNumber: [1, { option: true }],
  pages: async ({ browser, contextsNumber }, use) => {
    let pages = Array(contextsNumber);

    for (let i = 0; i < contextsNumber; i++) {
      const context = await browser.newContext();

      pages[i] = await context.newPage();
    }
    await use(pages);
  },
  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);

    await use(user);
  },
  users: async ({ logger, usersNumber }, use) => {
    const users = Array(usersNumber);

    for (let i = 0; i < usersNumber; i++) {
      users[i] = generateNewUserData(logger);
    }

    await use(users);
  },
  logger: [
    async ({ }, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  deleteAllureResults: [
    async ({}, use) => {
      rmSync('allure-results', { recursive: true, force: true });

      await use();
    },
    { scope: 'worker', auto: true },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const normalized = testInfo.file.replaceAll('\\', '/');
      const indexOfTestSubfolderStart = normalized.indexOf('/tests') + 7;
      const fileName = normalized.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file;

      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);
      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
});
