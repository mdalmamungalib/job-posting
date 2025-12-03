import React from 'react';

const layout = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
        </div>
    );
};

export default layout;