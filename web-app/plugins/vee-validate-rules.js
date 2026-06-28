import { defineRule } from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';

export default defineNuxtPlugin(() => {
    Object.keys(rules).forEach((rule) => {
        if (typeof rules[rule] === 'function') {
            defineRule(rule, rules[rule]);
        }
    });

    configure({
        generateMessage: localize({
            en
        })
    });
});
