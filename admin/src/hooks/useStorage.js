import { useEffect, useState } from 'react'
import { projectStorage } from '../firebase'

const useStorage = file => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const ref = projectStorage.ref(file.name)

    ref.put(file).on(
      'state_changed',
      snap => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
        setProgress(percentage)
      },
      err => {
        setError(err)
      },
      async () => {
        const url = await ref.getDownloadURL()
        setUrl(url)
      }
    )
  }, [file])

  return { progress, url, error }
}

export default useStorage
