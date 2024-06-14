'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Login } from '@/services/Web3Service'
import { useEffect, useState } from 'react'
import { Create } from './create'
import { generateAvatarURL } from '@cfx-kit/wallet-avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function Header() {
  const [wallet, setWallet] = useState('')

  useEffect(() => {
    setWallet(localStorage.getItem('wallet') || '')
  }, [])

  function handleLogin() {
    Login()
      .then((wallet) => setWallet(wallet))
      .catch((err) => {
        console.error(err)
        alert(err.message)
      })
  }

  function handleLogout() {
    localStorage.removeItem('wallet')
    window.location.reload()
  }

  return (
    <header className="bg-white p-3 text-black">
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/" className="justify-start">
            <span className="font-bold">Donation</span>With
            <span className="font-bold">Crypto</span>
          </Link>

          <div className="flex justify-end gap-2">
            {!wallet.length ? (
              <Button type="submit" className="gap-2" onClick={handleLogin}>
                <Image src="/metamask.svg" width={22} height={22} alt="" />
                Login
              </Button>
            ) : (
              <>
                <Create />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="default"
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={generateAvatarURL(wallet)}
                        width={22}
                        height={22}
                        alt=""
                        className="rounded-full"
                      />
                      {'0x...' + wallet.substring(37)}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Account</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will clear your data from this site. To
                        fully remove access and permissions, you need to do it
                        within your wallet. But don&apos;t worry, you can
                        reconnect if you want.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
