import React from "react";
import { ChevronDown, Box, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

const Header = ({ user }) => {
  return (
    <header className="ecr-header" data-testid="app-header">
      <div className="ecr-header-inner">
        <div className="ecr-brand">
          <div className="ecr-logo">
            <Box size={30} strokeWidth={1.75} />
          </div>
          <div>
            <div className="ecr-brand-title">ECR Assistant</div>
            <div className="ecr-brand-sub">Defect Analysis Agent</div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ecr-user" data-testid="user-menu-trigger">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#dbe7fb] text-[#3b5fb8] text-sm font-medium">
                  {user.initial}
                </AvatarFallback>
              </Avatar>
              <span className="ecr-user-name">Hello, {user.name}</span>
              <ChevronDown size={16} className="text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast("Profile coming soon")}>
              <User size={16} className="mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast("Settings coming soon")}>
              <Settings size={16} className="mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast("Signed out (demo)")}>
              <LogOut size={16} className="mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
