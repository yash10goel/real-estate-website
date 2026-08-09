import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

import { useState } from "react";
import { supabase } from "../../configs/supabase";
import { CheckCircle2 } from "lucide-react";




const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};





function InputField({
  label,
  type = "text",
  value,
  onChange,
}) {
  return (
    <motion.div variants={item}>
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-14
          px-5
          rounded-2xl
          border
          border-secondary/15
          dark:border-white/15
          bg-card-light
          dark:bg-card-dark
          text-secondary
          dark:text-white
          outline-none
          transition-all
          duration-300
          hover:border-primary/40
          focus:border-primary
          focus:ring-4
          focus:ring-primary/20
        "
      />
    </motion.div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}) {
  return (
    <motion.div variants={item}>
      <textarea
        rows="6"
        placeholder={label}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-5
          py-4
          rounded-2xl
          border
          border-secondary/15
          dark:border-white/15
          bg-card-light
          dark:bg-card-dark
          text-secondary
          dark:text-white
          outline-none
          resize-none
          transition-all
          duration-300
          hover:border-primary/40
          focus:border-primary
          focus:ring-4
          focus:ring-primary/20
        "
      />
    </motion.div>
  );
}

export default function ContactPage() {

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("contact_leads")
        .insert([
          {
            full_name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

      if (error) throw error;

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  return (

    <>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="
      fixed
      top-8
      left-1/2
      -translate-x-1/2
      z-[9999]
      w-[90%]
      max-w-md
    "
        >
          <div
            className="
        bg-card-light dark:bg-card-dark
        rounded-3xl
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        border
        border-primary/20
      "
          >
            <div className="flex items-start gap-4">
              <div
                className="
            w-14
            h-14
            rounded-full
            bg-primary/10
            flex
            items-center
            justify-center
            flex-shrink-0
          "
              >
                <CheckCircle2
                  size={30}
                  className="text-primary"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white">
                  Message Sent Successfully!
                </h3>

                <p className="text-secondary/60 dark:text-white/70 mt-2 leading-relaxed">
                  Thank you for contacting RKGC Group.
                  Our team will connect with you shortly to
                  discuss your project requirements.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <section className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-br from-bg-light via-white to-primary/5 dark:from-bg-dark dark:via-bg-dark dark:to-secondary transition-colors duration-300">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-accent/10 blur-[140px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            {/* LEFT SIDE */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="
              bg-card-light/90 dark:bg-card-dark/90
              backdrop-blur-xl
              border
              border-secondary/10 dark:border-white/10
              rounded-[32px]
              p-8
              md:p-12
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            "
            >
              <motion.span
                variants={item}
                className="
                inline-flex
                px-4
                py-2
                rounded-full
                bg-primary/10
                text-primary
                text-xs
                font-semibold
                tracking-widest
              "
              >
                CONTACT US
              </motion.span>

              <motion.h1
                variants={item}
                className="
                font-heading
                text-4xl
                md:text-5xl
                font-bold
                mt-5
                leading-tight
                text-secondary dark:text-white
              "
              >
                Let's Build
                <span className="block text-primary">
                  Your Dream Project
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="text-secondary/60 dark:text-white/60 mt-5 text-lg"
              >
                Have an idea or project in mind? We'd love to hear from
                you and help bring it to life.
              </motion.p>
              <div className="grid md:grid-cols-2 gap-4 mt-10">
                <InputField
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                />

                <InputField
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />

                <InputField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />

                <InputField
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-4">
                <TextAreaField
                  label="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                />
              </div>



              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                variants={item}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="
    mt-6
    px-8
    py-4
    rounded-2xl
    bg-gradient-to-r from-primary to-accent
    text-secondary
    font-semibold
    shadow-glow
    hover:shadow-[0_0_45px_rgba(244,180,0,0.5)]
    transition-all
    duration-300
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
  "
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="
              relative
              h-fit
              overflow-hidden
              rounded-[32px]
              bg-secondary
              p-8
              text-white
              border
              border-primary/20
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

              <div className="relative z-10">
                <span className="text-primary text-sm font-semibold tracking-widest">
                  GET IN TOUCH
                </span>

                <h3 className="font-heading text-3xl font-bold mt-4">
                  Contact Information
                </h3>

                <p className="text-white/50 mt-4">
                  Reach out to us anytime. We are always ready to discuss
                  your project requirements.
                </p>

                <div className="space-y-4 mt-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4">
                    <MapPin className="text-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-white/50 text-sm">Office Address</p>
                      <p>408, 409 4th Floor, Aditya High Street, Lalkuan, Ghaziabad</p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4">
                    <MapPin className="text-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-white/50 text-sm">Head Office</p>
                      <p>Plot No 2, Vill Kot, Near EPE Toll Plaza, Dadri - 203207</p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4">
                    <Phone className="text-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-white/50 text-sm">Phone</p>
                      <p>+91 77352 35277</p>
                      <p>+91 8527190899</p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4">
                    <Mail className="text-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-white/50 text-sm">Email</p>
                      <p>info@rkgcgroup.com</p>
                      <p>rkgupta0001@gmail.com</p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4">
                    <Clock className="text-primary mt-1" />
                    <div>
                      <p className="text-white/50 text-sm">
                        Working Hours
                      </p>
                      <p>Mon - Sat | 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-heading text-3xl font-bold text-primary">
                      150+
                    </h4>
                    <p className="text-white/50 text-sm mt-1">
                      Projects
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-heading text-3xl font-bold text-primary">
                      10+
                    </h4>
                    <p className="text-white/50 text-sm mt-1">
                      Years Experience
                    </p>
                  </div>
                </div>

                {/* Social */}
                <div className="flex gap-3 mt-8">
                  {[
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Linkedin, label: "LinkedIn" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-white/5
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        hover:bg-primary
                        hover:text-secondary
                        hover:border-primary
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                      "
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}