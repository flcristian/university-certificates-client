import CertificateTemplatePage from "./certificate-templates/CertificateTemplatePage";
import SecretaryNavigation from "./SecretaryNavigation";

export default function SecretaryPage() {
    return (
        <div className="bg-neutral-800 flex items-start h-full">
            <div className="w-full p-8 flex flex-col gap-8">
                <CertificateTemplatePage />
            </div>
        </div>
    )
}