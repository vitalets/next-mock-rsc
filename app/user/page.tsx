export type User = {
  firstName: string
  lastName: string
}

async function getUser() {
  return {
    firstName: 'Real',
    lastName: 'Real',
  }
}

export default async function Home() {
  const user = await getUser()

  return (
    <main>
      <p id="server-side-greeting">Hello, {user.firstName}!</p>
    </main>
  )
}
