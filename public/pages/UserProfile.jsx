// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserProfileCard from '../components/UserProfileCard';
import UserBookings from '../components/UserBookings';
import { useUser } from '../../src/hooks/useUser';
import { useUserBookings } from '../../src/hooks/useBooking';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, loading: userLoading, error: userError, getCurrentUser, updateProfile } = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  // Get user bookings
  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
    fetchUserBookings
  } = useUserBookings(user?.userId);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('auth_user');
    if (!storedUser) {
      toast.error('Please log in to view your profile');
      navigate('/login');
      return;
    }

    // Fetch fresh user data
    getCurrentUser();
  }, [getCurrentUser, navigate]);

  // Fetch bookings when user is loaded
  useEffect(() => {
    if (user?.userId && activeTab === 'bookings') {
      fetchUserBookings(user.userId);
    }
  }, [user?.userId, activeTab, fetchUserBookings]);

  const handleProfileUpdate = async (userData) => {
    if (!user?.userId) return;

    const result = await updateProfile(user.userId, userData);
    if (result.success) {
      toast.success('Profile updated successfully!');
      // Refresh user data after successful update
      getCurrentUser();
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
    return result;
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    // Fetch bookings when switching to bookings tab
    if (tab === 'bookings' && user?.userId) {
      fetchUserBookings(user.userId);
    }
  };

  // Loading state
  if (userLoading) {
    return (
      <>
        <Navbar />
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading profile...</span>
            </div>
            <h5 className="text-muted">Loading your profile...</h5>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (userError || !user) {
    return (
      <>
        <Navbar />
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '4rem' }}></i>
            </div>
            <h2 className="mb-3">Profile Not Found</h2>
            <p className="text-muted mb-4">{userError || 'Unable to load user profile. Please try logging in again.'}</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/login')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-3">
                <i className="bi bi-person-circle me-3"></i>
                Welcome back, {user?.fullName || user?.username}!
              </h1>
              <p className="lead mb-0">Manage your profile and track your travel bookings</p>
            </div>
            <div className="col-md-4 text-end">
              <div className="bg-white bg-opacity-20 rounded p-3 d-inline-block text-black">
                <div className="row text-center">
                  <div className="col">
                    <div className="h4 mb-1">{bookings?.length || 0}</div>
                    <small>Total Bookings</small>
                  </div>
                  <div className="col border-start border-white border-opacity-25">
                    <div className="h4 mb-1">{bookings?.filter(b => b.status === 'Confirmed').length || 0}</div>
                    <small>Active</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container my-5">
        {/* Navigation Tabs */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <ul className="nav nav-pills nav-fill border-0">
                  <li className="nav-item">
                    <button
                      className={`nav-link border-0 rounded-0 py-3 ${activeTab === 'profile' ? 'active' : 'text-dark'}`}
                      onClick={() => handleTabSwitch('profile')}
                      style={{
                        backgroundColor: activeTab === 'profile' ? '#0d6efd' : 'transparent',
                        color: activeTab === 'profile' ? 'white' : '#495057'
                      }}
                    >
                      <i className="bi bi-person-circle me-2"></i>
                      <span className="fw-semibold">Profile Information</span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link border-0 rounded-0 py-3 ${activeTab === 'bookings' ? 'active' : 'text-dark'}`}
                      onClick={() => handleTabSwitch('bookings')}
                      style={{
                        backgroundColor: activeTab === 'bookings' ? '#0d6efd' : 'transparent',
                        color: activeTab === 'bookings' ? 'white' : '#495057'
                      }}
                    >
                      <i className="bi bi-calendar-check me-2"></i>
                      <span className="fw-semibold">My Bookings</span>
                      {bookings && bookings.length > 0 && (
                        <span className="badge bg-light text-dark ms-2">{bookings.length}</span>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="row">
          <div className="col-12">
            <div className="fade show">
              {activeTab === 'profile' && (
                <UserProfileCard
                  user={user}
                  onUpdate={handleProfileUpdate}
                  loading={userLoading}
                  bookingsCount={bookings?.length || 0}
                  activeBookingsCount={bookings?.filter(b => b.status === 'Confirmed').length || 0}
                />
              )}

              {activeTab === 'bookings' && (
                <UserBookings
                  bookings={bookings}
                  loading={bookingsLoading}
                  error={bookingsError}
                  onRefresh={() => fetchUserBookings(user.userId)}
                  user={user}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;