import { ActionIcon, Avatar, Button, Group, Loader, TextInput } from '@mantine/core'

import useStore from 'store'
import { useQueryProfile } from 'hooks/useQueryProfile'
import { useMutateProfile } from 'hooks/useMutateProfile'
import { useUploadAvatarImg } from 'hooks/useUploadAvatarImg'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import { AiFillCamera } from 'react-icons/ai'
import { UserAvatar } from 'components/uiParts/UserAvatar'

export const Profile = () => {
  const session = useStore((state) => state.session)
  const sessionUser = useStore((state) => state.sessionUser)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const { data: profile } = useQueryProfile()
  const { updateProfileMutation } = useMutateProfile()
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(editedProfile.avatar_url, 'avatars')
  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      avatar_url: editedProfile.avatar_url,
    })
  }

  return (
    <>
      <p className='my-0 text-2xl'>username : {profile?.username}</p>
      <Group position='apart'>
        <TextInput
          className='w-8/12'
          placeholder='Your name'
          label='username update'
          value={editedProfile.username || ''}
          onChange={(e) => update({ ...editedProfile, username: e.target.value })}
        />
        <Button
          className='mt-6'
          onClick={updateProfile}
          disabled={updateProfileMutation.isLoading || !editedProfile.username}
        >
          {updateProfileMutation.isLoading ? <Loader size='sm' /> : 'Update'}
        </Button>
      </Group>

      <Group className='mt-6 w-full' position='apart'>
        <Group>
          {sessionUser && <Avatar src={avatarUrl} alt='Avatar' radius='xl' size='xl' />}
          <label htmlFor='avatar'>
            <Group className=' cursor-pointer'>
              <AiFillCamera className='h-10 w-10 text-blue-500' />
              <p>select image</p>
            </Group>
          </label>
          <input
            className='hidden'
            type='file'
            id='avatar'
            accept='image/*'
            onClick={updateProfile}
            onChange={(e) => {
              useMutateUploadAvatarImg.mutate(e)
            }}
          />
        </Group>
        <Button onClick={updateProfile}>
          {updateProfileMutation.isLoading ? <Loader size='sm' /> : 'Update'}
        </Button>
      </Group>
    </>
  )
}
