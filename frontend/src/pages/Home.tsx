//I want to import svg pic from public folder landing.svg and want to display it on home page
//
import LandingImg from '/landing.svg'; 
import { Card } from "../components/Card";
import { useCookies } from 'react-cookie';
import axios from 'axios';
export const Home = () => {
    //get cookie of jwt 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  //   console.log(cookies.jwt.split(' '))
  //  const token = cookies.jwt.split(' ');
  //       const decoded = jwtDecode(token[1]);
  //       console.log('Decoded token:', decoded);
  const response= axios.get('http://localhost:8787/api/v1/allBlogs');
 response.then((res)=>{
  console.log(res.data)
 })
     
  return (
    <>
             <div className="flex justify-center ">
      <img 
        className="w-[700px]" 
        src={LandingImg} 
        alt="Landing Image" 
      />
          </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
        {/* Card 1 */}
      <Card title='test' author='test' content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magni necessitatibus numquam esse, tempore, corrupti distinctio accusamus excepturi eum consequatur velit quis et ipsam sint maiores, dolore nemo provident ducimus unde corporis assumenda. Corrupti soluta nam sed pariatur eaque adipisci cum quo voluptate distinctio, facilis eveniet ipsa commodi asperiores excepturi!' id='1'/>
      </div>
    </>
  );
};
