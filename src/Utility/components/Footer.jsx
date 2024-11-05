import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-center py-5">
      <nav className="text-gray-600 text-xs">
        <Link to="#" className="font-bold text-black mr-2">Linked<span className="bg-black text-white mr-1">In</span>@2024</Link>
        <Link to="#" className="mx-2 hover:underline">User Agreement</Link>
        <Link to="#" className="mx-2 hover:underline">Privacy Policy</Link>
        <Link to="#" className="mx-2 hover:underline">Community Guidelines</Link>
        <Link to="#" className="mx-2 hover:underline">Cookie Policy</Link>
        <Link to="#" className="mx-2 hover:underline">Copyright Policy</Link>
        <Link to="#" className="mx-2 hover:underline">Send Feedback</Link>
        <Link to="#" className="mx-2 hover:underline">Language</Link>
      </nav>
    </footer>
  );
}

export default Footer;