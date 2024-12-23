"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const GetWorkflowsForUser = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated user");
  }

  return prisma.worklow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export default GetWorkflowsForUser;
