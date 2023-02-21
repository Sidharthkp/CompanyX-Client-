import React, { useState } from 'react';
import DashboardCard01 from '../../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../../partials/dashboard/HR/DashboardCardhr';
import DashboardCard11 from '../../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../../partials/dashboard/DashboardCard13';
import AdminHeader from '../../partials/header/Admin/AdminHeader';
import WelcomeBannerAdmin from '../../partials/dashboard/WelcomeBannerAdmin';

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
            </div>
        </div>
    );
}

export default AdminHome;