import { useState, type FormEvent } from "react"
import { CheckBadgeIcon, IdentificationIcon, PaperClipIcon } from '@heroicons/react/24/outline'

export default function CertificateRequestForm() {
  const [serialNumber, setSerialNumber] = useState("")
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const payload = {
      studentSerialNumber: parseInt(serialNumber),
      dateOfIssue: new Date().toISOString(),
      reason
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/RegisterEntries/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
   
      setError("");
      const data = await response.text()
      
      if (!response.ok) {
        console.error('Error response:', data)
        throw new Error(data)
      }
      setSuccess(true)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <div className="flex flex-col justify-center gap-8">
      {!success ? (
        <>
          <div className="flex gap-2 justify-center items-center">
            <h1 className="text-3xl font-bold text-zinc-200">Certificate Request</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[400px]">
            <div className="flex flex-col gap-1 text-start">
              <label htmlFor="serialNumber" className="flex gap-1 items-center">
                <IdentificationIcon className="w-5 text-zinc-200"/>
                <p className="text-zinc-200 text-sm font-medium">Serial Number</p>
              </label>
              <input
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
                className="w-full px-3 py-2 bg-neutral-900 text-zinc-300 placeholder-zinc-700 rounded-lg border border-zinc-700 focus:outline-none focus:border-zinc-700 text-center"
              />
            </div>
            <div className="flex flex-col gap-1 text-start">
              <label htmlFor="serialNumber" className="flex gap-1 items-center">
                <PaperClipIcon className="w-5 text-zinc-200"/>
                <p className="text-zinc-200 text-sm font-medium">Reason</p>
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="Enter reason"
                maxLength={64}
                className="w-full h-24 px-3 py-2 bg-neutral-900 text-zinc-300 placeholder-zinc-700 rounded-lg border border-zinc-700 focus:outline-none focus:border-zinc-700 resize-none text-center"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer text-zinc-200 bg-neutral-900 rounded hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Submit
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-2 items-center">
                <CheckBadgeIcon className="w-8 text-green-500"/>
                <h1 className="text-zinc-200 font-bold text-lg">Success!</h1>
              </div>
              <p className="text-zinc-200 text-lg">Your certificate request has been submitted successfully.</p>
            </div>
            <p className="text-zinc-200 text-sm w-[300px]">Once your certificate has been accepted, you will receive an e-mail with the document.</p>
          </div>
        </>
      )}
    </div>
  )
}

