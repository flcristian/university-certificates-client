import { useEffect, useState } from "react";
import { CertificateTemplate } from "../../schemas/CertificateTemplateSchema";
import CertificateTemplateForm from "./CertificateTemplateForm";
import CertificateTemplateUpdateForm from "./CertificateTemplateUpdateForm";
import { Button } from "../../components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table"
import { DataTable } from "../../components/ui/data-table";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";
import { PencilIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "lucide-react";
import { getAllCertificateTemplates, updateCertificateTemplate } from "../../services/CertificateTemplatesService";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card";

export default function CertificateTemplatePage() {
    const [currentForm, setCurrentForm] = useState<'create' | 'update' | 'none'>('none');
    const [selectedTemplate, setSelectedTemplate] = useState<Row<CertificateTemplate> | null>(null);
    const [certificateTemplates, setCertificateTemplates] = useState<CertificateTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchTemplates = async () => {
        try {
            const templates = await getAllCertificateTemplates();
            setCertificateTemplates(templates);
        } catch (error: unknown) {
            if(error instanceof Error) {
                setError(error.message);
            }
            else {
                setError('Failed to retrieve certificate templates');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateTemplatesAfterFormSubmittion = async () => {
        await fetchTemplates();
        setCurrentForm('none');
    }
    
    const columns: ColumnDef<CertificateTemplate>[] = [
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                const description = row.getValue("description") as string;
                return (
                    <HoverCard>
                        <HoverCardTrigger className="cursor-pointer">{description.substring(0, 30)}</HoverCardTrigger>
                        <HoverCardContent className="border-2 w-80 bg-zinc-900 text-zinc-100">
                            <p className="text-sm break-words whitespace-normal">
                                {description}
                            </p>
                        </HoverCardContent>
                    </HoverCard>
                );
            }
        },
        {
            accessorKey: "active",
            header: "Active",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 cursor-pointer">
                    <Switch className="cursor-pointer" checked={row.getValue("active")} onCheckedChange={async (checked) => {
                        const formData = new FormData();
                        formData.append('id', row.getValue("id"));
                        formData.append('active', checked.toString());
                        try {
                            await updateCertificateTemplate(formData)
                            toast.success(`Template ${checked ? 'activated' : 'deactivated'} successfully`)
                        } catch (error: unknown) {
                            if (error instanceof Error) {
                                toast.error(error.message)
                            }
                            toast.error(`Error ${checked ? 'activating' : 'deactivating'} template`)
                        }
                        await fetchTemplates();
                    }}/>
                </div>
            )
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-4">
                    <Button variant="ghost" onClick={() => {
                        setSelectedTemplate(row);
                        setCurrentForm('update');
                    }}><PencilIcon/></Button>

                    <a href={`http://localhost:8080/api/v1/CertificateTemplates/certificate-template/${row.getValue("id")}/file`} target="_blank">
                        <Button variant="ghost">
                            <EyeIcon/>
                        </Button>
                    </a>
                    
                    {/* <AlertDialog>
                        <AlertDialogTrigger>
                            <div className="p-2 transition-all rounded-md cursor-pointer hover:bg-white hover:text-black">
                                <TrashIcon className="w-4"/>
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently (soft) delete the certificate template. Existing certificates will still use this template.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={async () => {
                                    try {
                                        await deleteCertificateTemplate(row.getValue("id"));
                                        toast.success("Template deleted successfully")
                                        await fetchTemplates();
                                    }
                                    catch (error) {
                                        if (error instanceof AxiosError && error.response) {
                                            toast.error(error.response.data)
                                        }
                                        toast.error(`Error deleting template`)
                                    }
                                }}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog> */}
                </div>
            )
        }
    ];
    
    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="flex flex-col gap-4 min-h-screen w-[700px]">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Certificate Templates</h1>
            <div className="flex self-start gap-4">
                <Button variant="outline" onClick={() => setCurrentForm('create')}>Upload Template</Button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {isLoading && <div className="text-zinc-100">Loading...</div>}
            {!error && !isLoading &&
                <div className="w-full">
                    <DataTable
                        columns={columns}
                        data={certificateTemplates} />
                </div>}
            {currentForm !== 'none' && (
                <div className="relative w-fit">
                    <h1 className="absolute text-4xl text-white cursor-pointer right-4 top-1" onClick={() => setCurrentForm('none')}>x</h1>
                    {currentForm === 'create' && <CertificateTemplateForm onSuccess={updateTemplatesAfterFormSubmittion}/>}
                    {currentForm === 'update' && <CertificateTemplateUpdateForm onSuccess={updateTemplatesAfterFormSubmittion} id={selectedTemplate!.getValue("id")} initialDescription={selectedTemplate!.getValue("description")} />}
                </div>
            )}
        </div>
    )
}