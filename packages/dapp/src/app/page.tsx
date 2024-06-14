/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Request from '@/components/request'
import { Button } from '@/components/ui/button'
import { getOpenRequests } from '@/services/Web3Service'
import { useEffect, useState } from 'react'

export default function Home() {
  const [requests, setRequests] = useState<any[]>([])
  const [lastId, setLastId] = useState(0)

  useEffect(() => {
    LoadRequests(lastId)
  }, [lastId])

  async function LoadRequests(lastId: number) {
    try {
      const result: any[] = await getOpenRequests(lastId)
      console.log(result)
      if (lastId === 0) {
        setRequests(result)
      } else {
        requests.push(...result)
        setRequests(requests)
      }
    } catch (err) {
      console.error(err)
    }
  }

  function handleLoadMoreRequest() {
    setLastId(Number(requests[requests.length - 1].id))
  }

  return (
    <main className="flex flex-col min-h-screen max-w-[720px] m-auto">
      <Header />

      <div className="flex-1">
        <div className="flex flex-col my-6">
          <p className="p-3 text-xs font-light text-zinc-500">
            Now you can create and support donation campaigns using
            cryptocurrency. Join us in making a difference today!
          </p>
        </div>

        <div className="p-3">
          <div className="flex flex-col">
            {requests && requests.length ? (
              requests.map((req) => <Request key={req.id} data={req} />)
            ) : (
              <p>Connect your wallet to see your requests.</p>
            )}
            {requests && requests.length && requests.length % 10 === 0 ? (
              <div className="w-full text-center items-center">
                <Button
                  type="submit"
                  onClick={handleLoadMoreRequest}
                  className="w-min mt-6"
                  variant="secondary"
                >
                  Load more
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
