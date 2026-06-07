"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import image from "./../../../public/image/hero.jpg";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

async function submitContactForm(
  formData: ContactFormValues
): Promise<ContactFormValues> {
  try {
    const response = await axios.post("/api/contact", formData);
    if (response.status !== 200) {
      throw new Error("Error in submitting form request");
    }
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error submitting your request."
    );
  }
}

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation<
    ContactFormValues,
    Error,
    ContactFormValues
  >({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      toast({
        description: `Thank you, ${data.name}. We will get back to you soon!`,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      value: "+254 703 371 240",
      href: "tel:+254703371240",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      value: "info@tumainioasisadventures.co.ke",
      href: "mailto:info@tumainioasisadventures.co.ke",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come to our office",
      value: "Kastemil Business Centre, Kasarani",
      href: "#map",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Why choose us features
  const features = [
    {
      icon: CheckCircle,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "Expert Guidance",
      description: "Get advice from experienced hiking professionals",
    },
    {
      icon: Clock,
      title: "Available 24/7",
      description: "Emergency support available round the clock",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src={image}
            alt="Contact background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="mb-6">
            <MessageCircle className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Let&apos;s Plan Your Next
            <span className="text-primary block">Mountain Adventure</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            Ready to explore Kenya&apos;s breathtaking mountains? We&apos;re
            here to help you plan the perfect hiking experience. Get in touch
            with our expert team today.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className={`w-8 h-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{method.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {method.description}
                  </p>
                  <a
                    href={method.href}
                    className={`inline-block font-medium ${method.color} hover:underline transition-colors`}
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Info */}
              <div className="space-y-8">
                <div>
                  <Badge variant="outline" className="mb-4">
                    <Send className="w-4 h-4 mr-2" />
                    Send us a message
                  </Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Ready to Start Your Adventure?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Whether you&apos;re planning your first hike or
                    you&apos;re an experienced mountaineer, we&apos;re here to
                    help you create unforgettable memories in Kenya&apos;s
                    stunning landscapes.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                  <h3 className="font-semibold mb-2 text-primary">
                    Planning a Group Adventure?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We offer special packages for groups of 5 or more. Contact
                    us for custom pricing and itineraries tailored to your
                    group&apos;s needs.
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                                aria-label="Enter your full name"
                                className="h-12 bg-background border-2 focus:border-primary transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email address"
                                type="email"
                                {...field}
                                aria-label="Enter your email address"
                                className="h-12 bg-background border-2 focus:border-primary transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="message"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Message
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your hiking plans, experience level, preferred dates, or any questions you have..."
                                {...field}
                                aria-label="Enter your message"
                                className="min-h-[120px] bg-background border-2 focus:border-primary transition-colors resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Find Our Office
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of Kasarani, we&apos;re easily accessible
              for in-person consultations
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden shadow-xl border-0">
              <iframe
                className="w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4882.655900125021!2d36.9008908482592!3d-1.2134983040112104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3fa5b7241e9d%3A0xd7f4237ab5bd50a8!2sKastemil%20Business%20Centre!5e0!3m2!1sen!2ske!4v1732720702779!5m2!1sen!2ske"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tumaini Oasis Adventures Office Location"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Explore Kenya&apos;s Mountains?
            </h2>
            <p className="text-xl opacity-90">
              Join hundreds of adventurers who have discovered the beauty of
              Kenya&apos;s peaks with our expert guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/tours">Browse Our Tours</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
