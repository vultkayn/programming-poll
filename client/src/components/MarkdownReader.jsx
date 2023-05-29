import React, { useEffect, useState } from "react";
import axios from "axios";

import { Container, Skeleton, Typography, Grid } from "@mui/material";
import DOMPurify from "dompurify";

export default function MarkdownReader({ path }) {
  const [done, setDone] = useState(false);
  const [file, setFile] = useState(null);
  let html = path.substring(0, path.lastIndexOf(".")) + ".html";

  useEffect(() => {
    async function parse() {
      const fil = await axios.get(html);
      const purified = await DOMPurify.sanitize(fil.data);
      setDone(true);
      setFile(purified); // FIXME improve with a steam (see axios responseType="stream")
    }
    parse();
    return () => {
      setFile(null);
      setDone(false);
    };
  }, [path]);

  if (done === false)
    return (
      <Grid
        container
        spacing={8}>
        <Grid
          item
          md>
          <Typography
            component='div'
            key='h2'
            variant='h2'>
            <Skeleton />
          </Typography>
        </Grid>
        <Grid
          item
          md>
          <Skeleton
            variant='rectangular'
            width='80%'
            height={250}
          />
        </Grid>
      </Grid>
    );
  if (done === null) throw new Error("Impossible to parse " + html);


    // BUG Trivial XSS, ask how to do otherwise. 
  return (
    <Container sx={{textAlign:"left"}}>
      <div dangerouslySetInnerHTML={{ __html: file }}></div>
    </Container>
  );
}
