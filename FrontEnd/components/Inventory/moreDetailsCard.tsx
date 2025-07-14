import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { X } from 'lucide-react'

function MoreDetailsCard() {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  return (
    <Card className="border-2 rounded-xl shadow-md bg-white">
      <CardHeader className="bg-slate-100 border-0 p-4 mb-4 rounded-t-xl">
        <CardTitle>More Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mt-2">
          <Label htmlFor='internalNotes'>Internal Notes</Label>
          <Textarea id='internalNotes' placeholder='Internal Notes' className='w-full focus:ring-2 focus:ring-primary'/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className='space-y-2'>
            <Label htmlFor='status'>Status</Label>
            <Select>
              <SelectTrigger id='status'>
                <SelectValue placeholder="Select Item Status"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inActive'>In Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='tags'>Tags</Label>
            <div className='flex flex-wrap gap-2 mb-1'>
              {tags.map(tag => (
                <span key={tag} className='flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs shadow-sm'>
                  {tag}
                  <button type='button' className='ml-1' onClick={() => removeTag(tag)} title={`Remove tag ${tag}`}>
                    <X className='w-3 h-3' />
                  </button>
                </span>
              ))}
            </div>
            <Input
              type='text'
              id='tags'
              name='tags'
              placeholder='Type and press Enter or comma'
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              className='w-full focus:ring-2 focus:ring-primary'
              autoComplete='off'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MoreDetailsCard