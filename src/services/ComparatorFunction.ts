/* eslint-disabled */
// @ts-ignore
import store from "@/store";
import {v4 as uuidv4} from 'uuid';
import { helper } from "./Helper";


class ComparatorFunction {

    getRgState(rg: any, surveys:any, report:any = null, maxIndex:any = null) {
        const result = this.getResponseGroupDetails(rg, surveys, report, maxIndex);
        const index = rg.survey.slug + "_" + rg.uuid;
        // console.log(Object.keys(report[index]));
        if (result) {
            return result[index].percent;
        }
        return 0;
    }

    getResponseGroupDetails(rg:any, surveys:any, report:any = null, maxStepIndex:any = null) {

        // console.log(rg.surveyUuid);
        // console.log("=========================================");
        // console.log("calculate rg details");
        const survey = surveys.find((saved:any) => {
            return saved.uuid === rg.survey.uuid;
        });
        if (!survey) {
        // console.log("Cannot get rg state : survey not found");
        return;
        }

        // console.log(survey)
        let questionCount = 0;
        let requiredCount = 0;
        let missingRequired = 0;
        let responseCount = 0;
        let percent = 0;
        let first = false;
        if (report === null) {
            first = true;
            report = {};
        }
        const questionWithAnswer:any[] = [];
        const index = survey.slug + "_" + rg.uuid;
        let subs:any[] = [];

        for (let [stepIndex, step] of survey.steps.entries()) {
            // console.log('max '+maxStepIndex)
            // const isVisible = isStepVisible(step, rg);
            // if (isVisible) {
            // continue;
            const stepValid = this.isStepValid(step, rg);
            if (!stepValid) {
            // console.log("STOP on step " + step.label);
            // break;
            maxStepIndex = stepIndex;
            }
            // console.log("===================================================");
            // console.log('ETAPE '+step.label + " valid " + stepValid);
            // console.log("===================================================");
            // console.log('current '+step.label+' => '+stepIndex)
            for (let section of step.sections) {
                for (let question of section.questions) {
                    if (question.visibility !== "PUBLIC" || question.hidden) {
                        continue;
                    }
                    let response = this.getQuestionResponseFromRg(rg, question);
                    if (question.type.code.match(/OBJECT/)) {
                        if (!response) {
                            response = {
                                value: null,
                                questionLabel: question.label,
                                rgUuid: rg.uuid,
                                questionUuid: question.uuid,
                            };
                            rg.responses.push(response);
                        }
                        question.response = response;
                        if (question.min) {
                            let missing = question.min;
                            console.log(response)
                            response.responseGroups.forEach((responseGroup:any) => {
                                missing--;
                                const result = this.getResponseGroupDetails(responseGroup, surveys);
                                const index:any = survey.slug + "_" + responseGroup.uuid;
                                subs[index] = result;
                            });
                            if (missing > 0) {
                                for (let i = 0; i < missing; i++) {
                                    const responseGroup:any = { responses: [] };
                                    responseGroup.uuid = helper.generateId();
                                    response.responseGroups.push(responseGroup);
                                    responseGroup.parent = response;
                                    // response.survey
                                    // responseGroup.survey
                                    // console.log('SURVEY MISSING SHOULD ADD RG AND RECALCULATE PERCENT')
                                    // console.log(question)
                                    const result = this.getResponseGroupDetails(responseGroup, surveys);
                                    const index:any = survey.slug + "_" + responseGroup.uuid;
                                    subs[index] = result;
                                }
                            }
                        }
                    } else {
                    // console.log('from rgextend')
                    const v = this.isQuestionVisible(question, rg);
                    if (v) {
                        questionCount++;
                        if (question.required) {
                        // console.log(question.label + " is REQUIRED");
                        requiredCount++;
                        }
                        if (response) {
                        question.response = response;
                        // question.validate();
                        if (!helper.empty(response.value) && question.required && this.isQuestionValid(question, rg)) {
                            // console.log("🟢 " + question.label);
                            // if (maxStepIndex !== null) {
                            //   if (stepIndex <= maxStepIndex) {
                            //     responseCount++;
                            //   }
                            // } else {
                            responseCount++;
                            // }
                        } else if (question.required) {
                            // console.log("🔴 " + question.label);
                            missingRequired++;
                        }
                        }
                    }
                    }
                }
            }
            // }

        }

        let qc = questionCount;
        let rc = requiredCount;
        let rsC = responseCount;
        subs.forEach((sub:any) => {
            questionCount += sub.questionCount;
            requiredCount += sub.requiredCount;
            responseCount += sub.responseCount;
        });

        if (requiredCount > 0) {
            // console.log(responseCount + " * " + 100 + " / " + requiredCount)
            percent = Math.floor((responseCount * 100) / requiredCount);
        } else {
            // console.log('no required')
            percent = 100;
        }

        const data = {
            "ownQuestionCount": qc,
            "ownRequiredCount": rc,
            "ownResponseCount": rsC,
            "missingRequired": missingRequired,
            "questionCount": questionCount,
            "requiredCount": requiredCount,
            "responseCount": responseCount,
            "percent": percent,
            // 'parent' : $this->getParent() ? $this->getParent()->getQuestion()->getSection()->getStep()->getSurvey()->getSlug() . ' ' .$this->getParent()->getResponseGroup()->getUuid() : null,
            "subs": subs,
        };
        rg.state = percent;
        // console.log(data)
        if (!maxStepIndex) {
            const state = data["percent"];
        }
        report[index] = data;
        // console.log(report);
        return report;
    }

