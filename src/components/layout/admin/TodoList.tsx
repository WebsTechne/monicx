"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const TodoList = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState(false);
    return (
        <div className="">
            <h1 className="mb-6 text-lg font-medium">Todo List</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="w-full">
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
            {/* LIST */}
            <ScrollArea className="mt-4 max-h-80 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" checked />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" checked />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" checked />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" checked />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" checked />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" checked />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    {/* LIST ITEM */}
                    <Card className="p-4 shadow-none!">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1" checked />
                            <label
                                htmlFor="item1"
                                className="text-muted-foreground text-sm"
                            >
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </label>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
};

export default TodoList;
