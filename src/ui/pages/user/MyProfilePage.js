import { expect, testStep } from '../../../common/helpers/pw';

export class MyProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.profileImage = page.getByRole('img', { name: "User's profile image" });
    this.usernameHeading = page.getByRole('heading', { level: 4 });
    this.bioParagraph = page.locator('h4 + p');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(username) {
    await this.step(`Open the my profile page`, async () => {
      await this.page.goto(`/profile/${username.toLowerCase()}`);
    });
  }

  async assertProfileImageHasSrc(src) {
    await this.step(`Assert the profile image src is '${src}'`, async () => {
      await expect(this.profileImage).toHaveAttribute('src', src);
    });
  }

  async assertUsernameIsVisible(username) {
    await this.step(`Assert the profile username is '${username}'`, async () => {
      await expect(this.usernameHeading).toHaveText(username.toLowerCase());
    });
  }

  async assertBioIsVisible(bio) {
    await this.step(`Assert the profile bio is '${bio}'`, async () => {
      await expect(this.bioParagraph).toHaveText(bio);
    });
  }
}
