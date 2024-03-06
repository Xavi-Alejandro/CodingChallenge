import express, { response } from "express";
import bodyParser from "body-parser";
import data from "./data.js";
import { Parser } from "@json2csv/plainjs";

let builtArray = [];

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function buildArray() {
  let responseHolder = "";
  let answerHolder = "";
  let questionHolder = "";
  let stringBuilder = "";

  for (
    let responsesIndex = 0;
    responsesIndex < data.responses.length;
    responsesIndex++
  ) {
    responseHolder = data.responses[responsesIndex].token;
    stringBuilder += `{"User":"${responseHolder}",`;
    for (
      let questionsIndex = 0;
      questionsIndex < data.questions.length;
      questionsIndex++
    ) {
      questionHolder = data.questions[questionsIndex].label;
      for (
        let optionsIndex = 0;
        optionsIndex < data.questions[questionsIndex].options.length;
        optionsIndex++
      ) {
        for (
          let answersIndex = 0;
          answersIndex < data.answers.length;
          answersIndex++
        ) {
          if (
            //response
            data.answers[answersIndex].responseId ===
              data.responses[responsesIndex].id &&
            //question
            data.answers[answersIndex].questionId ===
              data.questions[questionsIndex].id &&
            //option
            data.answers[answersIndex].optionId ===
              data.questions[questionsIndex].options[optionsIndex].id
          ) {
            answerHolder =
              data.questions[questionsIndex].options[optionsIndex].label;
          }
        }
      }
      stringBuilder += `"${questionHolder}":"${answerHolder}",`;
    }
    stringBuilder = stringBuilder.slice(0, -1);
    stringBuilder += "}";
    builtArray.push(JSON.parse(stringBuilder));
    stringBuilder = "";
  }
}

app.get("/sendMeData", (req, res) => {
  buildArray();
  //console.log(builtArray);

  try {
    const opts = {
      fields: [
        {
          label: "User",
          value: "User",
        },
        {
          label: "How are you today?",
          value: "How are you today?",
        },
        {
          label: "What is your age?",
          value: "What is your age?",
        },
      ],
    };
    const parser = new Parser(opts);
    let csv = parser.parse(builtArray);
    res.type("text/csv").send(csv);
    console.log("sent");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("listening");
});
