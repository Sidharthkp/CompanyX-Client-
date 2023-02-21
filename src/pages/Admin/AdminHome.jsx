import React from 'react';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../../partials/dashboard/DashboardCard06';
import DashboardCard10 from '../../partials/dashboard/HR/DashboardCardhr';
import DashboardCard11 from '../../partials/dashboard/DashboardCard11';
import AdminHeader from '../../partials/header/Admin/AdminHeader';
import WelcomeBannerAdmin from '../../partials/dashboard/WelcomeBannerAdmin';
import Banner from '../../partials/dashboard/Admin/Banner';


const AdminHome = () => {

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <AdminHeader />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Welcome banner */}
                        <WelcomeBannerAdmin />

                        {/* banner */}
                        <Banner />


                        {/* Cards */}
                        <div className="grid grid-cols-12 gap-6">
                            {/* Bar chart (Direct vs Indirect) */}
                            <DashboardCard04 />
                            {/* Line chart (Real Time Value) */}
                            <DashboardCard05 />
                            {/* Doughnut chart (Top Countries) */}
                            <DashboardCard06 />
                            {/* Card (Customers) */}
                            <DashboardCard10 />
                            {/* Card (Reasons for Refunds) */}
                            <DashboardCard11 />

                        </div>

                    </div>
                </main>
            </div >
        </div >
    );
}

export default AdminHome;