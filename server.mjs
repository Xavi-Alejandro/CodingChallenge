import express, { response } from "express";
import bodyParser from "body-parser";
import data from "./data.js";
import { Parser } from "@json2csv/plainjs";

let opts = {};
let asyncOpts = {};
let csv = "";

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function findOption(questionID, responseID) {
  for (let i = 0; i < data.answers.length; i++) {
    if (
      data.answers[i].responseId === responseID &&
      data.answers[i].questionId === questionID
    ) {
      return {
        found: true,
        option: data.answers[i].optionId,
        indexOfOption: data.answers[i].optionId - 1,
      };
    }
  }
  return { found: false };
}

function alreadyInUserChoices(userChoices, token) {
  let alreadyExists = false;
  for (let i = 0; i < userChoices.length; i++) {
    if (userChoices[i].User === token) {
      alreadyExists = true;
    }
  }
  return alreadyExists;
}

app.get("/sendMeData", (req, res) => {
  let userChoices = [];
  let arrayToDisplay = [];
  let found = false;

  //Find user choices
  for (let i = 0; i < data.responses.length; i++) {
    for (let j = 0; j < data.questions.length; j++) {
      let returnedResult = findOption(
        data.responses[i].id,
        data.questions[j].id
      );
      if (returnedResult.found === true) {
        if (
          alreadyInUserChoices(userChoices, data.responses[i].token) === false
        ) {
          userChoices.push({
            User: data.responses[i].token,
            Option: returnedResult.option,
            IndexOfOption: returnedResult.indexOfOption,
          });
        }
      }
    }
  }
  console.log(userChoices);

  //Create filtered array to display
  for (let i = 0; i < userChoices.length; i++) {
    for (let j = 0; j < data.responses.length; j++) {
      for (let k = 0; k < data.questions.length; k++) {
        arrayToDisplay.push({
          user: userChoices[i],
        });
      }
    }
  }
  try {
    const opts = {
      fields: [
        {
          label: "User",
          value: "token",
        },
        {
          label: data.questions[0].label,
          value: (record) => data.questions[0].options[1].label,
        },
        {
          label: data.questions[1].label,
          value: (record) => data.questions[1].options[1].label,
        },
      ],
      // fields: [
      //   {
      //     label: "User",
      //     value: (record) => data.responses[0].token,
      //     value: (record) => data.responses[1].token,
      //   },
      //   {
      //     label: data.questions[0].label,
      //     value: (record) => data.questions[0].options[1].label,
      //     value: (record) => data.questions[0].options[0].label,
      //   },
      //   {
      //     label: data.questions[1].label,
      //     value: (record) => data.questions[1].options[1].label,
      //     value: (record) => data.questions[1].options[0].label,
      //   },
      // ],
    };
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    //console.log(csv);
    res.send("");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log(data.responses[0].token);
  console.log("listening");
});
