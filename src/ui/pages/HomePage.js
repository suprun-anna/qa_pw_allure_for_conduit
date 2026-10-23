import { expect, testStep } from '../../common/helpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  async open() {
    await this.step(`Open the home page`, async () => {
      await this.page.goto('/');
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertSignInLinkIsVisible() {
    await this.step(`Assert the 'Sign in' link is visible`, async () => {
      await expect(this.signInLink).toBeVisible();
    });
  }
}