    isStepValid(step:any, rg:any) {
        if (!step) {
            console.log("step empty");
            return false;
        }
        // if (!isStepVisible(step, rg)) {
        //   return true;
        // }
        // const self: Step = this as any
        const isValid = step.sections.every((section:any) => {
            return this.isSectionValid(section, rg);
        });
        step.isValid = isValid;
        // console.log("all section validity " + isValid);
        return isValid;
    }

    isSectionValid(section:any, rg:any) {
        // const self: Section = this as any
        if (!section) {
            return false;
        }
        // if (!isSectionVisible(section, rg)) {
        //   return true;
        // }
        const isValid = section.questions.every((question:any) => {
            return this.isQuestionValid(question, rg);
        });
        section.isValid = isValid;
        // console.log("all question validity " + isValid);
        return isValid;
    }


    isQuestionValid(question:any, rg:any) {
    let valid = false;
    // const self: Question = this;
    // as;
    // any;
    // console.log("is " + question.label + " is valid");
    if (!this.isQuestionVisible(question, rg)) {
        // console.log(question.label + " hidden ... bypass");
        return true;
    }
    // console.log(self.label)
    let message = null;
    if (question.isSending) {
        // console.log("is Sending ...");
        message =
        "La réponse a " + question.label + " est en cours de synchronisation";
        return false;
    }
    // console.log(this.response.currentValue)
    // console.log(this.response)
    // @ts-ignore
    const response = this.getQuestionResponseFromRg(rg, question);

    if (!response) {
        // console.log("no response");
        message = "Aucune reponse associée";
        return false;
    }
    // console.log(question.required)
    if(helper.empty(response.value)){
        return false;
    }
    if (question.required && response && helper.empty(response.value)) {
        message = "Ce champs est réquis";
    }
    if (question.type && question.type.code === "DATE") {
        if (helper.isValidDate(response.value)) {
        message = "Date invalide";
        }
    }

    if (message === null) {
        valid = true;
    } else {
        valid = false;
    }
    question.isValid = valid;
    // if (!valid) {
    // console.log(question.label + ' validation = ' + valid);
    // console.log('reason : ' + message);
    // }
    return valid;
    }

    isStepVisible(step:any, rg:any) {
    const isVisible = step.sections.some((section:any) => {
        return this.isSectionVisible(section, rg);
    });
    // console.log(self.id + ' ' + self.label + ' is visible ' + isVisible)
    return isVisible;
    }

    isSectionVisible(section:any, rg:any) {
    const isVisible = section.questions.some((question:any) => {
        return this.isQuestionVisible(question, rg);
    });
    // console.log(self.id + ' ' + self.label + ' is visible ' + isVisible)
    return isVisible;
    }

