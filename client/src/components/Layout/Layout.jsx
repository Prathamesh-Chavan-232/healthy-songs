import moment from "moment/moment";
import css from "./Layout.module.css";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import logo from "../../assets/logos/logo.png";

const Layout = () => {
	const { pathname } = useLocation();

	return (
		<div className={css.container}>
			<Sidebar />
			{/* making the dashboard as the default route */}
			{pathname === "/" && <Navigate to='/dashboard' />}

			<div className={css.dashboard}>
				<div className={css.topBaseGradients}>
					<div className='gradient-red'></div>
					<div className='gradient-orange'></div>
					<div className='gradient-blue'></div>
				</div>

				<div className={css.header}>
					<span>{moment().format("dddd, Do MMM YYYY")}</span>
					{/*
                                  <div className={css.searchBar}>
                                    <BiSearch size={20} />
                                    <input type="text" placeholder="Search" />
                                  </div>

                        */}

					<img
						src={logo}
						alt='Logo'
					/>
				</div>

				<div className={css.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
