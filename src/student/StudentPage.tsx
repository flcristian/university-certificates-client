import { Link, Navigate, Route, Routes } from "react-router-dom";
import CertificateRequestPage from "./certificate-request/CertificateRequestPage";
import { Button } from "../components/ui/button";

export default function StudentPage() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="certificate-request" replace />} />
                <Route path="certificate-request" element={<CertificateRequestPage />} />
            </Routes>
            <Link to='/login' className='absolute top-6 right-10'>
                <Button variant="ghost" className="text-zinc-100 transition-all">Admin</Button>
            </Link>
        </>
    )
}