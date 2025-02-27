import { useEffect, useState } from "react";
import { CertificateTemplate } from "../../schemas/CertificateTemplateSchema";
import { ColumnDef, Row } from "@tanstack/react-table"
import { DataTable } from "../../components/ui/data-table";
import { getAllRegisterEntries } from "../../services/RegisterEntriesService";
import { RegisterEntry } from "../../schemas/RegisterEntrySchema";
import { Student } from "../../schemas/StudentSchema";

export default function RegisterEntriesPage() {
    const [currentForm, setCurrentForm] = useState<'create' | 'update' | 'none'>('none');
    const [registerEntries, setRegisterEntries] = useState<RegisterEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchTemplates = async () => {
        try {
            const registerEntries = await getAllRegisterEntries();
            setRegisterEntries(registerEntries);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch register entries');
        } finally {
            setIsLoading(false);
        }
    };
    
    const columns: ColumnDef<RegisterEntry>[] = [
        {
            accessorKey: "id",
            header: "Id",
            size: 80
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
            header: "Serial Number",
            size: 100
        },
        {
            accessorKey: "student.firstName",
            header: "Student Name",
            accessorFn: (row) => `${row.student.firstName} ${row.student.lastName}`
        },
    ];
    
    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="flex flex-col gap-4 min-h-screen w-[700px]">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Certificate Templates</h1>
            {error && <div className="text-red-500">{error}</div>}
            {isLoading && <div>Loading...</div>}
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
        </div>
    )
}