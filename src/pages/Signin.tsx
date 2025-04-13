import GoogleAuth from "@/components/pages/authentication/GoogleButton"
import Navbar from "@/components/pages/authentication/Navbar"

const Signin = () => {
  return (
    <div className="h-screen bg-background flex flex-col">
      <Navbar/>
      <div className="flex-1 flex justify-center items-center">
      <GoogleAuth/>
      </div>
    </div>
  )
}

export default Signin;