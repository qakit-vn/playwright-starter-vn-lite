import { test } from '../fixtures';

// Data-driven: mỗi dòng là một test case (TC-LOGIN-xx khớp file Excel mẫu).
const invalidCases = [
  { id: 'TC-LOGIN-02', user: 'locked_out_user', pass: 'secret_sauce', msg: 'locked out' },
  { id: 'TC-LOGIN-03', user: 'standard_user', pass: 'sai_mat_khau', msg: 'do not match' },
  { id: 'TC-LOGIN-04', user: '', pass: '', msg: 'Username is required' },
];

test.describe('Đăng nhập', () => {
  test.beforeEach(async ({ loginPage }) => { await loginPage.goto(); });

  test('TC-LOGIN-01 đăng nhập thành công', async ({ loginPage, inventoryPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  for (const c of invalidCases) {
    test(`${c.id} báo lỗi: ${c.msg}`, async ({ loginPage }) => {
      await loginPage.login(c.user, c.pass);
      await loginPage.expectError(c.msg);
    });
  }
});
