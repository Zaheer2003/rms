import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftSquareIcon } from "lucide-react";

export default function BackBtn() {
  const router = useRouter();
   
   return(
    <Button
    className="bg-yellow-400"
    onClick={() => {
        router.back();
    }}
    >
        <ArrowLeftSquareIcon/>
        Back
    </Button>
   )

}