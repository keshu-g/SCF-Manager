import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label, onClick }) => {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center p-2 text-primary-text rounded-lg dark:text-dark-primary-text hover:bg-secondary-bg dark:hover:bg-dark-secondary-bg group"
      >
        {Icon && <Icon size={22} />}
        <span className="ms-2">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
