import { Outlet } from "react-router-dom";
import Header from "@/components/widgets/Header/Header";
import Sidebar from "@/components/widgets/Sidebar/Sidebar";

import styles from "./MainLayout.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store/store";

const MainLayout = () => {
  const sidebarClosed = useSelector(
    (state: RootState) => state.general.sidebarClosed
  );

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.sidebar, {
          [styles.sidebar_closed]: sidebarClosed,
        })}
      >
        <Sidebar />
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
