import styles from "./Join.module.css"
import { useState } from "react"
import api from "../services/api"

export default function JoinButton () {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        regionalCircle: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.role || !formData.regionalCircle) {
            setError("Please fill in all required fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await api.post("/volunteers", formData);
            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                role: "",
                regionalCircle: "",
                message: "",
            });

            // Show success for 3 seconds, then close
            setTimeout(() => {
                setSuccess(false);
                setOpen(false);
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <>

            <div className={`${styles.joinCollective} `}>
                <h2 className={styles.jcTitle}>Join the Collective</h2>
                <div className={`styles.Content ${open ? styles.expanded : ""}`}>
                    <div className={`${styles.buttonWrapper} ${open ? styles.hide : ""}`}>
                        <p className={styles.jcDesc}>
                            We're always looking for brilliant minds to join our mission. Apply to become
                            a field volunteer, campus ambassador, or regional team member.
                        </p>
                        <button className={`${styles.btnCareers} ${open ? styles.hide : ""}`} onClick={()=> setOpen(!open)}>APPLY NOW</button>
                    </div>
                </div>
            <div className={`${styles.joinForm} ${open ? styles.show : ""}`}>
               {success && (
                   <div style={{ padding: "1rem", backgroundColor: "#10b981", color: "white", borderRadius: "4px", marginBottom: "1rem", textAlign: "center" }}>
                       ✓ Application submitted successfully! We'll contact you soon.
                   </div>
               )}

               {error && (
                   <div style={{ padding: "1rem", backgroundColor: "#ef4444", color: "white", borderRadius: "4px", marginBottom: "1rem", textAlign: "center" }}>
                       {error}
                   </div>
               )}

               <input
                   type="text"
                   name="name"
                   placeholder="Full Name *"
                   className={styles.name}
                   value={formData.name}
                   onChange={handleInputChange}
                   disabled={loading}
               />
               <input
                   type="tel"
                   name="phone"
                   placeholder="Phone Number *"
                   className={styles.number}
                   value={formData.phone}
                   onChange={handleInputChange}
                   disabled={loading}
               />
               <input
                   type="email"
                   name="email"
                   placeholder="Email Address *"
                   className={styles.email}
                   value={formData.email}
                   onChange={handleInputChange}
                   disabled={loading}
               />

               <span className={styles.branchTitle}>Role / Branch *</span>
               <label className={styles.RND}>
                    <input
                        type="radio"
                        name="role"
                        value="Field Volunteer"
                        className={styles.inp}
                        checked={formData.role === "Field Volunteer"}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className={styles.text}>Field Volunteer</div>
               </label>
               <label className={styles.Tech}>
                    <input
                        type="radio"
                        name="role"
                        value="Tech Volunteer"
                        className={styles.inp}
                        checked={formData.role === "Tech Volunteer"}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className={styles.text}>Tech Volunteer</div>
               </label>
               <label className={styles.PR}>
                    <input
                        type="radio"
                        name="role"
                        value="Media & Content"
                        className={styles.inp}
                        checked={formData.role === "Media & Content"}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className={styles.text}>Media & Content</div>
               </label>
               <label className={styles.Volunteer}>
                    <input
                        type="radio"
                        name="role"
                        value="Campus Ambassador"
                        className={styles.inp}
                        checked={formData.role === "Campus Ambassador"}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className={styles.text}>Campus Ambassador</div>
               </label>

               <span className={styles.RegionTitle}>Preferred Regional Circle *</span>
               <label className={styles.Guwahati}>
                    <input
                        type="radio"
                        name="regionalCircle"
                        value="Guwahati"
                        className={styles.inp}
                        checked={formData.regionalCircle === "Guwahati"}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className={styles.text}>Guwahati</div>
               </label>
               <label className={styles.Barpeta}>
                    <input
                        type="radio"
                        name="regionalCircle"
                        value="Barpeta"
                        className={styles.inp}
                        checked={formData.regionalCircle === "Barpeta"}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className={styles.text}>Barpeta</div>
               </label>
               <label className={styles.BarpetaRoad}>
                    <input
                        type="radio"
                        name="regionalCircle"
                        value="Barpeta Road"
                        className={styles.inp}
                        checked={formData.regionalCircle === "Barpeta Road"}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <div className={styles.text}>Barpeta Road</div>
               </label>

               <button
                   className={styles.submitBtn}
                   onClick={handleSubmit}
                   disabled={loading}
               >
                   {loading ? "Submitting..." : "Submit Application"}
               </button>
            </div>
        </div>
        </>
    )
} 