import { FC } from 'react'
import { Avatar } from '@mantine/core'

import { useDownloadUrl } from 'hooks/useDownloadUrl'
import { useQueryAvatar } from 'hooks/useQueryAvatar'

type Props = {
  id: string
}
export const UserAvatar: FC<Props> = (props) => {
  const { data } = useQueryAvatar(props.id)
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(data?.avatar_url, 'avatars')
  return <Avatar src={avatarUrl} alt='Avatar' radius='lg' size='md' />
}
