import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog"
import { RegisterEntryState } from "../../enums/RegisterEntryState"

interface RegisterEntryFilterProps {
  onFilterChange: (selectedStates: RegisterEntryState[]) => void
}

export function RegisterEntryFilter({ onFilterChange }: RegisterEntryFilterProps) {
  const [selectedStates, setSelectedStates] = useState<RegisterEntryState[]>([])
  const [open, setOpen] = useState(false)
  const [tempSelectedStates, setTempSelectedStates] = useState<RegisterEntryState[]>([])

  useEffect(() => {
    if (open) {
      setTempSelectedStates([...selectedStates])
    }
  }, [open, selectedStates])

  const handleStateToggle = (state: RegisterEntryState) => {
    setTempSelectedStates((current) => {
      return current.includes(state) 
        ? current.filter((s) => s !== state) 
        : [...current, state]
    })
  }
  
  const applyFilters = () => {
    setSelectedStates(tempSelectedStates)
    onFilterChange(tempSelectedStates)
    setOpen(false)
  }

  const clearFilters = () => {
    setSelectedStates([])
    onFilterChange([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-zinc-700 bg-zinc-900">
            <Filter className="h-4 w-4 text-zinc-400" />
            <span className="text-zinc-400">Filter</span>
            {selectedStates.length > 0 && (
                <Badge className="ml-1 bg-zinc-700 text-zinc-100" variant="secondary">
                {selectedStates.length}
                </Badge>
            )}
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-800 border-zinc-700 text-zinc-100 sm:max-w-[425px]">
            <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Filter Entries</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
                <Checkbox
                id="unreviewed"
                checked={tempSelectedStates.includes(RegisterEntryState.UNREVIEWED)}
                onCheckedChange={() => handleStateToggle(RegisterEntryState.UNREVIEWED)}
                className="border-zinc-600 data-[state=checked]:bg-zinc-600"
                />
                <label htmlFor="unreviewed" className="text-sm font-medium text-zinc-100 cursor-pointer">
                Unreviewed
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                id="accepted"
                checked={tempSelectedStates.includes(RegisterEntryState.ACCEPTED)}
                onCheckedChange={() => handleStateToggle(RegisterEntryState.ACCEPTED)}
                className="border-zinc-600 data-[state=checked]:bg-zinc-600"
                />
                <label htmlFor="accepted" className="text-sm font-medium text-zinc-100 cursor-pointer">
                Accepted
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                id="denied"
                checked={tempSelectedStates.includes(RegisterEntryState.DENIED)}
                onCheckedChange={() => handleStateToggle(RegisterEntryState.DENIED)}
                className="border-zinc-600 data-[state=checked]:bg-zinc-600"
                />
                <label htmlFor="denied" className="text-sm font-medium text-zinc-100 cursor-pointer">
                Denied
                </label>
            </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    className="border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                    onClick={clearFilters}
                >
                    Clear Filters
                </Button>
                <Button
                    variant="outline"
                    className="border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                    onClick={applyFilters}
                >
                    Apply Filters
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

