import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Button } from "../button";

export const FooterContact = () => {
  return (
    <footer id="contact" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-[#6b2b2c]">
                Get in Touch
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="border-gray-300 focus:border-[#6b2b2c] focus:ring-[#6b2b2c]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="border-gray-300 focus:border-[#6b2b2c] focus:ring-[#6b2b2c]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Subject"
                    className="border-gray-300 focus:border-[#6b2b2c] focus:ring-[#6b2b2c]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="border-gray-300 focus:border-[#6b2b2c] focus:ring-[#6b2b2c]"
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-[#6b2b2c] text-white hover:bg-[#5a2324]">
                  Send Message
                </Button>
              </form>
            </div>
            <div>
              <h3 className="mb-6 text-2xl font-bold text-[#6b2b2c]">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                    <MapPin className="h-5 w-5 text-[#6b2b2c]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Office Location
                    </h4>
                    <p className="text-gray-600">
                      123 Medical Plaza, Suite 456
                    </p>
                    <p className="text-gray-600">City, State 12345</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                    <Phone className="h-5 w-5 text-[#6b2b2c]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                    <Mail className="h-5 w-5 text-[#6b2b2c]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@psychiatrist.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                    <Clock className="h-5 w-5 text-[#6b2b2c]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Office Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="mb-4 font-medium text-gray-900">Follow Us</h4>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe4cf] transition-colors hover:bg-[#6b2b2c] hover:text-white"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe4cf] transition-colors hover:bg-[#6b2b2c] hover:text-white"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe4cf] transition-colors hover:bg-[#6b2b2c] hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-200 pt-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 text-xl font-bold text-[#6b2b2c] md:mb-0">
                Dr. Psychiatrist
              </div>
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Child and Adolescent Psychiatry.
                All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
