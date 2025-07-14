import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'

// Define a type for the form props
interface ClientAccountForm {
  code: string;
  email: string;
  currency?: string;
  category?: string;
  invoicingMethod?: string;
  notes?: string;
  status?: string;
  allowAccess?: boolean;
  sendCredentials?: boolean;
  role?: string;
}

interface ClientAccountCardProps {
  form: ClientAccountForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange?: (name: string, value: string) => void;
}

function ClientAccountCard({ form, onChange, onSelectChange }: ClientAccountCardProps) {
  // Local state for checkboxes if not managed by parent
  const [allowAccess, setAllowAccess] = React.useState(form.allowAccess || false);
  const [sendCredentials, setSendCredentials] = React.useState(form.sendCredentials || false);

  React.useEffect(() => {
    if (onChange) {
      // Simulate event for allowAccess
      onChange({
        target: { name: 'allowAccess', value: allowAccess } 
      } as any);
      onChange({
        target: { name: 'sendCredentials', value: sendCredentials } 
      } as any);
    }
  }, [allowAccess, sendCredentials]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label>Code Number</Label>
            <Input type='number' id='code' name='code' placeholder='Client Code Number' required value={form.code} onChange={onChange}/>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' name='email' placeholder='Enter Client Email Address' value={form.email} onChange={onChange}/>   
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div className='space-y-2'>
            <Label htmlFor='currency'>Currency</Label>
            <Select value={form.currency || ''} onValueChange={val => onSelectChange && onSelectChange('currency', val)}>
              <SelectTrigger id='currency'>
                <SelectValue placeholder="Select Client Currency"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='lkr'>LKR - Rupees</SelectItem>
                <SelectItem value='ind'>IND - Rupees</SelectItem>
                <SelectItem value='qtr'>QTR - Riyal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='category'>Category</Label>
            <Select value={form.category || ''} onValueChange={val => onSelectChange && onSelectChange('category', val)}>
              <SelectTrigger id='category'>
                <SelectValue placeholder="Select Client Category Type"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='retail'>Retail</SelectItem>
                <SelectItem value='wholesale'>Wholesale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='space-y-2 mt-4'>
          <Label htmlFor='invoicingMethod'>Invoicing Method</Label>
          <Select value={form.invoicingMethod || ''} onValueChange={val => onSelectChange && onSelectChange('invoicingMethod', val)}>
            <SelectTrigger id='invoicingMethod'>
              <SelectValue placeholder="Select Client Invoicing Method"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='print'>Print</SelectItem>
              <SelectItem value='email'>Email</SelectItem>
              <SelectItem value='whatsapp'>Whatsapp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2 mt-4'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea id='notes' name='notes' className='w-full' placeholder='Enter Additional Notes' value={form.notes || ''} onChange={onChange}/>
        </div>
        <div className='space-y-2 mt-4'>
          <Label htmlFor='status'>Status</Label>
          <Select value={form.status || ''} onValueChange={val => onSelectChange && onSelectChange('status', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Access Checkboxes */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <div className='flex items-center gap-2'>
            <Checkbox
              id='allowAccess'
              checked={allowAccess}
              onCheckedChange={value => setAllowAccess(!!value)}
            />
            <Label htmlFor='allowAccess'>Allow access to the system</Label>
          </div>
          {allowAccess && (
            <div className='flex items-center gap-2'>
              <Checkbox
                id='sendCredentials'
                checked={sendCredentials}
                onCheckedChange={value => setSendCredentials(!!value)}
              />
              <Label htmlFor='sendCredentials'>Send credentials to client</Label>
            </div>
          )}
        </div>
        {/* Role (auto-select Client) */}
        {allowAccess && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <div>
              <Label htmlFor='role'>Role <span className='text-red-500'>*</span></Label>
              <Select value='Client' disabled>
                <SelectTrigger>
                  <SelectValue placeholder='Client' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Client'>Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ClientAccountCard