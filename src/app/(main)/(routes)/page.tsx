import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (

    <div className=" ">
      <UserButton afterSignOutUrl="/" />
      <p>hello</p>
      <Button size="lg">Hello</Button>
      <ModeToggle />
    </div>
  );
}
