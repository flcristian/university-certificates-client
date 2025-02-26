import CertificateTemplatePage from "./certificate-templates/CertificateTemplatePage";

export default function SecretaryPage() {
    return (
        <div className="flex items-start h-full bg-neutral-800">
            <div className="flex flex-col w-full min-h-screen gap-8 p-8">
                <CertificateTemplatePage />
            </div>
        </div>
    )
}