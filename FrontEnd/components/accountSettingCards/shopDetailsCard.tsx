import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ShopDetailsCardProps {
  shop: {
    business_name: string;
    shop_type: string;
    shop_address: string;
    shop_workers: string;
    shop_currency: string;
    shop_country: string;
  };
}

export function ShopDetailsCard({ shop }: ShopDetailsCardProps) {
  return (
    <Card className="flex-1 w-full">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="details">Shop Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary font-semibold text-sm uppercase tracking-wider">Shop Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="business_name" className="text-xs text-muted-foreground">Business Name</Label>
              <Input id="business_name" value={shop.business_name} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="shop_type" className="text-xs text-muted-foreground">Type</Label>
              <Input id="shop_type" value={shop.shop_type} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="shop_address" className="text-xs text-muted-foreground">Address</Label>
              <Input id="shop_address" value={shop.shop_address} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="shop_workers" className="text-xs text-muted-foreground">Workers</Label>
              <Input id="shop_workers" value={shop.shop_workers} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="shop_currency" className="text-xs text-muted-foreground">Currency</Label>
              <Input id="shop_currency" value={shop.shop_currency} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="shop_country" className="text-xs text-muted-foreground">Country</Label>
              <Input id="shop_country" value={shop.shop_country} readOnly className="mt-1" />
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="security">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary font-semibold text-sm uppercase tracking-wider">Security</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm">Security settings and features for your shop will appear here.</div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
