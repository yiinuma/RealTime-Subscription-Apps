import { useQuery } from 'react-query'

import { supabase } from 'utils/supabase'
import useStore from 'store'
import { Profile } from 'types'
import { useMutateProfile } from 'hooks/useMutateProfile'

export const useQueryProfile = () => {
  const session = useStore((state) => state.session)
  const sessionUser = useStore((state) => state.sessionUser)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const { createProfileMutation } = useMutateProfile()
  const getProfile = async () => {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionUser)
      .single()
    if (error && status === 406) {
      createProfileMutation.mutate({
        id: sessionUser,
        username: session?.user?.email,
        avatar_url: '',
      })
      update({
        ...editedProfile,
        username: session?.user?.email,
      })
    }
    if (error && status !== 406) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Profile, Error>({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        update({
          username: data.username,
          avatar_url: data.avatar_url,
        })
      }
    },
  })
}
