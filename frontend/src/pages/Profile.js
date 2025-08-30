import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    userId: localStorage.getItem("userId")
      ? Number(localStorage.getItem("userId"))
      : null,
    username: localStorage.getItem("username") || "",
    firstName: "",
    lastName: "",
    dob: "",
  });

  const [editedProfile, setEditedProfile] = useState({});

  // 🔥 Lắng nghe sự kiện storage
  useEffect(() => {
    const handleStorage = () => {
      setProfile((prev) => ({
        ...prev,
        userId: localStorage.getItem("userId")
          ? Number(localStorage.getItem("userId"))
          : null,
        username: localStorage.getItem("username") || "",
      }));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 🔥 Fetch profile
  useEffect(() => {
    if (!profile.userId) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/users/${profile.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile((prev) => ({
          ...prev,
          ...data.result, // merge kết quả trả về
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [profile.userId, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile, password: "" }); // thêm field password để update
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/users/${profile.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: editedProfile.firstName,
            lastName: editedProfile.lastName,
            dob: editedProfile.dob,
            password: editedProfile.password || null, // gửi password nếu có
          }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setProfile(updated.result);
        setIsEditing(false);
        alert("Cập nhật thông tin thành công!");
      } else {
        const errorData = await response.json();
        console.error("Update error:", errorData);
        alert("Có lỗi xảy ra khi cập nhật!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Hồ sơ cá nhân</h2>

        <div className="form-group">
          <label>Tên đăng nhập</label>
          <p className="form-control-static">{profile.username}</p>
        </div>

        <div className="form-group">
          <label>Họ</label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={editedProfile.firstName || ""}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <p className="form-control-static">
              {profile.firstName || "Chưa cập nhật"}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Tên</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={editedProfile.lastName || ""}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <p className="form-control-static">
              {profile.lastName || "Chưa cập nhật"}
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Ngày sinh</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={editedProfile.dob || ""}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <p className="form-control-static">
              {profile.dob || "Chưa cập nhật"}
            </p>
          )}
        </div>

        {isEditing && (
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="password"
              value={editedProfile.password || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
        )}

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                <i className="fas fa-save"></i> Lưu
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                <i className="fas fa-times"></i> Hủy
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEdit}>
              <i className="fas fa-edit"></i> Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
