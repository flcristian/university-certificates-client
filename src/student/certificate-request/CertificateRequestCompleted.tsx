import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/button";

export default function CertificateRequestCompleted({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-2 items-center">
                <CheckBadgeIcon className="w-8 text-green-500"/>
                <h1 className="text-zinc-200 font-bold text-lg">Success!</h1>
              </div>
              <p className="text-zinc-200 text-lg">Your certificate request has been submitted successfully.</p>
            </div>
            <p className="text-zinc-200 text-sm w-[300px]">Once your certificate has been accepted, you will receive an e-mail with the document.</p>
            <Button onClick={onBack}>Go back to the main page</Button>
        </div>
    )
}