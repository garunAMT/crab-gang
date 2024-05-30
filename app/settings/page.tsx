import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { redirect } from "next/navigation";
import { SettingsForm } from "../components/SettingsForm";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        }, select: {
            userName: true,
        }
    })
    return data
}

export default async function SettingsPage () {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
//  checking if the user is logged in or not. If not, redirecting to login page
    if(!user){
        return redirect("/api/auth/login")
    }
    const data = await getData(user.id)

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
{/* now why are we making a separate component for form? 
It's cause we need to show toast, so it means we have to create a client component. But if we make this file as a client component, we would not be able to fetch data. */}
        <SettingsForm username={data?.userName} />
  </div>
  )
}