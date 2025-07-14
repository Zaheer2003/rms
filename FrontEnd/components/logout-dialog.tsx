"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"

export function LogoutDialog() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    const token = Cookies.get("token")
    if (!token) {
      // No token found, just clear and redirect
      localStorage.clear()
      Cookies.remove("token")
      toast({
        title: "Logged out",
        description: "You have been logged out.",
      })
      router.push("/auth")
      return
    }

    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      // On success clear storage & token cookie
      localStorage.clear()
      Cookies.remove("token")

      toast({
        title: "Logout Successful",
        description: "You have been logged out and redirected to login.",
      })

      router.push("/auth")
    } catch (error) {
      // If error occurs, still clear token and redirect
      localStorage.clear()
      Cookies.remove("token")

      toast({
        title: "Logout Failed",
        description: "There was an error logging out, but you've been signed out locally.",
        variant: "destructive",
      })

      router.push("/auth")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex w-full items-center gap-2 py-1.5 px-2 text-sm text-red-600 hover:bg-muted rounded-md cursor-pointer">
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log you out and redirect you to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
