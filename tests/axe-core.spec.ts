import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

test("accessibility test", async ({ page }) => {
  await page.goto("https://s-ishizaki.sakura.ne.jp/sample/01/");

  // axe-core を使ってアクセシビリティテストを実行
  // const results = await new AxeBuilder({ page }).analyze();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a"]).analyze();

  // アクセシビリティテストの結果を出力
  results.violations.forEach((violation) => {
    // TODO: CSVに出力
    console.log(violation);
  });

  // アクセシビリティテストの結果がエラーがないことを確認
  expect(results.violations.length).toBe(0);
});
