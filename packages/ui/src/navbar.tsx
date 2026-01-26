import { Button } from "./button"

interface AppBarProps {
  user?: {
    name?: string | null
  },
  onSignin: any,
  onSignout: any
}

export const NavBar = ({ user, onSignin, onSignout }:
  AppBarProps
) => {
  return <div className="flex justify-between pt-5 mx-1 border-b-2 border-black">

    <div className="mt-1 text-2xl mx-2">
      Paytm
    </div>
    <div className="mx-2">
      <Button onClick={user ? onSignout : onSignin

      } >
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  </div>
}
