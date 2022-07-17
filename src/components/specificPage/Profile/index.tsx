import { ActionIcon, Avatar, Button, Group, Loader, TextInput } from '@mantine/core'

import useStore from 'store'
import { useQueryProfile } from 'hooks/useQueryProfile'
import { useMutateProfile } from 'hooks/useMutateProfile'
import { useUploadAvatarImg } from 'hooks/useUploadAvatarImg'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import { AiFillCamera } from 'react-icons/ai'
import { supabase } from 'utils/supabase'

export const Profile = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const user = supabase.auth.user()
  const { data: profile } = useQueryProfile(user?.id)
  const { updateProfileMutation } = useMutateProfile()
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(profile?.avatar_url, 'avatars')
  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      avatar_url: editedProfile.avatar_url,
    })
  }

  return (
    <>
      <p className='my-0 text-lg'>username : {profile?.username}</p>
      <Group position='apart'>
        <TextInput
          className='w-8/12'
          placeholder='Your name'
          label='username update'
          value={editedProfile.username || ''}
          onChange={(e) => update({ ...editedProfile, username: e.target.value })}
        />
        <Button
          className='mt-6 w-3/12'
          onClick={updateProfile}
          disabled={updateProfileMutation.isLoading || !editedProfile.username}
        >
          {updateProfileMutation.isLoading ? <Loader size='sm' /> : 'Update'}
        </Button>
      </Group>

      <Group className='mt-6'>
        <Avatar src={avatarUrl} alt='Avatar' radius='xl' size='xl' />
        <div className='flex justify-center'>
          <label htmlFor='avatar'>
            <AiFillCamera className='mt-2 h-10 w-10 cursor-pointer text-blue-500' />
          </label>
          <input
            className='hidden'
            type='file'
            id='avatar'
            accept='image/*'
            onChange={(e) => useMutateUploadAvatarImg.mutate(e)}
          />
        </div>
      </Group>
    </>
  )
}
