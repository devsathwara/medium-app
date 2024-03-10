import { useState } from 'react';

export interface Props {
  title: string;
  author: string;
  content: string;
  id: string; // Add id to props
}

export const Card = (props: Props) => {
  const wordsLimit = 30; // Number of words to display initially

  // Truncate content if it exceeds the word limit
  const truncatedContent = props.content.split(' ').slice(0, wordsLimit).join(' ');

  return (
    <>
      <div className="border border-gray-200 shadow-md rounded-lg p-4">
        <a className="font-bold" href={`/blog/${props.id}`}>
          {props.title}
        </a>
        <p className="text-sm text-gray-500">Author: {props.author}</p>
        <p>{truncatedContent}</p>
        <a href={`/blog/${props.id}`} className="text-blue-500">
          Read More...
        </a>
      </div>
    </>
  );
};
