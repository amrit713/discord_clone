import { db } from "@/lib/db";

export const getOrCreateConversation = async (
  memberOneId: number,
  memberTwoId: number
) => {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
};

const findConversation = async (memberOneId: number, memberTwoId: number) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};

const createNewConversation = async (
  memberOneId: number,
  memberTwoId: number
) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};
