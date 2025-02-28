import { useEffect, useState } from "react";
import { CertificateTemplate } from "../../schemas/CertificateTemplateSchema";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../../components/ui/data-table";
import { getAllRegisterEntries, updateRegisterEntry } from "../../services/RegisterEntriesService";
import { AcceptRegisterEntryRequest, DenyRegisterEntryRequest, RegisterEntry } from "../../schemas/RegisterEntrySchema";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { getAllCertificateTemplates } from "../../services/CertificateTemplatesService";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { DegreeType } from "../../enums/DegreeType";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { toast } from "sonner";

export default function RegisterEntriesPage() {
    const [currentForm, setCurrentForm] = useState<'create' | 'update' | 'none'>('none');
    const [registerEntries, setRegisterEntries] = useState<RegisterEntry[]>([]);
    const [availableTemplates, setAvailableTemplates] = useState<CertificateTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRegisterEntry, setSelectedRegisterEntry] = useState<RegisterEntry | null>(null);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(undefined);
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [denyPopupOpen, setDenyPopupOpen] = useState(false);
    const [acceptPopupOpen, setAcceptPopupOpen] = useState(false);
    
    const fetchRegisterEntries = async () => {
        try {
            const registerEntries = await getAllRegisterEntries();
            setRegisterEntries(registerEntries);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError('Failed to retrieve register entries');
            }
        }
    };

    const fetchAvailableTemplates = async () => {
        try {
            const templates = await getAllCertificateTemplates();
            setAvailableTemplates(templates);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            else {
                toast.error('Failed to retrieve certificate templates');
            }
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([fetchRegisterEntries(), fetchAvailableTemplates()]);
            setIsLoading(false);
        };
        
        fetchData();
    }, []);
    
    const columns: ColumnDef<RegisterEntry>[] = [
        {
            accessorKey: "id",
            header: "Id",
            size: 50
        },
        {
            accessorKey: "dateOfIssue",
            header: "Date of Issue",
            cell: ({ row }) => {
                const date = new Date(row.getValue("dateOfIssue"));
                return (
                    <div className="flex items-center gap-2">
                        {date.toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </div>
                );
            },
            size: 50
        },
        {
            accessorKey: "studentSerialNumber",
            header: "Student Serial Number",
            size: 100
        },
        {
            accessorKey: "student.firstName",
            header: "Student Name",
            accessorFn: (row) => `${row.student.firstName} ${row.student.lastName}`
        },
        {
            accessorKey: "reason",
            header: "Reason",
            size: 250
        },
        {
            accessorKey: "accepted",
            header: "Accepted",
            cell: ({ row }) => {
                const accepted = row.original.accepted;
                const reviewed = row.original.reviewed;

                return (<div className="flex flex-col gap-2">
                    {!reviewed && (
                        <Button onClick={() => {
                            setSelectedRegisterEntry(row.original);
                            setReviewDialogOpen(true);
                        }} className="px-4 py-2 text-sm font-semibold transition-all rounded-md cursor-pointer text-zinc-100 bg-zinc-900 hover:bg-zinc-800">
                            Review
                        </Button>
                    )}
                    {reviewed && accepted && (
                        <Button variant="secondary">
                            Accepted
                        </Button>
                    )}
                    {reviewed && !accepted && (
                        <Button variant="destructive" disabled={true}>
                            Denied
                        </Button>
                    )}
                </div>);
            }
        }
    ];

    const closeDialog = () => {
        setReviewDialogOpen(false);
        setSelectedRegisterEntry(null);
        setSelectedTemplateId(undefined);
    }

    const denyRequest = async (id: number) => {
        const request: DenyRegisterEntryRequest = {
            id: id,
            accepted: false,
            reviewed: true
        }

        try {
            await updateRegisterEntry(request);
            await fetchRegisterEntries();
            toast.success('Request denied successfully');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
            else {
                toast.error('Failed to deny request');
            }
        }
    }

    const acceptRequest = async (id: number, templateId: string) => {
        const request: AcceptRegisterEntryRequest = {
            id: id,
            accepted: true,
            reviewed: true,
            selectedTemplateId: Number(templateId)
        };

        try {
            await updateRegisterEntry(request);
            await fetchRegisterEntries();
            toast.success('Request accepted successfully');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
            else {
                toast.error('Failed to accept request');
            }
        }
    }

    return (
        <div className="flex flex-col gap-4 min-h-screen w-[1200px]">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Certificate Templates</h1>
            {error && <div className="text-red-500">{error}</div>}
            {isLoading && <div className="text-zinc-100">Loading...</div>}
            {!error && !isLoading &&
                <div className="w-full">
                    <DataTable
                        columns={columns}
                        data={registerEntries} />
                </div>}
            {currentForm !== 'none' && (
                <div className="relative w-fit">
                    <h1 className="absolute text-4xl text-white cursor-pointer right-4 top-1" onClick={() => setCurrentForm('none')}>x</h1>
                </div>
            )}
            
            <Dialog open={reviewDialogOpen} onOpenChange={(isOpen) => setReviewDialogOpen(isOpen)}>
                <DialogContent className="border-zinc-600">
                    <DialogHeader>
                        <DialogTitle>Review Request</DialogTitle>
                        <DialogDescription>
                            If you are going to accept this request, you must select a template for this certificate.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRegisterEntry && (
                        <Card className="bg-zinc-900">
                            <CardHeader>
                                <CardTitle className="text-zinc-100">Student</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-zinc-100">
                                    <h1>Name:</h1>
                                    <h1>{selectedRegisterEntry!.student.firstName} {selectedRegisterEntry!.student.lastName}</h1>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-100">
                                    <h1>Email:</h1>
                                    <h1>{selectedRegisterEntry!.student.email}</h1>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-100">
                                    <h1>Study Year:</h1>
                                    <h1>{selectedRegisterEntry!.student.studyYear}</h1>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-100">
                                    <h1>Department:</h1>
                                    <h1>{selectedRegisterEntry!.student.department}</h1>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-100">
                                    <h1>Degree Type:</h1>
                                    <h1>{DegreeType[selectedRegisterEntry!.student.degreeType]}</h1>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div>
                        <Select onValueChange={(value) => setSelectedTemplateId(value)}>
                            <SelectTrigger className="w-64 text-zinc-100">
                                <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 text-zinc-100">
                                {availableTemplates.map(template => (
                                    <SelectItem className="cursor-pointer" value={`${template.id}`} key={template.id}>
                                        {template.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            className="text-zinc-100"
                            onClick={() => {
                               closeDialog();
                            }}
                        >
                            Cancel
                        </Button>
                        <div>
                            <Popover open={denyPopupOpen} onOpenChange={(isOpen) => setDenyPopupOpen(isOpen)}>
                                <PopoverTrigger>
                                    <div className="px-4 py-2 text-sm font-medium transition-all bg-red-600 rounded-md cursor-pointer text-zinc-100 hover:bg-red-800">
                                        Deny
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="bg-zinc-900 border-zinc-600">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-zinc-100">Are you sure you want to deny this request?</h1>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setDenyPopupOpen(false);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={async () => {
                                                    setDenyPopupOpen(false);
                                                    await denyRequest(selectedRegisterEntry!.id);
                                                    closeDialog();
                                                }}
                                            >
                                                Confirm
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Popover open={acceptPopupOpen} onOpenChange={(isOpen) => setAcceptPopupOpen(isOpen)}>
                                {selectedTemplateId ? (<PopoverTrigger>
                                    <div className="px-4 py-2 text-sm font-medium transition-all rounded-md cursor-pointer bg-zinc-100 text-zinc-900 hover:bg-zinc-300">
                                        Accept
                                    </div>
                                </PopoverTrigger>) : (
                                    <div className="px-4 py-2 text-sm font-medium transition-all rounded-md bg-zinc-300 text-zinc-900">
                                        Accept
                                    </div>
                                )}
                                <PopoverContent className="bg-zinc-900 border-zinc-600">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-zinc-100">Are you sure you want to deny this request?</h1>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setAcceptPopupOpen(false);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={async () => {
                                                    setAcceptPopupOpen(false);
                                                    await acceptRequest(selectedRegisterEntry!.id, selectedTemplateId!);
                                                    closeDialog();
                                                }}
                                            >
                                                Confirm
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}