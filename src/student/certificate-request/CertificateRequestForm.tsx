import { useState, type FormEvent } from "react"
import { IdentificationIcon, PaperClipIcon } from '@heroicons/react/24/outline'
import { CreateRegisterEntryRequest } from "../../schemas/RegisterEntrySchema"
import { createRegisterEntry } from "../../services/RegisterEntriesService"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { toast } from "sonner"

export default function CertificateRequestForm({ onSuccess }: { onSuccess: () => void }) {
  const [serialNumber, setSerialNumber] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const request: CreateRegisterEntryRequest = {
      studentSerialNumber: parseInt(serialNumber),
      dateOfIssue: new Date(),
      reason: reason
    }
    
    try {
      const response = await createRegisterEntry(request)

      if (response) {
        onSuccess();
        toast.success("Certificate request submitted successfully")
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      else {
        toast.error('Failed to create register entry');
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-[450px] bg-neutral-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-zinc-200">
          Certificate Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="serialNumber" className="flex items-center gap-1 text-zinc-200">
              <IdentificationIcon className="w-4 h-4" />
              Serial Number
            </Label>
            <Input
              id="serialNumber"
              type="text"
              maxLength={16}
              value={serialNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setSerialNumber(value);
                }
              }}
              required
              placeholder="Enter serial number"
              className="bg-neutral-800 text-zinc-300 border-zinc-700 placeholder:text-zinc-600 text-center"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason" className="flex items-center gap-1 text-zinc-200">
              <PaperClipIcon className="w-4 h-4" />
              Reason
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Enter reason"
              maxLength={64}
              className="h-24 resize-none bg-neutral-800 text-zinc-300 border-zinc-700 placeholder:text-zinc-600 text-center"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}