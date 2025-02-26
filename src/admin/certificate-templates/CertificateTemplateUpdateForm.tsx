import { useEffect, useState, type FormEvent } from "react"
import { ArrowUpTrayIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card"
import { toast } from "sonner"
import { updateCertificateTemplate } from "../../services/CertificateTemplatesService"

export default function CertificateTemplateUpdateForm({ 
  id,
  initialDescription
}: {
  id: number,
  initialDescription: string
}) {
  const [description, setDescription] = useState(initialDescription)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setDescription(initialDescription)
  }, [initialDescription])
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file && description === initialDescription) {
      toast.error("No changes detected")
      return
    }
    
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('id', id.toString())
    
    if (description !== initialDescription) {
      formData.append('description', description)
    }
    
    if (file) {
      formData.append('file', file)
    }
    
    try {
      await updateCertificateTemplate(formData)
      setFile(null)
      setDescription("")
      toast.success("Template updated successfully")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-[450px] bg-neutral-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-200 text-center">
          Edit Certificate Template
        </CardTitle>
        <CardDescription className="text-zinc-400 text-center text-lg">
          {"Update Certificate Template | ID: " + id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-200 flex gap-1 items-center">
              <InformationCircleIcon className="w-4 h-4" />
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="bg-neutral-800 text-zinc-300 border-zinc-700 placeholder:text-zinc-600 resize-none h-24"
            />
          </div>

          <div className="space-y-2 flex flex-col gap-2">
            <Label htmlFor="file" className="text-zinc-200 flex gap-1 items-center">
              <ArrowUpTrayIcon className="w-4 h-4" />
              Template File
            </Label>
            <div className="relative">
            <Input
              id="file"
              type="file"
              accept=".docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
              <label
                htmlFor="file"
                className="bg-white text-black rounded-lg px-4 py-2 cursor-pointer"
              >
                Choose File
              </label>
              <span className="text-zinc-300 ml-2">
                {file ? file.name : 'No file chosen'}
              </span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting || (!file && description === initialDescription)}
            className="w-full bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}