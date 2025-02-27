import React from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@radix-ui/react-navigation-menu';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold me-2">🏆</span>
              <span className="text-1xl font-bold">Bet System</span>
            </Link>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/sports"
                  className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <span className="text-1xl font-bold me-2">⚽</span>
                  Sports
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
