import React, { useState } from 'react';
import DashboardCardEmployee from '../../partials/dashboard/Employee/DashboardCardEmployee';
import WelcomeBannerEmployee from '../../partials/dashboard/Employee/WelcomeBannerEmployee';
import EmployeeHeader from '../../partials/header/Employee/EmployeeHeader';
const EmployeeHome = () => {
    return (
        <div className="flex h-screen overflow-hidden">

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <EmployeeHeader />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Welcome banner */}
                        <WelcomeBannerEmployee />

                        {/* Cards */}
                        <div className="grid grid-cols-12 gap-6">
                        <DashboardCardEmployee />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default EmployeeHome