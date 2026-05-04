/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Search, 
  Briefcase, 
  TrendingUp, 
  ExternalLink, 
  Clock, 
  Filter,
  Globe,
  Database
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  link: string;
  posted: string;
  tags: string[];
}

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  useEffect(() => {
    fetch('/jobs.json')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading jobs:', err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !filterTag || job.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(jobs.flatMap((j) => j.tags)));

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="border-b border-emerald-500/10 bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Building2 className="text-[#0f1115] w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">PropJobs <span className="text-emerald-500">Remote</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">Browse</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">How it works</a>
            <a href="#" className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hover:bg-emerald-500 transition-all hover:text-[#0f1115]">
              Post a Job
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Property Sector <br />
            <span className="text-emerald-500">Remote Opportunities</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl"
          >
            Connecting real estate professionals with location-independent roles. 
            Automated daily aggregation from top property platforms.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon={<Briefcase className="w-5 h-5" />} label="Live Jobs" value={jobs.length} />
          <StatCard icon={<Globe className="w-5 h-5" />} label="Remote Only" value="100%" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Avg. Salary" value="$85k" />
          <StatCard icon={<Clock className="w-5 h-5" />} label="Last Sync" value="1h ago" />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by title or company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1c23] border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button 
              onClick={() => setFilterTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${!filterTag ? 'bg-emerald-500 text-[#0f1115]' : 'bg-[#1a1c23] text-gray-400 border border-emerald-500/10 hover:border-emerald-500/30'}`}
            >
              All Roles
            </button>
            {allTags.map((tag) => (
              <button 
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterTag === tag ? 'bg-emerald-500 text-[#0f1115]' : 'bg-[#1a1c23] text-gray-400 border border-emerald-500/10 hover:border-emerald-500/30'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Job Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-[#1a1c23] rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredJobs.length === 0 && !loading && (
          <div className="text-center py-24">
            <Database className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-300">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-500/10 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-sm">
            © 2024 PropJobs Remote. Built for the modern property era.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-[#1a1c23] border border-emerald-500/10 p-6 rounded-3xl hover:border-emerald-500/30 transition-all group">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-[#0f1115] transition-all">
          {icon}
        </div>
        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
    </div>
  );
}

function JobCard({ job }: { job: Job, key: string }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-[#1a1c23] border border-emerald-500/10 p-8 rounded-[2rem] flex flex-col h-full hover:border-emerald-500/40 transition-all group relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-all" />

      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-[#0f1115] rounded-2xl border border-emerald-500/10 text-emerald-500">
          <Briefcase className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
            Remote
          </span>
          <span className="text-gray-600 text-[10px] flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" /> {job.posted}
          </span>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-tight">
          {job.title}
        </h3>
        <p className="text-gray-400 font-medium mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-500/60" /> {job.company}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.map((tag) => (
            <span key={tag} className="text-xs bg-[#0f1115] text-gray-500 px-3 py-1 rounded-lg border border-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-emerald-500/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-gray-600 font-bold tracking-wider mb-1">Salary Range</span>
          <span className="text-white font-bold">{job.salary}</span>
        </div>
        <a 
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 text-[#0f1115] p-3 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
}

