"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rules {
    constructor() {
        this.rules = {
            age: {
                max: 44,
                min: 29,
            },
            inbound: {
                max: 2000.0,
                med: 1500.0,
                min: 900.0
            },
            dependents: {
                max: 3,
                min: 1
            },
            depententsAge: {
                min: 18
            }
        };
        this.scores = {
            age: {
                min: 1,
                med: 2,
                max: 3
            },
            inbound: {
                min: 1,
                med: 3,
                max: 5
            },
            dependents: {
                min: 2,
                max: 3
            }
        };
    }
}
exports.default = Rules;
