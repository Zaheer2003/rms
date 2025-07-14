"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Barcode } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";

export default function BarcodeSettingsPage() {
  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [enableWeight, setEnableWeight] = useState(false);
  const [embeddedFormat, setEmbeddedFormat] = useState("");
  const [weightDivider, setWeightDivider] = useState(1000);
  const [currencyDivider, setCurrencyDivider] = useState(100);

  useEffect(() => {
    const token = Cookies.get("token");
    axios.get("http://localhost:8000/api/barcode-settings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(res => {
        const data = res.data;
        setBarcodeType(data.type || "CODE128");
        setEnableWeight(!!data.enable_weight);
        setEmbeddedFormat(data.embedded_format || "");
        setWeightDivider(data.weight_divider || 1000);
        setCurrencyDivider(data.currency_divider || 100);
      });
  }, []);

  const handleSave = async () => {
    const token = Cookies.get("token");
    await axios.post("http://localhost:8000/api/barcode-settings", {
      type: barcodeType,
      enable_weight: enableWeight,
      embedded_format: embeddedFormat,
      weight_divider: weightDivider,
      currency_divider: currencyDivider,
    }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    alert("Barcode settings saved!");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-col items-center gap-2">
          <Barcode className="w-10 h-10 text-primary" />
          <CardTitle className="text-lg mt-2">Barcode Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="barcodeType">Barcode Type</Label>
            <Select value={barcodeType} onValueChange={setBarcodeType}>
              <SelectTrigger className="max-w-xs mt-1">
                <SelectValue placeholder="Select barcode type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CODE128">Code 128</SelectItem>
                <SelectItem value="EAN13">EAN 13</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="enableWeight"
              type="checkbox"
              title="Enable Weight Embedded Barcode"
              checked={enableWeight}
              onChange={e => setEnableWeight(e.target.checked)}
            />
            <Label htmlFor="enableWeight">Enable Weight Embedded Barcode</Label>
          </div>
          {enableWeight && (
            <div className="space-y-4 border rounded p-4 bg-muted/30">
              <div>
                <Label htmlFor="embeddedFormat">Embedded Barcode Format</Label>
                <Input
                  id="embeddedFormat"
                  placeholder="e.g. XXXXXXWWWWWPPPPN"
                  className="max-w-xs"
                  value={embeddedFormat}
                  onChange={e => setEmbeddedFormat(e.target.value)}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  X = Product, W = Weight, P = Price, N = Check digit. Example: XXXXXXWWWWWPPPPN
                </div>
              </div>
              <div>
                <Label htmlFor="weightDivider">Weight Unit Divider</Label>
                <Input
                  id="weightDivider"
                  type="number"
                  placeholder="e.g. 1000 (for grams to kg)"
                  className="max-w-xs"
                  value={weightDivider}
                  onChange={e => setWeightDivider(Number(e.target.value))}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Divider to convert weight digits to real units (e.g. 1000: 10000 → 10.000kg)
                </div>
              </div>
              <div>
                <Label htmlFor="currencyDivider">Currency Divider</Label>
                <Input
                  id="currencyDivider"
                  type="number"
                  placeholder="e.g. 100 (for cents to main currency)"
                  className="max-w-xs"
                  value={currencyDivider}
                  onChange={e => setCurrencyDivider(Number(e.target.value))}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Divider to convert price digits to real currency (e.g. 100: 1234 → 12.34)
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <div className="flex justify-end gap-2 px-6 pb-6">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="button" onClick={handleSave}>Save</Button>
        </div>
      </Card>
    </div>
  );
}
