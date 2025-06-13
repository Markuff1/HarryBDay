// src/questions.ts

export type QuestionType = "text" | "multiple-choice" | "audio";

export interface Question {
  type: QuestionType;
  text: string;
  image?: string;
  audio?: string;
  choices?: string[];
  correctAnswers?: string[]; // Add this
}


export const QUESTIONS: Question[] = [
  {
    type: "multiple-choice",
    text: "Who are you?",
    choices: ["Ben", "Aaron", "Mark", "Harry", "George", "Harvey"],
    correctAnswers: ["Harry"],
  },
  {
    type: "text",
    text: "When is your birthday?",
    correctAnswers: ["Today","June 14th"],
  },
  {
    type: "audio",
    text: "Speical Message from this Man - Who is this?",
    audio: "/gordon-ramsay.wav",
    correctAnswers: ["gordon ramsay","gordon","ramsay","Gordon Ramsay", "Gordon ramsay","gordon Ramsay"],
  },
  {
    type: "text",
    text: "Who is this Man/Woman/it?",
    image: "/Ben.png",
    correctAnswers: ["Ben"],
  },
  {
    type: "multiple-choice",
    text: "Now do you want your present?",
    choices: ["Yes","No"],
    correctAnswers: ["Yes"],    
  },
  {
    type: "multiple-choice",
    text: "are you sure? - I think only if you say 2K is the best",
    choices: ["WWE 2K25 IS THE BEST GAME","Resident evil is SHIT"],
    correctAnswers: ["WWE 2K25 IS THE BEST GAME","Resident evil is SHIT"],
  },
    {
    type: "multiple-choice",
    text: "Sooooooooooo do you want your gift now?",
    choices: ["Yes","No"],
    correctAnswers: ["Yes"],
  },

  {
    type: "multiple-choice",
    text: "Are you sure?",
    choices: ["Yes","No"],
    correctAnswers: ["Yes"],
  },
   
];