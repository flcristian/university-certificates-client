// CertificateTemplateForm.tsx
import { useState, type FormEvent } from "react"
import { DocumentIcon, ArrowUpTrayIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { toast } from "sonner"
import { createCertificateTemplate } from "../../services/CertificateTemplatesService"

export default function CertificateTemplateForm({ onSuccess }: { onSuccess: () => Promise<void> }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    if (file) formData.append('file', file)
    
    try {
      await createCertificateTemplate(formData)
      setName("")
      setDescription("")
      setFile(null)
      toast.success("Template uploaded successfully")
      await onSuccess()
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
        <CardTitle className="flex items-center justify-center gap-2 text-zinc-200">
          Upload Certificate Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-1 text-zinc-200">
              <DocumentIcon className="w-4 h-4" />
              Template Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter template name"
              className="bg-neutral-800 text-zinc-300 border-zinc-700 placeholder:text-zinc-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-1 text-zinc-200">
              <InformationCircleIcon className="w-4 h-4" />
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="h-24 resize-none bg-neutral-800 text-zinc-300 border-zinc-700 placeholder:text-zinc-600"
              maxLength={256}
            />
          </div>
          
          <div className="flex flex-col gap-2 space-y-2 ">
            <Label htmlFor="file" className="flex items-center gap-1 text-zinc-200">
              <ArrowUpTrayIcon className="w-4 h-4" />
              Template File
            </Label>
            <div className="relative">
              <Input
                id="file"
                type="file"
                accept=".docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="hidden"
              />
              <label
                htmlFor="file"
                className="px-4 py-2 text-black bg-white rounded-lg cursor-pointer"
              >
                Choose File
              </label>
              <span className="ml-2 text-zinc-300">
                {file ? file.name : 'No file chosen'}
              </span>
            </div>
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