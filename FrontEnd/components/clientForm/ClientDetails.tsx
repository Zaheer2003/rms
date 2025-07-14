import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ClientFormState } from "@/app/clients/add/page";

const ClientDetails: React.FC<{
  form: ClientFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Partial<Record<keyof ClientFormState, string>>;
}> = ({ form, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
          <Input type="text" id="firstName" name="firstName" required placeholder="Enter first name" value={form.firstName} onChange={onChange} aria-invalid={!!errors?.firstName} />
          {errors?.firstName && <div className="text-xs text-red-500 mt-1">{errors.firstName}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
          <Input type="text" id="lastName" name="lastName" required placeholder="Enter last name" value={form.lastName} onChange={onChange} aria-invalid={!!errors?.lastName} />
          {errors?.lastName && <div className="text-xs text-red-500 mt-1">{errors.lastName}</div>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
        <Input type="tel" id="mobile" name="mobile" required placeholder="Enter mobile number" value={form.mobile} onChange={onChange} aria-invalid={!!errors?.mobile} />
        {errors?.mobile && <div className="text-xs text-red-500 mt-1">{errors.mobile}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="address1">Address Line 1</Label>
        <Input type="text" id="address1" name="address1" required placeholder="Enter address line 1" value={form.address1} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address2">Address Line 2</Label>
        <Input type="text" id="address2" name="address2" placeholder="Enter address line 2" value={form.address2} onChange={onChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" name="city" required placeholder="Enter city" value={form.city} onChange={onChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input type="text" id="state" name="state" required placeholder="Enter state" value={form.state} onChange={onChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input type="text" id="postalCode" name="postalCode" required placeholder="Enter postal code" value={form.postalCode} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input type="text" id="country" name="country" required placeholder="Enter country" value={form.country} onChange={onChange} />
      </div>
    </div>
  );
};

export default ClientDetails;
