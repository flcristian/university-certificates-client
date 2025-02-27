import { SidebarProvider } from "../components/ui/sidebar";
import { SecretarySidebar } from "./SecretarySidebar";

interface SecretaryPageProps {
    page: React.ComponentType;
}

export default function SecretaryPage({page: PageComponent}: SecretaryPageProps) {
    return (
        <SidebarProvider className="bg-neutral-800">
            <div className="flex items-start h-full bg-neutral-800">
                <SecretarySidebar/>
                <div className="flex flex-col w-full min-h-screen gap-8 p-8">
                    <PageComponent />
                </div>
            </div>
        </SidebarProvider>
    )
}