import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

// Setting the type of ID to string because all of the values in the params are string
interface Props {
  params: { id: string };
}

// Using Prisma to get an issue from the database
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.description}</Text>
      </Flex>
      <Card>
        <p>{issue.createdAt.toDateString()}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
