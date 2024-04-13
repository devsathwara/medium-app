import LandingImg from '/landing.svg'; 
import { Card } from "../components/Card";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  //get cookie of jwt 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  //   console.log(cookies.jwt.split(' '))
  //  const token = cookies.jwt.split(' ');
  //       const decoded = jwtDecode(token[1]);
  //       console.log('Decoded token:', decoded);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8787/api/v1/allBlogs');
        console.log(response.data.posts);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after receiving response or error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <img 
          className="w-[700px]" 
          src={LandingImg} 
          alt="Landing Image" 
        />
      </div>
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
        {/* Card components */}
        {posts.map((post) => (
          <Card key={post.id} title={post.title} author={post.author} content={post.content} id={post.id} />
        ))}
      </div>
    </> 
  );
};
