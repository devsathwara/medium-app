import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import Delete icon from free-regular svg icon library 

import { faEdit , faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

 

export const Card = (props: any) => {
   // eslint-disable-next-line 
  // typescript-eslint/no-unused-vars
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cookies, setCookie] = useCookies(["jwt"]);
    let decoded=null;
    if(cookies.jwt!= null){
      const token = cookies.jwt.split(' ');
           const decoded = jwtDecode(token[1]);
           console.log('Decoded token:', decoded.id , props.author.id);
          }
          const wordsLimit = 30; // Number of words to display initially

  // Truncate content if it exceeds the word limit
  const truncatedContent = props.content.split(' ').slice(0, wordsLimit).join(' ');

  return (
    <>
     <div className="border border-gray-200 shadow-md rounded-lg p-4">
  <div className="flex justify-between">
  
    <div>
      <a className="font-bold" href={`/blog/${props.id}`}>
        {props.title}
      </a>
    </div>
  {decoded && decoded.id == props.author.id && 

    <div className="flex gap-2">
      <a href={`/edit/${props.id}`}><FontAwesomeIcon icon={faEdit}  /></a>
      <a href={`/delete/${props.id}`}><FontAwesomeIcon icon={faTrashCan}  /></a>
    </div>
  }

  </div>

  <p className="text-sm text-gray-500">Author: {props.author.name}</p>

  <p>{truncatedContent}</p>

  <a href={`/blog/${props.id}`} className="text-blue-500">
    Read More...
  </a>
</div>
    </>
  );
};
