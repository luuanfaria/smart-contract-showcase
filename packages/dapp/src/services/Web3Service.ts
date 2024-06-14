/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3'
import ABI from '@/services/ABI.json'

const CONTRACT_ADDRESS = '0xc5c8f2b3C8F99F7cc8AEA8b6C96FCeA984Fd0401'

export interface OpenRequest {
  title: string
  description: string
  contact: string
  goal: number
}

export async function Login() {
  if (!window.ethereum) throw new Error('Please, install Metamask to continue')

  const ethereum = window.ethereum
  const web3 = new Web3(ethereum)
  const accounts = await web3.eth.requestAccounts()

  if (!accounts || !accounts.length) throw new Error('Wallet not allowed!')

  localStorage.setItem('wallet', accounts[0].toLowerCase())
  return accounts[0]
}

function getContract() {
  if (!window.ethereum) throw new Error('Please, install Metamask to continue')

  const from = localStorage.getItem('wallet') || undefined
  const web3 = new Web3(window.ethereum)

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from })
}

export async function getOpenRequests(lastId = 0): Promise<any[]> {
  const contract = getContract()
  const requests = await contract.methods.getOpenRequests(lastId + 1, 10).call()

  if (!requests || !Array.isArray(requests))
    throw new Error('Failed to fetch open requests')

  return requests.filter((req: any) => req.title !== '')
}

export async function openRequest({
  title,
  description,
  contact,
  goal,
}: OpenRequest) {
  const contract = getContract()

  return contract.methods
    .openRequest(title, description, contact, Web3.utils.toWei(goal, 'ether'))
    .send()
}

export async function closeRequest(id: number) {
  const contract = getContract()

  return contract.methods.closeRequest(id).send()
}

export async function sendDonate(id: number, donationInBnb: string) {
  const contract = getContract()

  return contract.methods.donate(id).send({
    value: Web3.utils.toWei(donationInBnb, 'ether'),
  })
}
