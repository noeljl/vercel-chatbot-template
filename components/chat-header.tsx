"use client";

import { useRouter } from "next/navigation";
import { SidebarToggle } from "./sidebar-toggle";
import { Button } from "./ui/button";
import { PlusIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ChatHeader({
  chatId,
}: {
  chatId: string;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  return (
    <header className="sticky top-0 flex items-center bg-background px-2 py-1.5 md:px-2">
      <div className="flex flex-row items-center gap-2">
        <SidebarToggle />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="py-1.5 px-2 h-fit md:h-[34px] md:px-3 z-20"
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
              type="button"
              variant="ghost"
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
