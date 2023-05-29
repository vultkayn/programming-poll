import React from "react";
import { useActionData, useOutletContext } from "react-router-dom";
import { Card, Box, CardContent, Typography } from "@mui/material";

export const loader = (authHook) =>
  async function ({ params }) {
    const { uri, id } = params;
    const res = authHook.send({
      method: "get",
      url: "/api/practice/exercise/" + uri + "/" + id, // FIXME
    });

    if (res.data) return res;
  };

function produceQContent(question) {
  const { content } = question;

  return;
}

export default function ExercisePage() {
  const currentInfo = useActionData(); // TODO See practice.jsx for format
  const [setCurrent, setSections] = useOutletContext();

  const currentInfoDummy = {
    kind: 1, // 0 for catgs, 1 for exercises
    path: "memory-pointers/", // object path, from root supercategory /.
    solved: false,
    progress: 4 /*
    kind==0 then between 0 and exercises.length -1
    */,

    // Exercises specific infos:
    questions: [
      {
        id: 3,
        solved: false,
        title: "I am a question",
        subject: "There are 10 kind of people.",
        content: [
          {
            type: "checkbox",
          },
        ],
      },
      {
        id: 4,
        solved: false,
        title: "Yet another one",
        subject: "How many bite the dust?",
        content: [
          {
            type: "checkbox",
          },
        ],
      },
    ], // used to fetch the questions
    nbAttempts: 0,
    lastAttemptDate: "2023-05-14",
  };

  // setCurrent(currentInfoDummy);
  // setSections(currentInfoDummy.questions); // FIXME probably should an extra sidebar

  return (
    <Box
      display='flex'
      width='100%'
      flexDirection='column'
      alignItems='center'
      gap='50px'>
      {currentInfoDummy.questions.map((q, idx) => {
        return (
          <Card
            key={q.id}
            sx={{ width: "30vw" }}>
            <CardContent>
              <Typography
                variant='h4'
                gutterBottom>
                {`#${idx+1} ${q.title}`}
              </Typography>
              <Typography variant='body2'>{q.subject}</Typography>
              {produceQContent(q)}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
