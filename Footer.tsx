
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-8 py-4 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Electricity Bill Calculator. All Rights Reserved.</p>
        <p className="mt-1">Designed for estimation purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;
