import { useState, useEffect } from 'react'
import { supabase } from 'utils/supabase'

export const useDownloadUrl = (filePath: string | undefined, key: 'avatars' | 'posts') => {
  const [isLoading, setIsLoading] = useState(false)
  const [fullUrl, setFullUrl] = useState('')
  const bucketName = key === 'avatars' ? 'avatars' : 'posts'
  useEffect(() => {
    if (filePath) {
      const download = async () => {
        setIsLoading(true)
        // const { data, error } = await supabase.storage.from(bucketName).download(filePath)
        const { data, error } = await supabase.storage.from(bucketName).getPublicUrl(filePath)
        if (error) {
          setIsLoading(false)
          throw error
        }
        // setFullUrl(URL.createObjectURL(data!))
        data !== null && setFullUrl(data.publicURL)
        setIsLoading(false)
      }
      download()
    }
  }, [filePath, bucketName])

  return { isLoading, fullUrl, setFullUrl }
}
