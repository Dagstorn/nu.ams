import {
  ChartLine,
  DatabaseBackup,
  FolderKanban,
  House,
  Info,
  LogOut,
  Settings,
  SquareActivity,
  User,
} from "lucide-react";
import styles from "./Sidebar.module.css";
import classNames from "classnames";
import logoicon from "@/assets/logo-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/config/store/store";
import { NavLink } from "react-router-dom";
import { logout } from "@/config/store/slices/authSlice";
const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();

  const sidebarClosed = useSelector(
    (state: RootState) => state.general.sidebarClosed
  );
  return (
    <div
      className={classNames(styles.sidebarContainer, {
        [styles.sidebar_closed]: sidebarClosed,
      })}
    >
      <div className={styles.header}>
        <img className={styles.logo} src={logoicon} alt="NU logo" />
        <div className={styles.name}>
          <span className={styles.title}>NU AMS</span>
          <span className={styles.secondary_title}>
            Alumni Management System
          </span>
        </div>
      </div>

      <div className={styles.menu}>
        <div className={styles.mainMenu}>
          <NavLink
            to={"/admin/dashboard"}
            className={({ isActive }) =>
              classNames(styles.menuItem, { [styles.active]: isActive })
            }
          >
            <House className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Dashboard</span>
          </NavLink>
          <NavLink
            to={"/admin/alumni"}
            className={({ isActive }) =>
              classNames(styles.menuItem, { [styles.active]: isActive })
            }
          >
            <FolderKanban className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Alumni management</span>
          </NavLink>
          <NavLink
            to={"/admin/data"}
            className={({ isActive }) =>
              classNames(styles.menuItem, { [styles.active]: isActive })
            }
          >
            <DatabaseBackup className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Data management</span>
          </NavLink>
          <NavLink
            to={"/admin/statistics"}
            className={({ isActive }) =>
              classNames(styles.menuItem, { [styles.active]: isActive })
            }
          >
            <ChartLine className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Statistic</span>
          </NavLink>
          <NavLink
            to={"/admin/monitoring"}
            className={({ isActive }) =>
              classNames(styles.menuItem, { [styles.active]: isActive })
            }
          >
            <SquareActivity className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Monitoring</span>
          </NavLink>
          <NavLink
            to={"/admin/settings"}
            className={({ isActive }) =>
              classNames(styles.menuItem, { [styles.active]: isActive })
            }
          >
            <Settings className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Settings</span>
          </NavLink>
        </div>
        <div className={styles.footerMenu}>
          <div className={classNames(styles.menuItem)}>
            <User className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Profile</span>
          </div>
          <div className={classNames(styles.menuItem)}>
            <Info className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Help</span>
          </div>
          <div
            className={classNames(styles.menuItem, "hover:bg-destructive")}
            onClick={() => {
              dispatch(logout());
            }}
          >
            <LogOut className={styles.menuIcon} size={18} />
            <span className={styles.menu_text}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
