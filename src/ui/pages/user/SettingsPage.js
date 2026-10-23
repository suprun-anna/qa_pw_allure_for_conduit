import { testStep } from '../../../common/helpers/pw';
import { expect } from '@playwright/test';

export class SettingsPage {
  constructor(page, userId) {
    this.page = page;
    this.profilePictureUrlInput = page.getByPlaceholder('URL of profile picture');
    this.usernameInput = page.getByPlaceholder('Username');
    this.shortBioAboutYouInput = page.getByPlaceholder('Short bio about you');
    this.emailInput = page.getByPlaceholder('Email');
    this.newPasswordInput = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step('Open Settings Page', async () => {
      await this.page.goto('https://conduit.mate.academy/settings');
    });
  }

  async fillProfilePictureUrlInput(profilePictureUrl) {
    await this.step('Fill Profile Picture URL Input', async () => {
      await this.profilePictureUrlInput.fill(profilePictureUrl);
    });
  }

  async fillUsernameInput(username) {
    await this.step('Fill Username Input', async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillShortBioAboutYouInput(shortBioAboutYou) {
    await this.step('Fill Short Bio About You Input', async () => {
      await this.shortBioAboutYouInput.fill(shortBioAboutYou);
    });
  }

  async fillEmailInput(email) {
    await this.step('Fill Email Input', async () => {
      await this.emailInput.fill(email);
    });
  }

  async fillNewPasswordInput(newPassword) {
    await this.step('Fill New Password Input', async () => {
      await this.newPasswordInput.fill(newPassword);
    });
  }

  async clickUpdateSettingsButton() {
    await this.step('Click Update Settings Button', async () => {
      await this.updateSettingsButton.click();
    });
  }

  async clickLogoutButton() {
    await this.step('Click the logout button', async () => {
      await this.logoutButton.click();
    });
  }

  async assertUsernameIsVisible(username) {
    await this.step('Assert Username Is Visible In Username Input', async () => {
      await expect(this.usernameInput).toHaveValue(username);
    });
  }

  async assertEmailIsVisible(email) {
    await this.step('Assert Email Is Visible In Email Input', async () => {
      await expect(this.emailInput).toHaveValue(email);
    });
  }

  async assertShortBioAboutYouIsVisible(shortBioAboutYou) {
    await this.step('Assert Old Short Bio About You Is Visible In Short Bio About You Input', async () => {
      await expect(this.shortBioAboutYouInput).toHaveValue(shortBioAboutYou);
    });
  }

  async assertProfilePictureUrlInputIsVisible(profilePictureUrl) {
    await this.step('Assert Profile Picture URL Input Is Visible', async () => {
      await expect(this.profilePictureUrlInput).toHaveValue(profilePictureUrl);
    });
  }

  async assertPasswordIsNotVisible() {
    await this.step('Assert Password Is Not Visible In Password Input', async () => {
      await expect(this.newPasswordInput).toHaveValue('');
    });
  }
}