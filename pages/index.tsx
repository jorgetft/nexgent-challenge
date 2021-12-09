import { Box, TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import UserCard from "../components/user.card";
import { fetchStudents, Student } from "../services/students";

type Props = {};

const Main: React.FC<Props> = ({}) => {
  const [students, setStudents] = useState([]);

    useEffect(() => {
      fetchStudents().then((resp: Student[]) => {
       setStudents(resp)
      })
    }, []);

    const onChangeHandler = (event: any) => {
      // TODO
    };

   return (
    <Box direction="column" pad="medium" height="100%" overflow="auto">
      <TextInput placeholder="type here" value="" onChange={onChangeHandler} />
      <Box direction="row" wrap={true}>
        {students.map((s:Student) => (
          <Link key={s.id}  href={`/student/${s.id}`}>
          <Box margin="10px">
              <UserCard user={s} />
          </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Main;
