import React from 'react';

const AdminViewDrivers = () => {
  // Dummy data for drivers
  const drivers = [
    { driverName: 'John Doe', age: 30, licenseImage: '34.png', date: '2024-04-01',palce:"tirupti",Owner:"lalit" },
    { driverName: 'Jane Smith', age: 35, licenseImage: '2.png', date: '2024-04-03',palce:"tirupti",Owner:"lalit" },
    { driverName: 'Michael Johnson', age: 28, licenseImage: '23.png', date: '2024-04-05',palce:"tirupti",Owner:"lalit" },
    // Add more dummy data as needed
  ];

  return (
    <div className="max-w-screen mx-auto p-6 bg-white rounded-md shadow-md mt-4 overflow-y-scroll min-h-screen  ">
      <h2 className="text-xl font-semibold mb-4">Admin View Drivers</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Image</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">{driver.driverName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={driver.licenseImage} alt="License" className="h-16 w-auto" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.palce}</td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.Owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewDrivers;
