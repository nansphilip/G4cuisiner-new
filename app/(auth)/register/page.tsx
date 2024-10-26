import RegisterClient from "@app/(auth)/register/client";
import Button from "@comps/client/button";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {

    const session = await getSession();
    if (session) redirect("/dashboard");

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">Register</h2>
                <p className="text-center text-xs text-gray-500">Register with your personal informations.</p>
                <RegisterClient className="flex w-[240px] flex-col items-center justify-center gap-2" />
                <Button type="link" variant="link" ring="none" fontSize="sm" href="/login">
                    Already registered?
                </Button>
            </div>
        </>
    );
}