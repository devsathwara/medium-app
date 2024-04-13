import { useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
export const Form = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  console.log(cookies.jwt.split(" "));
  const token = cookies.jwt.split(" ");
  const decoded = jwtDecode(token[1]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8787/api/v1/blog", {
        title: title.current!.value,
        content: content.current!.value,
        author: decoded.id,
      },
      { headers: {"Authorization": `${token}`} })
      .then((res) => {
        if (res.status == 200) {
          alert("Successfully Posted");
          window.location.href = "/home";
        }
      })
      .catch((err) => {
        alert("Error while posting");
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  justify-center items-center h-screen">
          <div className="flex flex-col font-bold space-y-1.5 m-[40px]">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              ref={title}
              name="title"
              id="title"
              placeholder="Enter Title"
              className="border border-gray-200 p-2 rounded-md h-auto w-[500px]"
            />
          </div>
          <div className="flex flex-col font-bold space-y-1.5">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              ref={content}
              id="content"
              placeholder="Enter content"
              className="border min-h-[150px] border-gray-200 p-2 rounded-md h-auto w-[500px]"
            />
          </div>
          <button className="bg-gray-900 m-3 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
 Submit
</button>
        </div>
      </form>
    </>
  );
};
