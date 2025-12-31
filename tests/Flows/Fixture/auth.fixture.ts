import { UserBuilder } from "../Build/user.build";
import { LoginPage } from "../Page/login.page"
import { test as base } from "@playwright/test";

export const test = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const user = new UserBuilder().build();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    // await loginPage.login(user.username, user.password);
    await use(loginPage);
  }
});