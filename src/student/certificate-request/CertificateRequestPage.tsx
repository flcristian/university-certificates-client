import { useState } from "react";
import CertificateRequestForm from "./CertificateRequestForm";
import CertificateRequestCompleted from "./CertificateRequestCompleted";

export default function CertificateRequestPage() {
    const [success, setSuccess] = useState(false);
    
    return (
        <div className="bg-neutral-800 flex items-center justify-center h-screen">
            <div className="flex flex-col justify-center gap-8">
                {!success ? (
                    <CertificateRequestForm onSuccess={() => setSuccess(true)}/>
                ) : (
                    <CertificateRequestCompleted onBack={() => setSuccess(true)}/>
                )}
            </div>
        </div>
    )
}