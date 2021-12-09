import { Box, TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import UserCard from "../components/user.card";
import { fetchStudents, Student } from "../services/students";

type Props = {};

const Main: React.FC<Props> = ({}) => {
  const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
      fetchStudents().then((resp: Student[]) => {
       setStudents(resp)
        //Get back all students when search query not match any user
       setAllStudents(resp)
      })
    }, []);

    const onChangeHandler = (event: any) => {
      const {value} = event.target
 
      setSearch(value)
      const filtered = students.filter((s:Student) => s.first_name.toLocaleLowerCase() === value.toLocaleLowerCase() || s.last_name.toLocaleLowerCase() === value.toLocaleLowerCase())
      if(filtered.length > 0) {
        setStudents(filtered)
      } else {
        setStudents(allStudents)
      }
   };

   return (
    <Box direction="column" pad="medium" height="100%" overflow="auto">
      <TextInput placeholder="type here" value={search} onChange={onChangeHandler} />
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
