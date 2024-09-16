import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
// import { createHtmlReport } from "axe-html-reporter";

// TODO: 対象の複数ページに対して実行する

test("accessibility test", async ({ page }, testInfo) => {
  await page.goto("https://s-ishizaki.sakura.ne.jp/sample/01/");

  // axe-core を使ってアクセシビリティテストを実行
  // const results = await new AxeBuilder({ page }).analyze();
  const results = await new AxeBuilder({ page })
    .include("main")
    // .exclude("iframe")
    .withTags(["wcag2a"])
    .analyze();

  // アクセシビリティテストの結果を出力
  // results.violations.forEach((violation) => {
  //   console.log(violation);
  // });

  // アクセシビリティテストの結果をCSVに出力
  if (results.violations.length > 0) {
    console.log(results.violations[0]);
    // const { id, description, nodes } = results.violations[0];
    // console.log(id, description, testInfo.project.name);
    // const { html, failureSummary } = nodes[0];
    // console.log(html, failureSummary);
    // TODO: CSVに出力（violationsとnodesで二回層のループ必要そう）
  }

  // レポート出力
  // if (results.violations.length > 0) {
  //   createHtmlReport({ results });
  // }

  // アクセシビリティテストの結果がエラーがないことを確認
  expect(results.violations.length).toBe(0);
});
