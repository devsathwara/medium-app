import { useRef } from "react"
import axios from 'axios';
import { useCookies } from 'react-cookie';
export const Register = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['jwt'])

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
        axios.post('http://localhost:8787/api/v1/signup',{
            email:email.current!.value,
            password:password.current!.value,
            name:name.current!.value
        }).then(res=>{
          console.log("Successfully registered");
          setCookie('jwt', "Bearer "+ res.data.token, { path: '/', maxAge: 86400 })
          window.location.href = '/signin';
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        }
        )
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col font-serif">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-8 text-[40px] text-center">Sign up</h1>

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Full Name"
                ref={name}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                ref={email}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                ref={password}
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="ml-[5px] no-underline border-b border-blue text-blue-600"
              href="/signin"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
};
