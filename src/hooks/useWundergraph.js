import { createClient, Operations } from '../../components/generated/client'


import { createHooks } from '@wundergraph/react-query'
var header={
  // Authorizatoin:''
}
if(typeof window !== 'undefined'){
  if(window.localStorage.getItem('accessToken')!==null){
    header.Authorization='Bearer ' + window.localStorage.getItem('accessToken')
  }
    
}

export const client = createClient({
  extraHeaders:header
})

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks(client)