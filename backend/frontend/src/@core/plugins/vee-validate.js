import * as rules from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import { defineRule, configure } from "vee-validate";
import en from "@vee-validate/i18n/dist/locale/en.json";

configure({
  validateOnInput: true,

  generateMessage: localize({
    en,
  }),
});

Object.keys(rules).forEach((rule) => {
  if (typeof rules[rule] === "function") {
    defineRule(rule, rules[rule]);
  }
});
