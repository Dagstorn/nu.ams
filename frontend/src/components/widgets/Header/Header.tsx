import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/config/store/store";
import { ModeToggle } from "../ThemeModeTogle/mode-toggle";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import classNames from "classnames";
import { toggleSidebar } from "@/config/store/slices/generalSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/config/store/slices/authSlice";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();

  const username = useSelector((state: RootState) => state.auth.username);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <>
      <div className={styles.left}>
        <Button onClick={() => dispatch(toggleSidebar())} variant="outline">
          <Menu />
        </Button>
        <div
          className={classNames(
            styles.searchBox,
            "rounded-md border border-input"
          )}
        >
          <Search className={styles.searchIcon} />
          <Input placeholder="Search" className="h-8" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightItem}>
          <ModeToggle />
        </div>
        {isAuthenticated ? (
          <div className={styles.profile}>
            <span className={styles.username}>{username}</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4">
                <DropdownMenuLabel>{username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link to={"/login"}>login</Link>
        )}
      </div>
    </>
  );
};

export default Header;
