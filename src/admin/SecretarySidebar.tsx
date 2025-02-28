import { Button } from "../components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "../components/ui/sidebar"
import { Link } from 'react-router-dom';
   
export function SecretarySidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="pt-4 bg-neutral-900 text-white text-xl font-semibold text-center">
                Secretary Menu
            </SidebarHeader>
            <SidebarContent  className="bg-neutral-900 flex flex-col p-4">
                <Link to="/admin/certificate-templates">
                    <Button variant="secondary" className="w-full">Templates</Button>
                </Link>
                <Link to="/admin/register-entries">
                    <Button variant="secondary" className="w-full">Requests</Button>
                </Link>
            </SidebarContent>
        </Sidebar>
    )
}