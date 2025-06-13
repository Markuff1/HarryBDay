export type QuestionType = "text" | "multiple-choice" | "audio"; // <-- must include "audio"

export interface Question {
  type: QuestionType;
  text: string;
  image?: string;
  choices?: string[];
}

export const QUESTIONS: Question[] = [
    {
    type: "multiple-choice",
    text: "Happy Birthday!!!!!!!! - Now before you get a gift I need to know some things like - Who are you?",
    choices: ["Ben","Aaron","Mark","Harry","George","Harvey"],
  },
  {
    type: "text",
    text: "When is your birthday",
  },
    {
    type: "text",
    text: "What did you get for your Birthday?",
  },
{
    type: "text",
    text: "Doing anything exciting?",
  },
  {
    type: "multiple-choice",
    text: "Now before you get a gift, a few questions - What is my dog called?",
    choices: ["Oban","Jerome","N*","No"],
  },
    {
    type: "multiple-choice",
    text: "What about my pet fish",
    choices: ["Norman","Nemo","Ben","Muhammad the great fish", "I don't have one?"],
  },
  {
    type: "text",
    text: "Who is this?",
    image: "/Ben.png",
  },
{
    type: "text",
    text: "What is your alarm code?",
  },
  {
    type: "text",
    text: "What about Sort code and Account Number as well as the numbers on the back?",
  },
  {
    type: "multiple-choice",
    text: "Now do you want your gift?",
    choices: ["Yes","No"],
  },
    {
    type: "multiple-choice",
    text: "Are you sure?",
    choices: ["Yes","No"],
  },
    {
    type: "multiple-choice",
    text: "Are you sure?",
    choices: ["Yes","No"],
  },
{
    type: "multiple-choice",
    text: "Ok fine - Are you 100% sure though?",
    choices: ["Yes","No"],
  },
{
    type: "multiple-choice",
    text: "Well are you 10000% sure though?",
    choices: ["Yes","No"],
  },
{
    type: "multiple-choice",
    text: "Ok fine but are you 100000000% sure though?",
    choices: ["Yes","No"],
  },
];
