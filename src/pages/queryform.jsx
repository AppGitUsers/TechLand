import { useState ,useEffect} from "react";
import { supabase } from "../supabase";
import { useNavigate ,useLocation} from "react-router-dom";



export default function QueryForm() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    service:"",

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const selectedService = params.get("service");

  if (selectedService) {
    setFormData((prev) => ({
      ...prev,
      service: selectedService,
    }));
  }
}, [location.search]);




const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // 2️⃣ Insert into DB
    const { error: insertError } = await supabase
      .from("techlandqueries")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          service:formData.service
        },
      ]);

    if (insertError) throw insertError;

    setShowSuccess(true);

  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
  
};


      return (
      <section className="section" id="contact">
        <div className="container">
          <div className="query-wrapper">

            <div className="query-card reveal">
              <h2 className="query-title">
                Submit Your Service
              </h2>

              <form onSubmit={handleSubmit} className="query-form">

                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select a Service</option>
                    <option value="Custom Web Applications">Custom Web Applications</option>
                    <option value="Mobile & Cross-Platform Applications">Mobile & Cross-Platform Applications</option>
                    <option value="Responsive Websites & Business Portals">Responsive Websites & Business Portals</option>
                    <option value="Desktop Applications & Enterprise Software">Desktop Applications & Enterprise Software</option>
                    <option value="CRM & Business Automation Systems">CRM & Business Automation Systems</option>
                    <option value="Invoice Management & Maintenance">Invoice Management & Ongoing Maintenance</option>
                  </select>
                </div>

                <button type="submit" className="btn">
                  Submit Request
                </button>

              </form>
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-modal">
              <h3>Request Received Successfully 🚀</h3>
              <p>
                Thanks for reaching out. Our team will review your project details and get back to you within 24 hours.
              </p>
              <button
                className="btn"
                onClick={() => {
                  setShowSuccess(false);
                  navigate("/");
                }}
              >
                OK
              </button>
            </div>
          </div>  
        )}
      </section>
    );
}
