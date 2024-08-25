import type { TestRunnerConfig } from "@storybook/test-runner";
import { getStoryContext } from "@storybook/test-runner";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import { injectAxe, checkA11y, configureAxe } from "axe-playwright";
import AXE_LOCALE_JA from "axe-core/locales/ja.json";

type Record = {
  context: string;
  date: string;
  violation: string;
  help: string;
};

const addRecord = async (records: Record[]) => {
  // NOTE: コマンドラインのオプションで指定したかったが上手くできなかった
  const csvFilePath = "storybook-report.csv";
  const fileExists = fs.existsSync(csvFilePath);
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [
      {
        id: "context",
        title: "CONTEXT ID",
      },
      {
        id: "date",
        title: "DATE",
      },
      {
        id: "violation",
        title: "VIOLATION ID",
      },
      {
        id: "help",
        title: "VIOLATION HELP",
      },
    ],
    append: fileExists,
  });
  await csvWriter.writeRecords(records);
};

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });

    await checkA11y(
      page,
      "#storybook-root",
      {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      },
      false,
      {
        report: async (violations) => {
          if (violations.length) {
            const today = new Date();
            const records = violations.map((violation) => {
              const help = AXE_LOCALE_JA.rules?.[violation.id]?.help || "";
              return {
                context: context.id,
                date: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`,
                violation: violation.id,
                help,
              };
            });
            await addRecord(records);
          }
        },
      }
    );
  },
};

export default config;
