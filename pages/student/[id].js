import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Card,
  CardBody,
  Avatar,
  CardFooter,
  Text,
  Box,
  Heading,
} from "grommet";
import { fetchStudent } from "../../services/students";

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const router = useRouter();
  console.log(router);
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchStudent(id).then((resp) => setStudent(resp));
  }, [id]);
  return (
    <Box pad="large" align="center" height="1000px">
      <Link href="/">
        <a className="back-btn">Go Back</a>
      </Link>
      <Heading level="3">Student Details</Heading>
      {student && (
        <Card>
          <CardBody align="center" pad="medium">
            <Avatar src={student.avatar} />
            <Text>{`${student["first_name"]} ${student["last_name"]}`}</Text>
            <Text size="small">Works at: {student.company}</Text>
            <Text size="small">Job position: {student.job}</Text>
          </CardBody>
          <CardFooter align="start" justify="center" pad="medium">
            <Text textAlign="center">{student.email}</Text>
          </CardFooter>
        </Card>
      )}
      <style jsx>{`
        .back-btn {
          padding: 5px 10px;
          border: 1px solid #111;
          border-radius: 5px;
        }
      `}</style>
    </Box>
  );
};

export default StudentDetails;
