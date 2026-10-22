'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const MEMBERS = [
  {
    id: 0,
    name: 'Badar Jamil',
    role: 'Chief Executive Officer',
    bio: 'Spearheads the strategic vision and overall vertical manufacturing operations of Fast Apparel.',
    email: 'jamil.badar@fastapparel.com',
  },
  {
    id: 1,
    name: 'Mudassar Butt',
    role: 'Managing Director',
    bio: 'Manages corporate relations, global account partnerships, and international business expansion.',
    email: 'mudassar@fastapparel.com',
  },
  {
    id: 2,
    name: 'Sheryar Butt',
    role: 'Production Head',
    bio: 'Controls manufacturing workflow across our Sialkot stitching halls.',
    email: 'sheryar@fastapparel.com',
  },
  {
    id: 3,
    name: 'Zunaira Ijaz',
    role: 'Marketing Director',
    bio: 'Directs global brand outreach, client communication channels, and digital marketing campaigns.',
    email: 'zunaira@fastapparel.com',
  },
];

const initials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export default function Leadership() {
  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Management"
          title="The people"
          muted="behind the factory."
          description="A hands-on leadership team that stays close to production, quality, and every client relationship."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERS.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-3xl border border-black/10 bg-neutral-50 p-7 flex flex-col hover:bg-black hover:text-white hover:border-black transition-colors duration-500"
            >
              <span className="w-16 h-16 rounded-full bg-black text-white text-lg font-bold flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
                {initials(member.name)}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{member.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-black/45 group-hover:text-white/55 transition-colors">
                {member.role}
              </p>
              <p className="mt-4 text-sm text-black/60 group-hover:text-white/70 leading-relaxed flex-1 transition-colors">
                {member.bio}
              </p>
              <a
                href={`mailto:${member.email}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
              >
                <Mail className="w-4 h-4" /> Contact
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
