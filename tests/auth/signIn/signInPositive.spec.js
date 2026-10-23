import { test } from '../../_fixtures/fixtures';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { signInUser } from '../../../src/ui/actions/auth/signInUser';

let signInPage;
let homePage;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await signUpUser(pages[0], user);

  signInPage = new SignInPage(pages[1]);
  homePage = new HomePage(pages[1]);
});

test('Successful `Sign in` flow test', async ({ pages, user }) => {
  await signInUser(pages[0], user);
});
