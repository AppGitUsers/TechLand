import { useState ,useEffect} from "react";
// import { supabase } from "../supabase";
import { useNavigate ,useLocation} from "react-router-dom";



export default function HotJobsPage() {
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
          service:formDate.service
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
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-brand-dark text-brand-text">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 shadow-2xl">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Submit Your service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
            <option value="">Select a Service</option>
            {/* {SERVICES.map((s, i) => (
                <option key={i} value={s.title}>
                {s.title}
                </option>
            ))} */}
            <option value="Custom Web Applications">Custom Web Applications</option>
            <option value="Mobile & Cross-Platform Applications">Mobile & Cross-Platform Applications</option>
            <option value="Responsive Websites & Business Portals">Responsive Websites & Business Portals</option>
            <option value="Desktop Applications & Enterprise Software">Desktop Applications & Enterprise Software</option>
            <option value="CRM & Business Automation Systems">CRM & Business Automation Systems</option>
            <option value="Invoice Management & Maintenance">Invoice Management & Ongoing Maintenance</option>
          </select>


          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-brand-primary font-semibold hover:opacity-90 transition duration-300"
          >
            Submit Application
          </button>

        </form>
      </div>

            {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl animate-fadeIn">

            <h3 className="text-2xl font-bold mb-4 text-brand-primary">
               Request Received Successfully 🚀
            </h3>

            <p className="text-brand-text/80 mb-6">
               Thanks for reaching out. Our team will review your project details and get back to you within 24 hours.
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/");
              }}
              className="px-6 py-2 rounded-lg bg-brand-primary font-semibold hover:opacity-90 transition"
            >
              OK
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
