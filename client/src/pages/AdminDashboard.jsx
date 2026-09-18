import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Active section state
    const [activeSection, setActiveSection] = useState("members");

    // MEMBERS
    const initialMemberState = {
        name: "",
        role: "",
        bio: "",
        image: "",
        linkedin: "",
        regionalCircle: "none",
        wing: "none",
        age: "",
        quote: "",
        joinedAt: "",
        qualifications: [],
        achievements: [],
    };

    const [members, setMembers] = useState([]);
    const [memberData, setMemberData] = useState(initialMemberState);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [memberFile, setMemberFile] = useState(null);
    const [uploadingMemberImage, setUploadingMemberImage] = useState(false);

    // EVENTS
    const [events, setEvents] = useState([]);
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        regionalCircle: "none",
        images: [],
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");

    // VOLUNTEERS
    const [volunteers, setVolunteers] = useState([]);
    const [volunteerFilter, setVolunteerFilter] = useState("all");

    // CONTACTS
    const [contacts, setContacts] = useState([]);
    const [contactFilter, setContactFilter] = useState("all");
    const [expandedContact, setExpandedContact] = useState(null);

    // SUBSCRIBERS
    const [subscribers, setSubscribers] = useState([]);

    // FETCH MEMBERS
    const fetchMembers = async () => {
        try {
            const res = await api.get("/members");
            setMembers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // FETCH EVENTS
    const fetchEvents = async () => {
        try {
            const res = await api.get("/events");
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // FETCH VOLUNTEERS
    const fetchVolunteers = async () => {
        try {
            const res = await api.get("/volunteers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setVolunteers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // FETCH CONTACTS
    const fetchContacts = async () => {
        try {
            const res = await api.get("/contact", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContacts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // FETCH SUBSCRIBERS
    const fetchSubscribers = async () => {
        try {
            const res = await api.get("/subscribers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSubscribers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // QUALIFICATIONS HANDLERS
    const handleAddQualification = () => {
        setMemberData((prev) => ({
            ...prev,
            qualifications: [...prev.qualifications, { qual: "", year: "" }],
        }));
    };

    const handleUpdateQualification = (index, field, value) => {
        setMemberData((prev) => {
            const updated = [...prev.qualifications];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, qualifications: updated };
        });
    };

    const handleRemoveQualification = (index) => {
        setMemberData((prev) => ({
            ...prev,
            qualifications: prev.qualifications.filter((_, i) => i !== index),
        }));
    };

    // ACHIEVEMENTS HANDLERS
    const handleAddAchievement = () => {
        setMemberData((prev) => ({
            ...prev,
            achievements: [...prev.achievements, { title: "", year: "" }],
        }));
    };

    const handleUpdateAchievement = (index, field, value) => {
        setMemberData((prev) => {
            const updated = [...prev.achievements];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, achievements: updated };
        });
    };

    const handleRemoveAchievement = (index) => {
        setMemberData((prev) => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index),
        }));
    };

    // MEMBER IMAGE HANDLERS
    const uploadMemberImage = async () => {
        if (!memberFile) return;

        const validation = validateFile(memberFile);
        if (!validation.valid) {
            alert(validation.reason);
            return;
        }

        setUploadingMemberImage(true);
        try {
            const formData = new FormData();
            formData.append("image", memberFile);

            const res = await api.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMemberData((prev) => ({
                ...prev,
                image: res.data.imageUrl,
            }));
            setMemberFile(null);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to upload profile image");
        } finally {
            setUploadingMemberImage(false);
        }
    };

    const removeMemberImage = () => {
        if (!window.confirm("Remove profile image?")) return;
        setMemberData((prev) => ({
            ...prev,
            image: "",
        }));
    };

    // ADD / EDIT MEMBER
    const addMember = async (e) => {
        e.preventDefault();

        const payload = {
            ...memberData,
            age: memberData.age ? Number(memberData.age) : undefined,
            joinedAt: memberData.joinedAt ? new Date(memberData.joinedAt) : undefined,
            qualifications: (memberData.qualifications || []).filter(q => q.qual && q.qual.trim() !== ""),
            achievements: (memberData.achievements || []).filter(a => a.title && a.title.trim() !== ""),
        };

        if (editingMemberId) {
            try {
                await api.put(
                    `/members/${editingMemberId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                cancelMemberEdit();
                fetchMembers();
                return;
            } catch (err) {
                console.error(err);
                alert(err.response?.data?.message || "Failed to update member");
            }
        } else {
            try {
                await api.post(
                    "/members",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                cancelMemberEdit();
                fetchMembers();
            } catch (err) {
                console.error(err);
                alert(err.response?.data?.message || "Failed to create member");
            }
        }
    };

    const startEditMember = (member) => {
        setEditingMemberId(member._id);
        setMemberData({
            name: member.name || "",
            role: member.role || "",
            bio: member.bio || "",
            image: member.image || "",
            linkedin: member.linkedin || "",
            regionalCircle: member.regionalCircle || "none",
            wing: member.wing || "none",
            age: member.age !== undefined && member.age !== null ? member.age : "",
            quote: member.quote || "",
            joinedAt: member.joinedAt ? member.joinedAt.substring(0, 10) : "",
            qualifications: Array.isArray(member.qualifications) ? member.qualifications : [],
            achievements: Array.isArray(member.achievements) ? member.achievements : [],
        });
        setMemberFile(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cancelMemberEdit = () => {
        setEditingMemberId(null);
        setMemberData(initialMemberState);
        setMemberFile(null);
    };

    // DELETE MEMBER
    const deleteMember = async (id) => {
        if (!window.confirm("Delete this member?")) return;
        try {
            await api.delete(`/members/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchMembers();
        } catch (err) {
            console.error(err);
        }
    };

    //ADD EVENT
    const addEvent = async (e) => {
        e.preventDefault();

        if (editingEventId) {
            try {
                await api.put(
                    `/events/${editingEventId}`,
                    eventData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setEditingEventId(null);

                setEventData({
                    title: "",
                    description: "",
                    location: "",
                    date: "",
                    regionalCircle: "none",
                    images: [],
                });

                fetchEvents();

                return;
            } catch (err) {
                console.error(err);
            }
        }

        try {
            await api.post(
                "/events",
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEventData({
                title: "",
                description: "",
                location: "",
                date: "",
                images: [],
            });

            setSelectedFiles([]);
            setUploadProgress("");

            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const cancelEventEdit = () => {
        setEditingEventId(null);

        setEventData({
            title: "",
            description: "",
            location: "",
            date: "",
            images: [],
        });

        setSelectedFiles([]);
        setUploadProgress("");
    };
    // DELETE EVENT
    const deleteEvent = async (id) => {
        if (!window.confirm("Delete this event?")) return;
        try {
            await api.delete(`/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const validateFile = (file) => {
        const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes

        if (!validFormats.includes(file.type)) {
            return { valid: false, reason: `Invalid format (${file.type.split('/')[1] || 'unknown'}). Only jpg, jpeg, png, webp allowed.` };
        }

        if (file.size > maxSize) {
            return { valid: false, reason: `File size ${(file.size / (1024 * 1024)).toFixed(2)}MB exceeds 5MB limit.` };
        }

        return { valid: true };
    };

    const uploadImage = async () => {
        if (!selectedFiles || selectedFiles.length === 0) return;

        setUploadingImage(true);
        const totalFiles = selectedFiles.length;
        const uploadResults = {
            successful: [],
            failed: []
        };

        for (let i = 0; i < totalFiles; i++) {
            const file = selectedFiles[i];
            setUploadProgress(`Uploading ${i + 1} of ${totalFiles}...`);

            // Validate file
            const validation = validateFile(file);
            if (!validation.valid) {
                uploadResults.failed.push({
                    name: file.name,
                    reason: validation.reason
                });
                continue;
            }

            try {
                const formData = new FormData();
                formData.append("image", file);

                const res = await api.post(
                    "/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setEventData((prev) => ({
                    ...prev,
                    images: [...prev.images, res.data.imageUrl],
                }));

                uploadResults.successful.push(file.name);
            } catch (err) {
                console.error(err);
                uploadResults.failed.push({
                    name: file.name,
                    reason: err.response?.data?.message || "Upload failed"
                });
            }
        }

        setSelectedFiles([]);
        setUploadingImage(false);
        setUploadProgress("");

        // Show detailed results
        let message = "";
        if (uploadResults.successful.length > 0) {
            message += `✓ Successfully uploaded ${uploadResults.successful.length} image(s).\n`;
        }
        if (uploadResults.failed.length > 0) {
            message += `\n✗ Failed to upload ${uploadResults.failed.length} image(s):\n`;
            uploadResults.failed.forEach(fail => {
                message += `  • ${fail.name}: ${fail.reason}\n`;
            });
        }
        alert(message.trim());
    };

    const removeImage = (indexToRemove) => {
        if (!window.confirm("Xosai katpi na meksudai ???")) return;
        setEventData((prev) => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove),
        }));
    };

    // UPDATE VOLUNTEER STATUS
    const updateVolunteerStatus = async (id, status) => {
        try {
            await api.put(
                `/volunteers/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchVolunteers();
        } catch (err) {
            console.error(err);
        }
    };

    // DELETE VOLUNTEER
    const deleteVolunteer = async (id) => {
        if (!window.confirm("Delete this volunteer application?")) return;
        try {
            await api.delete(`/volunteers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchVolunteers();
        } catch (err) {
            console.error(err);
        }
    };

    // UPDATE CONTACT STATUS
    const updateContactStatus = async (id, status) => {
        try {
            await api.patch(
                `/contact/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchContacts();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMembers();
        fetchEvents();
        fetchVolunteers();
        fetchContacts();
        fetchSubscribers();
    }, []);

    //LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/admin");
    };

    const filteredVolunteers = volunteerFilter === "all"
        ? volunteers
        : volunteers.filter(v => v.status === volunteerFilter);

    const filteredContacts = contactFilter === "all"
        ? contacts
        : contacts.filter(c => c.status === contactFilter);

    const statusBadgeClass = (status) => {
        const statusMap = {
            pending: "status-pending",
            approved: "status-approved",
            rejected: "status-rejected",
            new: "status-new",
            read: "status-read",
            responded: "status-responded",
            archived: "status-archived",
        };
        return statusMap[status] || "";
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={logout} className="logout-btn">
                    Logout
                </button>
            </header>

            <nav className="admin-nav">
                <button
                    className={activeSection === "members" ? "active" : ""}
                    onClick={() => setActiveSection("members")}
                >
                    Members
                </button>
                <button
                    className={activeSection === "events" ? "active" : ""}
                    onClick={() => setActiveSection("events")}
                >
                    Events
                </button>
                <button
                    className={activeSection === "volunteers" ? "active" : ""}
                    onClick={() => setActiveSection("volunteers")}
                >
                    Volunteers <span className="badge">{volunteers.filter(v => v.status === "pending").length}</span>
                </button>
                <button
                    className={activeSection === "contacts" ? "active" : ""}
                    onClick={() => setActiveSection("contacts")}
                >
                    Contact Messages <span className="badge">{contacts.filter(c => c.status === "new").length}</span>
                </button>
                <button
                    className={activeSection === "subscribers" ? "active" : ""}
                    onClick={() => setActiveSection("subscribers")}
                >
                    Subscribers <span className="badge">{subscribers.filter(s => s.status === "active").length}</span>
                </button>
            </nav>

            <main className="admin-main">
                {activeSection === "members" && (
                    <section className="admin-section">
                        <h2>Members Management</h2>
                        <form onSubmit={addMember} className="admin-form">
                            {/* Row 1: Name & Role */}
                            <div className="form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">
                                        Full Name <span className="required-star">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Jane Doe"
                                        value={memberData.name}
                                        onChange={(e) =>
                                            setMemberData({
                                                ...memberData,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">
                                        Role / Position <span className="required-star">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Director of Research & Impact"
                                        value={memberData.role}
                                        onChange={(e) =>
                                            setMemberData({
                                                ...memberData,
                                                role: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 2: Wing & Regional Circle */}
                            <div className="form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Wing</label>
                                    <select
                                        value={memberData.wing}
                                        onChange={(e) =>
                                            setMemberData({
                                                ...memberData,
                                                wing: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="none">None (General / Leadership)</option>
                                        <option value="program_research">Program & Research Wing</option>
                                        <option value="college_units">College Units Wing</option>
                                        <option value="core_admin">Core Administration Wing</option>
                                        <option value="tech">Technology Wing</option>
                                        <option value="media_pr">Media & PR Wing</option>
                                        <option value="finance">Finance Wing</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Regional Circle</label>
                                    <select
                                        value={memberData.regionalCircle}
                                        onChange={(e) =>
                                            setMemberData({
                                                ...memberData,
                                                regionalCircle: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="none">None (HQ / Central)</option>
                                        <option value="guwahati">Guwahati Circle</option>
                                        <option value="barpeta">Barpeta Circle</option>
                                        <option value="barpeta_road">Barpeta Road Circle</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 3: Age, Joined Date, LinkedIn */}
                            <div className="form-grid-3">
                                <div className="form-group">
                                    <label className="form-label">Age</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 28"
                                        min="1"
                                        max="120"
                                        value={memberData.age}
                                        onChange={(e) =>
                                            setMemberData({
                                                ...memberData,
                                                age: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Joined Date</label>
                                    <input
                                        type="date"
                                        value={memberData.joinedAt}
                                        onChange={(e) =>
                                            setMemberData({
                                                ...memberData,
                                                joinedAt: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">LinkedIn Profile URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        value={memberData.linkedin}
                                        onChange={(e) =>
                                            setMemberData({
                                                ...memberData,
                                                linkedin: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="form-group">
                                <label className="form-label">Inspirational Quote / Motto</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Empowering youth for a sustainable tomorrow"
                                    value={memberData.quote}
                                    onChange={(e) =>
                                        setMemberData({
                                            ...memberData,
                                            quote: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* Bio */}
                            <div className="form-group">
                                <label className="form-label">Biography / Background</label>
                                <textarea
                                    rows="3"
                                    placeholder="Detailed background, achievements, and contributions..."
                                    value={memberData.bio}
                                    onChange={(e) =>
                                        setMemberData({
                                            ...memberData,
                                            bio: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* Profile Image */}
                            <div className="form-group">
                                <label className="form-label">Profile Image</label>
                                <div className="image-upload-row">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => setMemberFile(e.target.files[0] || null)}
                                    />
                                    <button
                                        type="button"
                                        onClick={uploadMemberImage}
                                        disabled={!memberFile || uploadingMemberImage}
                                        className="btn-secondary"
                                    >
                                        {uploadingMemberImage ? "Uploading..." : "Upload Profile Image"}
                                    </button>
                                </div>
                                {memberData.image && (
                                    <div className="member-image-preview">
                                        <img src={memberData.image} alt="Member Avatar Preview" />
                                        <button
                                            type="button"
                                            onClick={removeMemberImage}
                                            className="btn-remove-image"
                                            title="Remove Image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Qualifications (Dynamic Array) */}
                            <div className="form-nested-section">
                                <div className="nested-section-header">
                                    <label className="form-label">Academic & Professional Qualifications</label>
                                    <button
                                        type="button"
                                        onClick={handleAddQualification}
                                        className="btn-add-nested"
                                    >
                                        + Add Qualification
                                    </button>
                                </div>
                                {memberData.qualifications && memberData.qualifications.length === 0 ? (
                                    <p className="text-muted" style={{ margin: 0, fontSize: "0.85rem" }}>
                                        No qualifications added yet. Click "+ Add Qualification" above.
                                    </p>
                                ) : (
                                    memberData.qualifications.map((q, index) => (
                                        <div key={index} className="nested-item-row">
                                            <input
                                                type="text"
                                                placeholder="Degree / Diploma / Certification (e.g. M.Sc Environmental Science)"
                                                value={q.qual || ""}
                                                onChange={(e) =>
                                                    handleUpdateQualification(index, "qual", e.target.value)
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year (e.g. 2021)"
                                                style={{ maxWidth: "140px" }}
                                                value={q.year || ""}
                                                onChange={(e) =>
                                                    handleUpdateQualification(index, "year", e.target.value)
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveQualification(index)}
                                                className="btn-delete btn-sm"
                                                title="Delete Qualification"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Achievements (Dynamic Array) */}
                            <div className="form-nested-section">
                                <div className="nested-section-header">
                                    <label className="form-label">Key Achievements & Honors</label>
                                    <button
                                        type="button"
                                        onClick={handleAddAchievement}
                                        className="btn-add-nested"
                                    >
                                        + Add Achievement
                                    </button>
                                </div>
                                {memberData.achievements && memberData.achievements.length === 0 ? (
                                    <p className="text-muted" style={{ margin: 0, fontSize: "0.85rem" }}>
                                        No achievements added yet. Click "+ Add Achievement" above.
                                    </p>
                                ) : (
                                    memberData.achievements.map((a, index) => (
                                        <div key={index} className="nested-item-row">
                                            <input
                                                type="text"
                                                placeholder="Award / Milestone / Honor (e.g. National Youth Leadership Award)"
                                                value={a.title || ""}
                                                onChange={(e) =>
                                                    handleUpdateAchievement(index, "title", e.target.value)
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year (e.g. 2023)"
                                                style={{ maxWidth: "140px" }}
                                                value={a.year || ""}
                                                onChange={(e) =>
                                                    handleUpdateAchievement(index, "year", e.target.value)
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveAchievement(index)}
                                                className="btn-delete btn-sm"
                                                title="Delete Achievement"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Form Submission Actions */}
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">
                                    {editingMemberId ? "Update Member" : "Add Member"}
                                </button>
                                {editingMemberId && (
                                    <button
                                        type="button"
                                        onClick={cancelMemberEdit}
                                        className="btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Members Data List */}
                        <div className="data-list">
                            {members.length === 0 ? (
                                <p className="empty-state">No members found in the database.</p>
                            ) : (
                                members.map((member) => (
                                    <div key={member._id} className="data-card">
                                        <div className="member-card-wrapper">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="member-card-avatar"
                                                />
                                            ) : (
                                                <div className="member-card-avatar-placeholder">
                                                    {member.name ? member.name.charAt(0).toUpperCase() : "M"}
                                                </div>
                                            )}
                                            <div className="data-content">
                                                <h3>{member.name}</h3>
                                                <p><strong>{member.role}</strong></p>
                                                <div className="member-meta-tags">
                                                    {member.wing && member.wing !== "none" && (
                                                        <span className="member-tag member-tag-wing">
                                                            Wing: {member.wing.replace(/_/g, " ").toUpperCase()}
                                                        </span>
                                                    )}
                                                    {member.regionalCircle && member.regionalCircle !== "none" && (
                                                        <span className="member-tag member-tag-circle">
                                                            Circle: {member.regionalCircle.replace(/_/g, " ").toUpperCase()}
                                                        </span>
                                                    )}
                                                    {member.age && (
                                                        <span className="member-tag">
                                                            Age: {member.age}
                                                        </span>
                                                    )}
                                                    {member.joinedAt && (
                                                        <span className="member-tag">
                                                            Joined: {new Date(member.joinedAt).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                                {member.bio && (
                                                    <p className="text-muted" style={{ marginTop: "0.5rem" }}>
                                                        {member.bio.length > 120 ? `${member.bio.substring(0, 120)}...` : member.bio}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="data-actions">
                                            <button
                                                onClick={() => startEditMember(member)}
                                                className="btn-edit"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteMember(member._id)}
                                                className="btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                )}

                {activeSection === "events" && (
                    <section className="admin-section">
                        <h2>Events Management</h2>
                        <form onSubmit={addEvent} className="admin-form">
                            <input
                                type="text"
                                placeholder="Title"
                                value={eventData.title}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        title: e.target.value,
                                    })
                                }
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={eventData.description}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        description: e.target.value,
                                    })
                                }
                                required
                            />
                            <div className="form-group">
                                <label className="form-label">Regional Circle</label>
                                <select
                                    value={eventData.regionalCircle || "none"}
                                    onChange={(e) =>
                                        setEventData({
                                            ...eventData,
                                            regionalCircle: e.target.value,
                                        })
                                    }
                                >
                                    <option value="none">None (National/Global)</option>
                                    <option value="guwahati">Guwahati Circle</option>
                                    <option value="barpeta">Barpeta Circle</option>
                                    <option value="barpeta_road">Barpeta Road Circle</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                placeholder="Location"
                                value={eventData.location}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        location: e.target.value,
                                    })
                                }
                                required
                            />
                            <input
                                type="date"
                                value={eventData.date}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        date: e.target.value,
                                    })
                                }
                                required
                            />
                            <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={(e) =>
                                    setSelectedFiles(Array.from(e.target.files))
                                }
                            />
                            <button
                                type="button"
                                onClick={uploadImage}
                                className="btn-secondary"
                                disabled={uploadingImage || !selectedFiles || selectedFiles.length === 0}
                            >
                                {uploadingImage ? uploadProgress : `Upload Image${selectedFiles.length > 1 ? 's' : ''}`}
                            </button>

                            <div className="image-preview">
                                {eventData.images.map((img, index) => (
                                    <div key={index} className="image-preview-item">
                                        <img
                                            src={img}
                                            alt={`Preview ${index}`}
                                        />
                                        <button
                                            type="button"
                                            className="btn-remove-image"
                                            onClick={() => removeImage(index)}
                                            title="Remove image"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-primary">
                                    {editingEventId ? "Update Event" : "Add Event"}
                                </button>
                                {editingEventId && (
                                    <button
                                        type="button"
                                        onClick={cancelEventEdit}
                                        className="btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="data-list">
                            {events.map((event) => (
                                <div key={event._id} className="data-card">
                                    <div className="data-content">
                                        <h3>{event.title}</h3>
                                        <p>{event.location}</p>
                                        <p className="text-muted">
                                            {event.date ? new Date(event.date).toLocaleDateString() : ""}
                                        </p>
                                    </div>
                                    <div className="data-actions">
                                        <button
                                            onClick={() => {
                                                setEditingEventId(event._id);
                                                setEventData({
                                                    title: event.title,
                                                    description: event.description,
                                                    location: event.location,
                                                    date: event.date
                                                        ? event.date.split("T")[0]
                                                        : "",
                                                    regionalCircle: event.regionalCircle || "none",
                                                    images: event.images || [],
                                                });
                                            }}
                                            className="btn-edit"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteEvent(event._id)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeSection === "volunteers" && (
                    <section className="admin-section">
                        <h2>Volunteer Applications</h2>
                        <div className="filter-bar">
                            <button
                                className={volunteerFilter === "all" ? "active" : ""}
                                onClick={() => setVolunteerFilter("all")}
                            >
                                All ({volunteers.length})
                            </button>
                            <button
                                className={volunteerFilter === "pending" ? "active" : ""}
                                onClick={() => setVolunteerFilter("pending")}
                            >
                                Pending ({volunteers.filter(v => v.status === "pending").length})
                            </button>
                            <button
                                className={volunteerFilter === "approved" ? "active" : ""}
                                onClick={() => setVolunteerFilter("approved")}
                            >
                                Approved ({volunteers.filter(v => v.status === "approved").length})
                            </button>
                            <button
                                className={volunteerFilter === "rejected" ? "active" : ""}
                                onClick={() => setVolunteerFilter("rejected")}
                            >
                                Rejected ({volunteers.filter(v => v.status === "rejected").length})
                            </button>
                        </div>

                        <div className="data-list">
                            {filteredVolunteers.map((volunteer) => (
                                <div key={volunteer._id} className="data-card volunteer-card">
                                    <div className="data-content">
                                        <div className="volunteer-header">
                                            <h3>{volunteer.name}</h3>
                                            <span className={`status-badge ${statusBadgeClass(volunteer.status)}`}>
                                                {volunteer.status}
                                            </span>
                                        </div>
                                        <p><strong>Email:</strong> {volunteer.email}</p>
                                        <p><strong>Phone:</strong> {volunteer.phone}</p>
                                        <p><strong>Role:</strong> {volunteer.role}</p>
                                        <p><strong>Regional Circle:</strong> {volunteer.regionalCircle}</p>
                                        {volunteer.message && (
                                            <p className="volunteer-message"><strong>Message:</strong> {volunteer.message}</p>
                                        )}
                                        <p className="text-muted">
                                            Applied: {new Date(volunteer.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="data-actions">
                                        {volunteer.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => updateVolunteerStatus(volunteer._id, "approved")}
                                                    className="btn-approve"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => updateVolunteerStatus(volunteer._id, "rejected")}
                                                    className="btn-reject"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {volunteer.status !== "pending" && (
                                            <button
                                                onClick={() => updateVolunteerStatus(volunteer._id, "pending")}
                                                className="btn-secondary"
                                            >
                                                Reset to Pending
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteVolunteer(volunteer._id)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredVolunteers.length === 0 && (
                                <p className="empty-state">No volunteer applications found.</p>
                            )}
                        </div>
                    </section>
                )}

                {activeSection === "contacts" && (
                    <section className="admin-section">
                        <h2>Contact Messages</h2>
                        <div className="filter-bar">
                            <button
                                className={contactFilter === "all" ? "active" : ""}
                                onClick={() => setContactFilter("all")}
                            >
                                All ({contacts.length})
                            </button>
                            <button
                                className={contactFilter === "new" ? "active" : ""}
                                onClick={() => setContactFilter("new")}
                            >
                                New ({contacts.filter(c => c.status === "new").length})
                            </button>
                            <button
                                className={contactFilter === "read" ? "active" : ""}
                                onClick={() => setContactFilter("read")}
                            >
                                Read ({contacts.filter(c => c.status === "read").length})
                            </button>
                            <button
                                className={contactFilter === "responded" ? "active" : ""}
                                onClick={() => setContactFilter("responded")}
                            >
                                Responded ({contacts.filter(c => c.status === "responded").length})
                            </button>
                            <button
                                className={contactFilter === "archived" ? "active" : ""}
                                onClick={() => setContactFilter("archived")}
                            >
                                Archived ({contacts.filter(c => c.status === "archived").length})
                            </button>
                        </div>

                        <div className="data-list">
                            {filteredContacts.map((contact) => (
                                <div key={contact._id} className="data-card contact-card">
                                    <div className="data-content">
                                        <div className="contact-header">
                                            <div>
                                                <h3>{contact.name}</h3>
                                                {contact.organisation && (
                                                    <p className="text-muted">{contact.organisation}</p>
                                                )}
                                            </div>
                                            <span className={`status-badge ${statusBadgeClass(contact.status)}`}>
                                                {contact.status}
                                            </span>
                                        </div>
                                        <p><strong>Email:</strong> {contact.email}</p>
                                        <p><strong>Subject:</strong> {contact.subject}</p>
                                        <div className="contact-message-preview">
                                            <p>
                                                <strong>Message:</strong>{" "}
                                                {expandedContact === contact._id
                                                    ? contact.message
                                                    : contact.message.substring(0, 100) + (contact.message.length > 100 ? "..." : "")}
                                            </p>
                                            {contact.message.length > 100 && (
                                                <button
                                                    onClick={() =>
                                                        setExpandedContact(
                                                            expandedContact === contact._id ? null : contact._id
                                                        )
                                                    }
                                                    className="btn-link"
                                                >
                                                    {expandedContact === contact._id ? "Show less" : "Show more"}
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-muted">
                                            Received: {new Date(contact.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="data-actions">
                                        <select
                                            value={contact.status}
                                            onChange={(e) =>
                                                updateContactStatus(contact._id, e.target.value)
                                            }
                                            className="status-select"
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="responded">Responded</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                            {filteredContacts.length === 0 && (
                                <p className="empty-state">No contact messages found.</p>
                            )}
                        </div>
                    </section>
                )}

                {activeSection === "subscribers" && (
                    <section className="admin-section">
                        <h2>Newsletter Subscribers</h2>
                        <p className="section-description">
                            Total active subscribers: {subscribers.filter(s => s.status === "active").length}
                        </p>

                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Source</th>
                                        <th>Status</th>
                                        <th>Subscribed Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.map((subscriber) => (
                                        <tr key={subscriber._id}>
                                            <td>{subscriber.email}</td>
                                            <td>{subscriber.source}</td>
                                            <td>
                                                <span
                                                    className={`status-badge ${
                                                        subscriber.status === "active"
                                                            ? "status-approved"
                                                            : "status-rejected"
                                                    }`}
                                                >
                                                    {subscriber.status}
                                                </span>
                                            </td>
                                            <td>{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {subscribers.length === 0 && (
                                <p className="empty-state">No subscribers yet.</p>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default AdminDashboard;
