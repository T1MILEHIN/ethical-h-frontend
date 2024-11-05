import React from 'react';

function Header() {
  return (
    <header className="font-bold text-base text-blue-600 py-2 ">
      <h1 className="inline-block mx-10 text-2xl">
        Linked <span className="text-white bg-blue-600 rounded px-1">in</span>
      </h1>
    </header>
  );
}

export default Header;