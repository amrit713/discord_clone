import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex  item-center gap-4 ">
      <Button size="lg">Hello</Button>
      <ModeToggle />
    </div>
  );
}
