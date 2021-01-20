import { RulesServices } from '@shared/@types/enums';
import {
  Rule,
  RulesEntries,
  stdClass,
  stdProperty,
} from '@shared/@types/types';
import IService from '@shared/core/IService';
import IRules from '@shared/core/IRules';
import { rulesConfig, rulesArray } from '@config/rules';

export default class RulesService
  implements IService<RulesServices, RulesEntries>, IRules {
  age: Rule;
  inbound: Rule;
  dependents: Rule;

  serviceLocator: Array<Rule>;

  constructor() {
    for (const ruleName of rulesArray) {
      (this as stdClass)[ruleName] = {
        max: {
          score: rulesConfig[ruleName].max.score as number,
          rule: (value: number): boolean =>
            value >= (rulesConfig[ruleName].max.rule as stdProperty).a,
        },
        med: {
          score: rulesConfig[ruleName].med.score as number,
          rule: (value: number): boolean =>
            value >= (rulesConfig[ruleName].max.rule as stdProperty).a &&
            value < (rulesConfig[ruleName].max.rule as stdProperty).b,
        },
        min: {
          score: rulesConfig[ruleName].min.score as number,
          rule: (value: number): boolean =>
            value >= (rulesConfig[ruleName].max.rule as stdProperty).a &&
            value < (rulesConfig[ruleName].max.rule as stdProperty).b,
        },
        default: {
          score: rulesConfig[ruleName].default.score as number,
          rule: (value: number): boolean =>
            value < (rulesConfig[ruleName].max.rule as stdProperty).a,
        },
      };
    }

    this.serviceLocator = [this.age, this.inbound, this.dependents];
  }

  execute(request: RulesServices): RulesEntries {
    return Object.entries(this.serviceLocator[request]);
  }
}
