// script/quicktype --src-lang json5 --lang typescript ./test/inputs/json5/sample1.json5
// script/quicktype --src-lang json5 --lang typescript ./test/inputs/json5

const fs = require("fs");

const {
  quicktype,
  InputData,
  json5InputForTargetLanguage,
} = require("./dist/quicktype-core/index.js");

const jsonString = fs
  .readFileSync("./test/inputs/json5/sample1.json5")
  .toString();

async function quicktypeJSON(targetLanguage, typeName, jsonString) {
  const jsonInput = json5InputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
  });
}

async function main() {
  const { lines: swiftPerson } = await quicktypeJSON(
    "typescript",
    "Person",
    jsonString
  );
  console.log(swiftPerson.join("\n"));
}

main();
