import { createClient, Operations } from '../../components/generated/client'

import { createHooks } from '@wundergraph/react-query'

export const client = createClient()

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks(client)