import { SignInPage } from '../../pages/auth/SignInPage';
import { HomePage } from '../../pages/HomePage';
import { testStep } from '../../../common/helpers/pw';

export async function signInUser(page, user, userId = 0) {
  await testStep(
    `Sign in user`,
    async () => {
      const signInPage = new SignInPage(page, userId);
      const homePage = new HomePage(page, userId);

      await signInPage.open();
      await signInPage.fillEmailField(user.email);
      await signInPage.fillPasswordField(user.password);
      await signInPage.clickSignInButton();

      await homePage.assertYourFeedTabIsVisible();
    },
    userId,
  );
}
