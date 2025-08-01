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
                Entre em contato
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
                Informações de contato
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                    <MapPin className="h-5 w-5 text-[#6b2b2c]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Escritório</h4>
                    <p className="text-gray-600">
                      Rua Guaiaó, 66 – Conj. 1412 – Aparecida – Santos/SP
                      PRAIAMAR CORPORATE
                    </p>
                    <p className="text-gray-600">CLINICA SOLACIIS</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                    <Phone className="h-5 w-5 text-[#6b2b2c]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600">+55(13)-998083034</p>
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
                    <h4 className="font-medium text-gray-900">
                      Horário de atendimento
                    </h4>
                    <p className="text-gray-600">
                      Segunda feira - Sexta feira: 9:00 - 17:00
                    </p>
                    <p className="text-gray-600">Sábado: 9:00 - 13:00</p>
                    <p className="text-gray-600">Domingo: Fechado</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="mb-4 font-medium text-gray-900">
                  Siga nossas redes sociais
                </h4>
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
