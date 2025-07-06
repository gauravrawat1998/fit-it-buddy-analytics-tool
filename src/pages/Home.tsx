import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Zap,
  Upload,
  Shield,
  Clock,
  Users,
  Target,
  Award,
  Lightbulb,
} from "lucide-react";
import FileUpload from "../components/FileUpload";
import Footer from "../components/Footer";
import { useAppDispatch } from "../hooks/useRedux";
import { clearExcelData } from "../store/slices/excelDataSlice";
import { clearFilters } from "../store/slices/filtersSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFileProcessed = (data: any[]) => {
    // Store data in localStorage for demo purposes
    // localStorage.setItem('excelData', JSON.stringify(data));

    // Navigate to Excel Ready page with smooth transition
    setTimeout(() => {
      navigate("/excel-ready");
    }, 500);
  };

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Instant Revenue Insights",
      description:
        "Get comprehensive revenue analysis with year-over-year comparisons instantly",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Year-over-Year Comparisons",
      description:
        "Compare performance metrics across different time periods effortlessly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Visualize Occupancy & ADR Trends",
      description:
        "Beautiful charts and graphs to understand your business performance",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Simplify Complex Excel Sheets",
      description:
        "Transform complex spreadsheets into clear, actionable insights",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Easy File Upload",
      description: "Drag & drop your Excel files and get instant processing",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "Your data is processed securely with enterprise-grade protection",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const aboutFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save Hours of Work",
      description: "Automate complex Excel analysis that used to take hours",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Share insights easily with your team and stakeholders",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Accurate Insights",
      description:
        "Get precise analytics with advanced data processing algorithms",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Leading",
      description: "Trusted by thousands of businesses worldwide",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Files Processed" },
    { number: "500+", label: "Happy Customers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  useEffect(() => {
    dispatch(clearExcelData());
    dispatch(clearFilters());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FixIT Buddy
              </span>{" "}
              empowers your business decisions from Excel data
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Drag & drop your spreadsheets and unlock powerful insights
              instantly. Transform your raw data into actionable business
              intelligence.
            </motion.p>
          </div>

          {/* File Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <FileUpload onFileProcessed={handleFileProcessed} />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Smart Analytics
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform transforms complex Excel data into clear, actionable
              insights that help you make better business decisions faster than
              ever before.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Data?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using FixIT Buddy to make
              smarter, data-driven decisions every day.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector(".file-upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  FixIT Buddy
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                FixIT Buddy was born from the frustration of spending countless
                hours wrestling with complex Excel spreadsheets. We believe that
                powerful business analytics should be accessible to everyone,
                not just data scientists.
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to democratize data analytics by providing an
                intuitive platform that transforms your existing Excel data into
                beautiful, actionable insights in seconds, not hours.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {aboutFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Dashboard Preview */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Analytics Dashboard
                  </h4>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Revenue",
                        value: "$125K",
                        growth: "+24.5%",
                        color: "text-green-600",
                      },
                      {
                        label: "Occupancy",
                        value: "89.2%",
                        growth: "+12.3%",
                        color: "text-blue-600",
                      },
                      {
                        label: "ADR",
                        value: "$156",
                        growth: "+8.7%",
                        color: "text-purple-600",
                      },
                      {
                        label: "RevPAR",
                        value: "$89.5",
                        growth: "+15.2%",
                        color: "text-orange-600",
                      },
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="text-sm text-gray-600 mb-1">
                          {metric.label}
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {metric.value}
                        </div>
                        <div className={`text-sm font-medium ${metric.color}`}>
                          {metric.growth}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart Placeholder */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-end justify-between h-24 space-x-2">
                      {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          transition={{
                            duration: 0.8,
                            delay: 0.8 + index * 0.1,
                          }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t flex-1"
                        />
                      ))}
                    </div>
                    <div className="text-center text-sm text-gray-600 mt-4">
                      Monthly Revenue Trends
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"
              />
            </motion.div>
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                "To empower every business, regardless of size or technical
                expertise, with the tools they need to unlock the full potential
                of their data. We believe that when data becomes accessible and
                actionable, businesses can make better decisions, grow faster,
                and create more value for their customers."
              </p>
              <div className="mt-8 flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    FixIT Buddy Team
                  </div>
                  <div className="text-sm text-gray-600">
                    Making data accessible for everyone
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
