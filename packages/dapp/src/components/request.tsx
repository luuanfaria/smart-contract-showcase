'use client'
import Image from 'next/image'
import { generateAvatarURL } from '@cfx-kit/wallet-avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { EllipsisVertical } from 'lucide-react'
import Web3 from 'web3'
import { Button } from './ui/button'
import { closeRequest, sendDonate } from '@/services/Web3Service'
import { toast } from './ui/use-toast'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { ChangeEvent, useState } from 'react'
import { formatDistance } from 'date-fns'
import { Badge } from './ui/badge'

interface RequestProps {
  data: {
    id: number
    title: string
    description: string
    author: string
    balance: string
    goal: number
    timestamp: string
  }
}

export default function Request({ data }: RequestProps) {
  const [donationValue, setDonationValue] = useState<string>('')
  const [balance, setBalance] = useState<string>(data.balance)

  function handleCloseCampaing() {
    closeRequest(data.id)
      .then(() => {
        toast({
          title: 'Your Campaign was Closed Successfully!',
          description: 'This process might take a little time.',
        })
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: 'Error on close Campaign',
          description: err.message,
          variant: 'destructive',
        })
      })
  }

  function handleSendDonate() {
    const donationInBnb = donationValue
    sendDonate(data.id, donationInBnb)
      .then(() => {
        toast({
          title: 'Your Donation was Sent Successfully!',
          description: 'Congratulations!',
        })

        setBalance((prevBalance) => {
          const updatedBalance =
            BigInt(prevBalance) +
            BigInt(Web3.utils.toWei(donationInBnb, 'ether'))
          return updatedBalance.toString()
        })

        setDonationValue('0')
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: 'Error on send donate',
          description: err.message,
          variant: 'destructive',
        })
      })
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    if (value === '' || !isNaN(Number(value))) {
      setDonationValue(value)
    }
  }

  return (
    <>
      <div className="flex gap-3 py-3 items-center w-full hover:drop-shadow-sm hover:cursor-pointer">
        <Image
          src={generateAvatarURL(data.author)}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-1 flex-col">
          <p>{data.title}</p>
          <span className="text-xs font-light text-zinc-500">
            {data.description}
          </span>
        </div>

        {localStorage.getItem('wallet') === data.author.toLowerCase() ? (
          <Dialog>
            <DialogTrigger>
              <EllipsisVertical />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Your Campaign Details</DialogTitle>
                <DialogDescription>
                  Here is all the information about your campaign. You can view,
                  donate, and close it.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <Label>
                    Created{' '}
                    {formatDistance(
                      new Date(Number(data.timestamp) * 1000),
                      new Date(),
                      {
                        addSuffix: true,
                      },
                    )}
                  </Label>
                </div>

                <div>
                  <Label>Goal</Label>
                  {data.balance ? (
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary">
                        BNB {Web3.utils.fromWei(balance, 'ether')}
                      </Badge>
                      <small>from</small>
                      <Badge variant="secondary">
                        BNB {Web3.utils.fromWei(data.goal, 'ether')}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary">
                        BNB {Web3.utils.fromWei(data.goal, 'ether')}
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="amount" className="text-left">
                    Donation Amount
                  </Label>
                  <Input
                    id="amount"
                    value={donationValue}
                    className="col-span-3"
                    placeholder="Ex.: 10"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCloseCampaing}>
                  Close Campaign
                </Button>
                <Button type="submit" onClick={handleSendDonate}>
                  Send Donation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog>
            <DialogTrigger>
              <EllipsisVertical />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About this Campaign</DialogTitle>
                <DialogDescription>
                  Here you can see all the details about this campaign and send
                  a donation.
                </DialogDescription>
              </DialogHeader>

              <div>
                <Label htmlFor="amount" className="text-right">
                  Donation Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={donationValue}
                  className="col-span-3"
                  placeholder="Ex.: 10"
                  onChange={handleChangeInput}
                />
              </div>

              <DialogFooter>
                <Button type="submit" onClick={handleSendDonate}>
                  Send Donation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  )
}
