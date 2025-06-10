import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Search, Library, Music2 } from 'lucide-react'; // Example icons

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive }) => {
  // Doraemon theme: Consider theme-specific colors for active/inactive states
  const activeClasses = isActive ? 'text-blue-500' : 'text-gray-500 hover:text-blue-400';
  return (
    <Link to={to} className={`flex flex-col items-center justify-center flex-1 p-2 transition-colors ${activeClasses}`}>
      <Icon className="h-6 w-6 mb-1" />
      <span className="text-xs">{label}</span>
    </Link>
  );
};

const NavigationMenu: React.FC = () => {
  const location = useLocation();
  console.log("Rendering NavigationMenu, current path:", location.pathname);

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/library', icon: Library, label: 'Library' },
    // Example: Link to a dedicated player page if not covered by InteractiveMusicPlayerBar tap
    // { to: '/player', icon: Music2, label: 'Player' },
  ];

  // Doraemon theme: Consider background color, border, shadow for the bar
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex z-50">
      {navItems.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          isActive={location.pathname === item.to}
        />
      ))}
    </nav>
  );
};

export default NavigationMenu;