import { NextRequest, NextResponse } from "next/server";

// Importing Zod to validate the API
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    // If the issue is unsuccessful show the validation error and set the status to 400
    return NextResponse.json(validation.error.format(), { status: 400 });

  // If the issue is successful create an issue, store the data and set the status to 201
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
