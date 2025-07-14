import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AccountUserAvatar } from "@/components/AccountUserAvatar"

interface UserDetailsCardProps {
  name: string;
  email: string;
  avatar?: string;
}

export function UserDetailsCard({ name, email, avatar }: UserDetailsCardProps) {
  // Example interactive handler (edit button)
  const handleEdit = () => {
    alert("Edit user details coming soon!");
  };

  return (
    <Card className="w-full max-w-md mx-auto p-0 overflow-hidden shadow-lg border bg-white">
      <CardContent className="flex flex-col items-center pt-8 pb-6">
        <AccountUserAvatar name={name} avatar={avatar} className="w-24 h-24" />
        <div className="mt-4 text-center">
          <div className="font-semibold text-lg">{name}</div>
          <div className="text-muted-foreground text-sm">Customer ID #634759</div>
        </div>
        <div className="flex justify-center gap-8 mt-6 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">184</span>
            <span className="text-xs text-muted-foreground">Orders</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">$12,378</span>
            <span className="text-xs text-muted-foreground">Spent</span>
          </div>
        </div>
        <div className="w-full border-t pt-4 mt-2">
          <div className="text-left text-base font-semibold mb-2">Details</div>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <Label htmlFor="username" className="text-xs text-muted-foreground">Username</Label>
              <Input id="username" value={name.toLowerCase().replace(/\s/g, ".")} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
              <Input id="email" value={email} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contact" className="text-xs text-muted-foreground">Contact</Label>
              <Input id="contact" value="(123) 456-7890" readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="avatar-upload" className="text-xs text-muted-foreground">Upload Image</Label>
              <Input id="avatar-upload" type="file" accept="image/*" className="mt-1" />
            </div>
          </div>
        </div>
        <button
          className="w-full mt-4 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition"
          onClick={handleEdit}
        >
          Edit Details
        </button>
      </CardContent>
    </Card>
  );
}
