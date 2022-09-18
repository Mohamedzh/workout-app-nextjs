import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

const LoginPage = () => {
  const { user, error } = useUser()
  const [data, setData] = useState<any>()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        <h1>No User</h1>

      </>
    )

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default LoginPage