import { Calendar, Mountain, Shield } from "lucide-react";
import Image from "next/image";
import { FaHiking } from "react-icons/fa";
import chooseUs from "./../../../public/image/tumainiFitnessChooseUs.jpg";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaHiking className="text-white" size={24} />,
      title: "Trail Blazing Adventures",
      description: "Explore uncharted paths and discover hidden gems",
    },
    {
      icon: <Calendar className="text-white" size={24} />,
      title: "Year Round Adventures",
      description: "Adventure awaits in every season",
    },
    {
      icon: <Mountain className="text-white" size={24} />,
      title: "Breathtaking Landscapes",
      description: "Experience Kenya&apos;s most stunning natural beauty",
    },
    {
      icon: <Shield className="text-white" size={24} />,
      title: "Safety First Approach",
      description: "Professional guides and comprehensive safety measures",
    },
  ];

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-greenPrimary/10 text-greenPrimary text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-greenPrimary rounded-full mr-2"></span>
          Why Choose Us
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Your Adventure Partner
        </h2>
        <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
          Choose Tumaini Oasis Adventures for your next adventure, where we blend
          expertise and passion to offer unforgettable hiking experiences that
          invigorate your body and enrich your spirit.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Features Grid */}
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-primary/40 border border-gray-100 shadow-sm hover:shadow-xl 
                          transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/50 
                                  flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg font-semibold text-foreground mb-2 group-hover:text-greenPrimary 
                                  transition-colors duration-300"
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-greenPrimary/5 to-greenPrimary/5 border border-greenPrimary/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-greenPrimary flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground/70">
                Commitment to Excellence
              </h4>
            </div>
            <p className="leading-relaxed">
              Our dedication to safety, personal growth, and environmental
              stewardship ensures that every trek creates lasting memories while
              respecting nature.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative">
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={chooseUs}
              alt="Tumaini Oasis Adventures adventure experience"
              fill
              sizes="(max-width: 1200px) 95vw, 1200px"
              className="object-cover"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="grid grid-cols-3 gap-4 text-left text-white">
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-xs uppercase tracking-wide opacity-80">
                      Satisfaction
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-xs uppercase tracking-wide opacity-80">
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-xs uppercase tracking-wide opacity-80">
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-greenPrimary/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
