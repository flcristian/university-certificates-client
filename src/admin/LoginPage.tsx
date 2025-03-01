import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utility/authUtility";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            if (password === "123456") {
                setAuth(true);
                navigate("/admin");
            } else {
                toast.error("Invalid password");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-800">
            <Card className="w-[300px] items-center bg-neutral-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 text-zinc-200">
                        Admin Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <Label 
                            htmlFor="password" 
                            className="flex items-center gap-1 text-zinc-200"
                        >
                            <LockClosedIcon className="w-4 h-4" />
                            Password
                        </Label>
                        <InputOTP
                            value={password}
                            onChange={setPassword}
                            maxLength={6}
                        >
                            <InputOTPGroup className="text-zinc-100 placeholder-zinc-100">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="flex gap-2">
                            <Button 
                                variant="ghost"
                                onClick={() => navigate("/")} 
                                className="w-full text-zinc-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="secondary"
                                disabled={isSubmitting}
                                className="w-full"
                                onClick={handleSubmit}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}