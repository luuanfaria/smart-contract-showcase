'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from './ui/textarea'
import { ChangeEvent, useState } from 'react'
import { openRequest } from '@/services/Web3Service'
import { useToast } from './ui/use-toast'

export function Create() {
  const [request, setRequest] = useState({
    title: '',
    description: '',
    contact: '',
    goal: 0,
  })
  const { toast } = useToast()

  function handleChangeInput(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setRequest((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  function handleCreateRequest() {
    openRequest(request)
      .then(() => {
        toast({
          title: 'Request sent',
          description: 'This request should be available in a few minutes.',
        })
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: 'Something went wrong',
          description: err.message,
          variant: 'destructive',
        })
      })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Campaign</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Campaign</SheetTitle>
          <SheetDescription>
            Fill all necessary information and click create when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={request.title}
              className="col-span-3"
              placeholder="Ex.: Donate to street dogs"
              onChange={handleChangeInput}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={request.description}
              className="col-span-3"
              placeholder="Ex.: By helping this campaign, you are helping street dogs."
              onChange={handleChangeInput}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact" className="text-right">
              Contact
            </Label>
            <Input
              id="contact"
              value={request.contact}
              className="col-span-3"
              placeholder="Phone number or email"
              onChange={handleChangeInput}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
            <Input
              id="goal"
              type="number"
              value={request.goal}
              className="col-span-3"
              placeholder="Your campaign goal in BNB"
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleCreateRequest}>
              Create
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
