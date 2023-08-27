import { redirect } from "next/navigation";
import React from "react";
import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";

import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: +serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.profileId === profile.id
  );

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="flex flex-cols h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
}

export default ServerSidebar;
