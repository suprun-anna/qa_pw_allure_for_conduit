import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { SettingsPage } from '../../src/ui/pages/user/SettingsPage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { signInUser } from '../../src/ui/actions/auth/signInUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { camelCaseToPhrase } from '../../src/common/helpers/stringHelpers';

const newUserData = {
  ...generateNewUserData(),
  profilePictureUrl: faker.image.urlPlaceholder(),
  shortBioAboutYou: faker.lorem.sentence(),
};

const inputs = [
  {
    fieldName: 'profilePictureUrl',
    action: ({ settingsPage, user }) => {
      return settingsPage.fillProfilePictureUrlInput(newUserData.profilePictureUrl);
    },
    assert: ({ myProfilePage, user }) => {
      return myProfilePage.assertProfileImageHasSrc(newUserData.profilePictureUrl);
    }
  },
  {
    fieldName: 'username',
    action: ({ settingsPage, user }) => {
      return settingsPage.fillUsernameInput(newUserData.username);
    },
    assertOnOpenPage: ({ settingsPage, user }) => {
      const oldUsername = user.username.toLowerCase();
      return settingsPage.assertUsernameIsVisible(oldUsername);
    },
    assert: ({ myProfilePage, user }) => {
      return myProfilePage.assertUsernameIsVisible(newUserData.username);
    }
  },
  {
    fieldName: 'shortBioAboutYou',
    action: ({ settingsPage, user }) => {
      return settingsPage.fillShortBioAboutYouInput(newUserData.shortBioAboutYou);
    },
    assert: ({ myProfilePage, user }) => {
      return myProfilePage.assertBioIsVisible(newUserData.shortBioAboutYou);
    }
  },
  {
    fieldName: 'email',
    action: ({ settingsPage, user }) => {
      return settingsPage.fillEmailInput(newUserData.email);
    },
    assertOnOpenPage: ({ settingsPage, user }) => {
      return settingsPage.assertEmailIsVisible(user.email);
    },
    assert: ({ settingsPage, user }) => {
      return settingsPage.assertEmailIsVisible(newUserData.email);
    }
  },
  {
    fieldName: 'newPassword',
    action: ({ settingsPage, user }) => {
      return settingsPage.fillNewPasswordInput(newUserData.password);
    },
    assertOnOpenPage: ({ settingsPage, user }) => {
      return settingsPage.assertPasswordIsNotVisible();
    },
    assert: ({ page, user }) => {
      return signInUser(page, { 
        email: user.email, password: 
        newUserData.password 
      });
    }
  }
].forEach(input => {
  test.describe(`User is able to update their ${camelCaseToPhrase(input.fieldName)}`, () => {
    test.beforeEach(async ({ page, user, settingsPage }) => {
      await signUpUser(page, user);
      await settingsPage.open();
    });

    test(`Update ${input.fieldName}`, async ({ user, settingsPage, myProfilePage, page, homePage }) => {
      await input.assertOnOpenPage?.({ settingsPage, user });
      await input.action({ settingsPage, user });
      await settingsPage.clickUpdateSettingsButton();
      switch (input.fieldName) {
        case 'email':
          await input.assert({ settingsPage, user });
          break;
        case 'newPassword':
          await input.assert({ page, user });
          break;
        default:
          await input.assert({ myProfilePage, user });
          break;
      }
    });
  });
});


// test.describe('User is able to update their profile', () => {
//   test.beforeEach(async ({ page, user, settingsPage }) => {
//     await signUpUser(page, user);
//   });

//   test('Update profile', async ({ page, user }) => {
//     await signInUser(page, user);
//   });
// });