// src/components/UserProfileCard.jsx
import React, { useState, useEffect } from 'react';

const UserProfileCard = ({ user, onUpdate, loading, bookingsCount = 0, activeBookingsCount = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    role: ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        fullName: user.fullName || '',
        phone: user.phone || '',
        address: user.address || '',
        role: user.role || 'User'
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    
    try {
      const result = await onUpdate(formData);
      if (result.success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      address: user?.address || '',
      role: user?.role || 'User'
    });
    setIsEditing(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.fullName) {
      return user.fullName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Get member since date
  const getMemberSince = () => {
    if (user?.createdAt) {
      const date = new Date(user.createdAt);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
    }
    return 'January 2024';
  };

  // Get display name
  const getDisplayName = () => {
    return user?.fullName || user?.username || 'User';
  };

  // Get avatar gradient based on role
  const getAvatarGradient = () => {
    switch (user?.role?.toLowerCase()) {
      case 'admin':
        return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
      case 'premium':
        return 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <div className="col-12 border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
      {/* Card Header with Gradient */}
      <div className="position-relative" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: '120px' }}>
        <div className="position-absolute top-0 end-0 p-3">
          {!isEditing && (
            <button 
              className="btn btn-light btn-sm"
              onClick={() => setIsEditing(true)}
              disabled={loading}
            >
              <i className="bi bi-pencil me-1"></i>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="card-body p-4" style={{ marginTop: '-60px' }}>
        {/* Profile Avatar & Basic Info */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="text-center mb-4">
              <div 
                className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto mb-3 border border-4 border-white shadow-lg"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold',
                  background: getAvatarGradient(),
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {getUserInitials()}
                {user?.role === 'Admin' && (
                  <div className="position-absolute bottom-0 end-0">
                    <span className="badge bg-danger rounded-pill">
                      <i className="bi bi-shield-check"></i>
                    </span>
                  </div>
                )}
              </div>
              <h3 className="mb-1 fw-bold">{getDisplayName()}</h3>
              <p className="text-muted mb-2">
                <i className="bi bi-calendar-plus me-1"></i>
                Member since {getMemberSince()}
              </p>
              <span className={`badge px-3 py-2 ${user?.role === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
                <i className="bi bi-person-badge me-1"></i>
                {user?.role || 'User'}
              </span>
            </div>
          </div>
        </div>

        {!isEditing ? (
          /* Display Mode */
          <div>
            <div className="row g-4 mb-4">
              {/* Profile Information Cards */}
              <div className="col-md-6">
                <div className="bg-light rounded p-3 h-100">
                  <h6 className="text-primary mb-3">
                    <i className="bi bi-person me-2"></i>
                    Personal Information
                  </h6>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-semibold mb-1">Username</label>
                    <p className="mb-0 fw-semibold">{user?.username || 'Not provided'}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-semibold mb-1">Full Name</label>
                    <p className="mb-0 fw-semibold">{user?.fullName || 'Not provided'}</p>
                  </div>
                  <div className="mb-0">
                    <label className="form-label text-muted small fw-semibold mb-1">Email</label>
                    <p className="mb-0 fw-semibold text-break">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-light rounded p-3 h-100">
                  <h6 className="text-primary mb-3">
                    <i className="bi bi-telephone me-2"></i>
                    Contact Information
                  </h6>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-semibold mb-1">Phone</label>
                    <p className="mb-0 fw-semibold">{user?.phone || 'Not provided'}</p>
                  </div>
                  <div className="mb-0">
                    <label className="form-label text-muted small fw-semibold mb-1">Address</label>
                    <p className="mb-0 fw-semibold">{user?.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="row g-3">
              <div className="col-md-4">
                <div className="text-center p-3 bg-primary bg-opacity-10 rounded" >
                  <i className="bi bi-calendar-check text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                  <div className="h4 mb-1 text-primary fw-bold">{bookingsCount}</div>
                  <small className="text-muted fw-semibold">Total Bookings</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                  <i className="bi bi-check-circle text-success mb-2" style={{ fontSize: '2rem' }}></i>
                  <div className="h4 mb-1 text-success fw-bold">{activeBookingsCount}</div>
                  <small className="text-muted fw-semibold">Active Bookings</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 bg-info bg-opacity-10 rounded">
                  <i className="bi bi-star text-info mb-2" style={{ fontSize: '2rem' }}></i>
                  <div className="h4 mb-1 text-info fw-bold">{user?.favoriteDestinations || 0}</div>
                  <small className="text-muted fw-semibold">Favorite Places</small>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 text-primary">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Profile Information
              </h5>
              <div>
                <button 
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={handleCancel}
                  disabled={updateLoading}
                >
                  <i className="bi bi-x-lg me-1"></i>
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-1"></i>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person me-1"></i>
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  minLength={3}
                  placeholder="Enter username"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-envelope me-1"></i>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person-badge me-1"></i>
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-telephone me-1"></i>
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">
                  <i className="bi bi-geo-alt me-1"></i>
                  Address
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;