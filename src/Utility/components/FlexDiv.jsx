import React from 'react';
import { Link } from 'react-router-dom';

function FlexDiv() {
  return (
    <div className="flex items-center justify-center my-2 py-2">
      <p className="m-0">New to LinkedIn?</p>
      <Link to="#" className="ml-1 text-blue-600 font-bold hover:bg-aquamarine hover:rounded-full hover:underline hover:p-2">Join now</Link>
    </div>
  );
}

export default FlexDiv;