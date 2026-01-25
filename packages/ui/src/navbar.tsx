import { Button } from "./button"

interface AppBarProps {
    user? :{
        name? : string | null
    },
    onSignin: any,
    onSignout: any
}

export const NavBar = ({user, onSignin, onSignout}: 
 AppBarProps
) => {
    return <div className="flex justify-between pt-5 mx-5 border-b-2 border-black">
        <div className="mt-1 text-2xl">
            Paytm
        </div>
        <div>
            <Button onClick={user ? onSignout : onSignin

             } className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer">
                {user ? "Logout": "Login"}
            </Button>
        </div>
    </div>
}