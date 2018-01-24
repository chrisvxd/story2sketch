const typeEnumRules = require("@commitlint/config-angular-type-enum");

const typeEnum = typeEnumRules.rules["type-enum"];

// Add any additional commit types
typeEnum[2].push("release");

module.exports = {
  extends: ["@commitlint/config-angular"],
  rules: {
    "type-enum": typeEnum
  }
};
