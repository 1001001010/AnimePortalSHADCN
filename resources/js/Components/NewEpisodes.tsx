import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { PageProps } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";

export default function ComboboxDemo({ Anime }: PageProps<{ Anime: any[] }>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const filteredAnime = Anime.filter((anime) =>
    anime.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-1/3 border border-gray-200 rounded-lg shadow dark:border-gray-700 p-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? Anime.find((anime) => anime.name === value)?.name
              : "Выберите аниме"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0">
          <Command className="w-full">
            <CommandInput
              placeholder="Ключевое слово"
              value={searchValue}
              onValueChange={(value) => setSearchValue(value)}
            />
            <CommandEmpty>No anime found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {filteredAnime.map((anime) => (
                  <CommandItem
                    key={anime.name}
                    value={anime.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === anime.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {anime.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="pt-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Сезон 1</AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 grid grid-cols-4 gap-4 max-sm:grid-cols-3">
                <Button variant="outline">Серия 1</Button>
                <Button variant="outline">Серия 2</Button>
                <Button variant="outline">Серия 3</Button>
                <Button variant="outline">Серия 4</Button>
                <Button variant="outline">Серия 5</Button>
                <Button variant="outline">Серия 6</Button>
                <Button variant="outline">Серия 7</Button>
                <Button variant="outline">Серия 8</Button>
                <Button variant="outline">Серия 9</Button>
                <Button variant="outline">Серия 10</Button>
                <Button variant="outline">Серия 11</Button>
                <Button variant="outline">Серия 12</Button>
                <Button variant="outline">Серия 13</Button>
                <Button variant="outline">Серия 14</Button>
                <Button variant="outline">Серия 15</Button>
                <Button variant="outline">Серия 16</Button>
                <Button variant="outline">Серия 17</Button>
                <Button variant="outline">Серия 18</Button>
                <Button variant="outline">Серия 19</Button>
                <Button variant="outline">Серия 20</Button>
                <Button variant="outline">Серия 21</Button>
                <Button variant="outline">Серия 22</Button>
                <Button variant="outline">Серия 23</Button>
                <Button variant="outline">Серия 24</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Сезон 2</AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 grid grid-cols-4 gap-4 max-sm:grid-cols-3">
                <Button variant="outline">Серия 1</Button>
                <Button variant="outline">Серия 2</Button>
                <Button variant="outline">Серия 3</Button>
                <Button variant="outline">Серия 4</Button>
                <Button variant="outline">Серия 5</Button>
                <Button variant="outline">Серия 6</Button>
                <Button variant="outline">Серия 7</Button>
                <Button variant="outline">Серия 8</Button>
                <Button variant="outline">Серия 9</Button>
                <Button variant="outline">Серия 10</Button>
                <Button variant="outline">Серия 11</Button>
                <Button variant="outline">Серия 12</Button>
                <Button variant="outline">Серия 13</Button>
                <Button variant="outline">Серия 14</Button>
                <Button variant="outline">Серия 15</Button>
                <Button variant="outline">Серия 16</Button>
                <Button variant="outline">Серия 17</Button>
                <Button variant="outline">Серия 18</Button>
                <Button variant="outline">Серия 19</Button>
                <Button variant="outline">Серия 20</Button>
                <Button variant="outline">Серия 21</Button>
                <Button variant="outline">Серия 22</Button>
                <Button variant="outline">Серия 23</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-start gap-4 pt-2">
          <Button variant={"outline"}>Добавить сезон</Button>
          <Button variant={"outline"}>Добавить серию</Button>
        </div>
      </div>
    </div>
  );
}
