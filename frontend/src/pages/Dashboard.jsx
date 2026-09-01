import { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationForm from "../components/ApplicationForm";
import { API_BASE_URL } from '../config';

export default function Dashboard({ user, onLogout, currentView, onNavigate }) {
  const [showForm, setShowForm] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);

  const totalApplications = applicationList.length;
  const interviews = applicationList.filter((application) => application.status === "Interview").length;
  const offers = applicationList.filter((application) => application.status === "Offer").length;
  const successRate = totalApplications ? Math.round((offers / totalApplications) * 100) : 0;

  const addApplication = async (application) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });
      const newApplication = await response.json();
      setApplicationList((current) => [...current, newApplication]);
    } catch (error) {
      console.error("Failed to add application:", error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/applications/${id}`, { method: "DELETE" });
      setApplicationList((current) => current.filter((application) => application._id !== id));
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const editApplication = (application) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const updateApplication = async (updatedApplication) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${updatedApplication._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedApplication),
      });
      const updatedData = await response.json();
      setApplicationList((current) =>
        current.map((application) => (application._id === updatedData._id ? updatedData : application))
      );
      setEditingApplication(null);
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/applications`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setApplicationList(data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <Navbar 
        onAddJob={() => setShowForm(true)}
        currentView={currentView || 'dashboard'}
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
      />
      <h1 className="font-semibold px-6 text-2xl font-sans mt-6 text-gray-800">Welcome Back 😊</h1>
      <p className="px-6 text-gray-600">Here is your job search overview</p>
      <hr className="my-4 border-gray-200" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 mb-6">
        <div className="font-medium flex flex-col items-center justify-center bg-blue-100 h-20 rounded-xl shadow-sm">
          <h3 className="text-gray-800 text-base font-semibold">Total Applications</h3>
          <p className="text-2xl font-bold text-blue-600">{totalApplications}</p>
        </div>

        <div className="font-medium flex flex-col items-center justify-center bg-purple-100 h-20 rounded-xl shadow-sm">
          <h3 className="text-gray-800 text-base font-semibold">Interviews</h3>
          <p className="text-2xl font-bold text-purple-600">{interviews}</p>
        </div>

        <div className="font-medium flex flex-col items-center justify-center bg-green-100 h-20 rounded-xl shadow-sm">
          <h3 className="text-gray-800 text-base font-semibold">Offers Received</h3>
          <p className="text-2xl font-bold text-green-600">{offers}</p>
        </div>

        <div className="font-medium flex flex-col items-center justify-center bg-amber-100 h-20 rounded-xl shadow-sm">
          <h3 className="text-gray-800 text-base font-semibold">Success Rate</h3>
          <p className="text-2xl font-bold text-amber-600">{successRate}%</p>
        </div>
      </div>

      <div className="px-6 pb-8">
        <ApplicationTable 
          applications={applicationList} 
          onDeleteApplication={deleteApplication} 
          onUpdateApplication={updateApplication}
          onEditApplication={editApplication}
        />
      </div>

      {showForm && (
        <ApplicationForm 
          onClose={() => {
            setEditingApplication(null);
            setShowForm(false);
          }} 
          onAddApplication={addApplication} 
          onDeleteApplication={deleteApplication} 
          onUpdateApplication={updateApplication}
          editingApplication={editingApplication}
        />
      )}
    </>
  );
}
