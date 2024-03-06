const data = {
  questions: [
    {
      id: 1,
      label: "How are you today?",
      options: [
        {
          id: 1,
          label: "good",
        },
        {
          id: 2,
          label: "bad",
        },
      ],
    },
    {
      id: 2,
      label: "What is your age?",
      options: [
        {
          id: 1,
          label: "18-55",
        },
        {
          id: 2,
          label: "56-99",
        },
      ],
    },
  ],
  answers: [
    {
      responseId: 1,
      questionId: 1,
      optionId: 2,
    },
    {
      responseId: 1,
      questionId: 2,
      optionId: 2,
    },
    {
      responseId: 2,
      questionId: 1,
      optionId: 1,
    },
    {
      responseId: 2,
      questionId: 2,
      optionId: 1,
    },
  ],
  responses: [
    {
      id: 1,
      token: "abc-112",
      label: "Older person",
    },
    {
      id: 2,
      token: "bbx-421",
      label: "Happy younger person",
    },
  ],
};

module.exports = data;
