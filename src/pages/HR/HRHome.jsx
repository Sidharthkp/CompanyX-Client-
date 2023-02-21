import React, { useState } from 'react';
import DashboardCard10 from '../../partials/dashboard/HR/DashboardCardhr';
import HRHeader from '../../partials/header/HR/HRHeader';
import WelcomeBannerHR from '../../partials/dashboard/HR/WelcomeBannerHR';
import Banner from '../../partials/dashboard/Admin/Banner';

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

                        {/* banner */}
                        <Banner />

                        {/* Cards */}
                        <div className="grid grid-cols-12 gap-6">
                            {/* Card (Customers) */}
                            <DashboardCard10 />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default HRHome;