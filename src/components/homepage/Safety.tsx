import { Award, Heart, Shield, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      title: "Paramedics on Board",
      content:
        "Hiking is a high-risk activity like most other sports. All our excursions have at least one skilled paramedic on board to take care of you in case of injury.",
      value: "paramedics",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "7:1 Guide Ratio",
      content:
        "Getting lost is not funny; therefore, we do not negotiate on your safety on the trails. We engage sufficient local guides and support staff to ensure a 7:1 guide ratio.",
      value: "ratio",
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Skilled Team",
      content:
        "Tumaini Oasis Adventures boasts thousands of hours spent in the great hikes learning, practicing, and iterating the best formulas for safety and growth. Hiking is our business and we mean business.",
      value: "team",
    },
  ];

  return (
    <section className="relative">
      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Shield className="w-4 h-4 mr-2" />
          Safety First
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          At the Heart of Our Adventures
        </h2>
        <p className="text-lg max-w-3xl leading-relaxed">
          Your safety is our top priority. We&apos;ve built comprehensive safety
          measures and protocols to ensure every adventure is both thrilling and
          secure.
        </p>
      </div>

      {/* Safety Features */}
      <div className="max-w-4xl">
        <Accordion type="multiple" className="space-y-4">
          {safetyFeatures.map((feature) => (
            <AccordionItem
              key={feature.value}
              value={feature.value}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <AccordionTrigger className="px-8 py-6 hover:no-underline group">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/30 
                                  flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold group-hover:text-greenPrimary 
                                  transition-colors duration-300"
                    >
                      {feature.title}
                    </h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="ml-16">
                  <p className="leading-relaxed">{feature.content}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Safety Info */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-greenPrimary/5 to-greenPrimary/5 border border-greenPrimary/10">
          <div className="text-left">
            <div className="w-16 h-16 mb-4 rounded-full bg-greenPrimary flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Comprehensive Safety Protocol
            </h3>
            <p className="leading-relaxed max-w-2xl">
              Beyond our core safety measures, we conduct thorough risk
              assessments, provide safety briefings, maintain emergency
              communication systems, and carry comprehensive first aid equipment
              on every expedition.
            </p>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-greenPrimary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Safety;
