import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { SecretarySidebar } from "./SecretarySidebar";
import CertificateTemplatesPage from "./certificate-templates/CertificateTemplatesPage";
import RegisterEntriesPage from "./register-entries/RegisterEntriesPage";
import { Button } from "../components/ui/button";
import { setAuth } from "../utility/authUtility";

export default function SecretaryPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(false);
        navigate("/student");
    };
    
    return (
        <>
            <SidebarProvider className="bg-neutral-800">
                <div className="flex items-start w-full h-full bg-neutral-800">
                    <SecretarySidebar/>
                    <div className="flex flex-col w-full min-h-screen gap-8 p-8">
                    <Routes>
                        <Route path="/" element={<Navigate to="certificate-templates" replace />} />
                        <Route path="certificate-templates" element={<CertificateTemplatesPage />} />
                        <Route path="register-entries" element={<RegisterEntriesPage />} />
                    </Routes>
                    </div>
                </div>
            </SidebarProvider>
            <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="absolute top-6 right-10 text-zinc-100 transition-all"
            >
                Log Out
            </Button>
        </>
    )
}