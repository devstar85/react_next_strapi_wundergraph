import { createClient, Operations } from '../../components/generated/client'


import { createHooks } from '@wundergraph/react-query'
var token=''
if(typeof window !== 'undefined'){
  token=window.localStorage.getItem('accessToken')
}

export const client = createClient({
  extraHeaders:{
    "Authorization":`Bearer ${token}`
  }
})

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks(client)