    isQuestionVisible(question:any, rg:any) {
    let decision = null;
    for (let conditionGroup of question.conditionGroups) {
        let cg = true;
        for (let condition of conditionGroup.conditions) {
        // console.log("search tq " + condition.question);
        const testingResponse = this.getQuestionResponseFromRg(rg, condition.question);
        if (testingResponse && testingResponse.value) {
            switch (condition.operator) {
            case "===": {
                cg =
                cg &&
                testingResponse.value.toUpperCase() ===
                condition.value.toUpperCase();
                break;
            }
            case "!==": {
                cg =
                cg &&
                testingResponse.value.toUpperCase() !==
                condition.value.toUpperCase();
                break;
            }
            case "<": {
                cg =
                cg &&
                parseFloat(testingResponse.value) < parseFloat(condition.value);
                break;
            }
            case "<=": {
                cg =
                cg &&
                parseFloat(testingResponse.value) <= parseFloat(condition.value);
                break;
            }
            case ">": {
                cg =
                cg &&
                parseFloat(testingResponse.value) > parseFloat(condition.value);
                break;
            }
            case ">=": {
                cg =
                cg &&
                parseFloat(testingResponse.value) >= parseFloat(condition.value);
                break;
            }
            }
            // console.log(testingQuestion.label + ' ' + condition.operator + ' ' + condition.value)
            // console.log('value is ' + testingQuestion.response.value)
        } else {
            cg = false;
            // console.log('TESTING QUESTION NOT FOUND FOR ' + question.label);
        }
        }

        decision = decision === null ? cg : decision || cg;
    }

    if (decision === null) {
        decision = true;
    }
    question.isVisible = decision;

    // console.log("decision === " + decision);
    // if (!decision) {
    //     console.log('masquer ' + self.label)
    // }

    return decision;
    }

    currencyFormat(amount:any, abs:any = false, currency:any = false) {
    const factor = 1;
    const symbol = "CFA";
    try {
        amount = parseFloat(amount);
        if (abs) {
        amount = Math.abs(amount);
        }
        amount = helper.roundMoney(amount, 2);
        // console.log(amount)
        amount = "" + amount * factor;
        if (!amount) {
        return amount;
        }
        amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        if (!currency) {
        return amount;
        }
        if (symbol) {
        // if (store.state.currency.left) {
        //   amount = symbol + " " + amount;
        // } else {
        amount += " " + symbol;
        // }
        }
        return amount;
    } catch (e) {
        return amount;
    }
    }

    roundMoney(amount:any, count:any) {
    amount = parseFloat(amount);
    const val = Math.pow(10, count);
    return Math.round(amount * val) / val;
    }

    getSurveyQuestions(survey:any) {
    const questions = [];
    for (let step of survey.steps) {
        for (let section of step.sections) {
        for (let question of section.questions) {
            questions.push(question);
        }
        // questions.concat(section.questions);
        }
    }
    return questions;
    }

    isQuestionAuthorized(question:any) {
    return question.visibility === "PUBLIC";
    }

    getQuestionResponseFromRg(rg:any, question:any) {
    let uuid = question;
    if (typeof uuid === "object") {
        uuid = question.uuid;
    }
    // if (rg.responses.length === 0) {
    //   console.log("response is empty");
    // }
    if (!rg || !rg.responses) {
        return null;
    }
    for (let response of rg.responses) {
        if (response && response.questionUuid === uuid) {
        // console.log("🟢")
        return response;
        } else {
        // console.log(response.questionUuid + " ==== " + uuid);
        }
    }

    // if (typeof uuid === "object") {
    //   console.log("response for " + question.label + " not found");
    // } else {
    //   console.log("response for " + question + " not found");
    // }
    return null;
    }

    getQuestionDefaultValue(question:any) {
    // if (!empty(question.defaultValue)) {
    //
    //   if (question.type.code === "BOOLEAN") {
    //     if (question.defaultValue === "true" || question.defaultValue === true) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // console.log(question.label + "-=--=-=-=-==--==--= default value is " + question.defaultValue);
    return question.defaultValue;
    // }
    }
}

export const comparatorFunction = new ComparatorFunction()
