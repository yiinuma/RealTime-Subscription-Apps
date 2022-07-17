import { useQuery } from 'react-query'
import { supabase } from 'utils/supabase'
import { Profile } from 'types'
export const useQueryAvatar = (userId: string | undefined) => {
  const getAvatarUrl = async () => {
    if (userId !== undefined) {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', userId)
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return data
    } else {
      const data = null
      return data
    }
  }
  return useQuery<Profile, Error>({
    queryKey: ['avatar-url', userId],
    queryFn: getAvatarUrl,
    refetchOnWindowFocus: true,
  })
}
