import React, { useState } from 'react';
import DashboardCard10 from '../../partials/dashboard/DashboardCard10';
import DashboardCard12 from '../../partials/dashboard/DashboardCard12';
import HRHeader from '../../partials/HRHeader';
import WelcomeBannerHR from '../../partials/dashboard/WelcomeBannerAdmin';

const HRHome = () => {


    return (
        <div className="flex h-screen overflow-hidden">

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <HRHeader />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Welcome banner */}
                        <WelcomeBannerHR />

                        {/* Cards */}
                        <div className="grid grid-cols-12 gap-6">
                            {/* Card (Customers) */}
                            <DashboardCard10 />
                            {/* Card (activity) */}
                            <DashboardCard12 />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default HRHome;