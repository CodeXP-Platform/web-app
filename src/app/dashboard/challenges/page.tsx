import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dots, Filter, SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ChallengesPage() {
    return (
        <main>
            <header className="h-14 w-full border-b flex justify-between items-center px-2">
                <SidebarTrigger size={"icon-lg"} variant={"ghost"} />

                <h2 className="text-sm">Challenges</h2>

                <Button size={"icon-lg"} variant={"ghost"}>
                    <HugeiconsIcon icon={Dots} />
                </Button>
            </header>

            <section className="w-full max-w-7xl mx-auto">
                <header className="flex gap-1 py-4">
                    <InputGroup className="h-fit p-1">
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <HugeiconsIcon icon={SearchIcon} />
                        </InputGroupAddon>
                    </InputGroup>

                    <Button size={"icon"} className="p-3 size-fit">
                        <HugeiconsIcon icon={Filter} />
                    </Button>

                    <Card className="p-px flex-row overflow-visible items-center gap-px">
                        <Button size={"icon-lg"} className="">
                            <HugeiconsIcon icon={Filter} />
                        </Button>

                        <Button size={"icon-lg"} className="">
                            <HugeiconsIcon icon={Filter} />
                        </Button>
                    </Card>
                </header>

                <section>
                    <div>
                        <h2>Last Challenge You Solved</h2>
                    </div>
                    <div></div>
                    <div></div>
                </section>
            </section>
        </main>
    );
}
