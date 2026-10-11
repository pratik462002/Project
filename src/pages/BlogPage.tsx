import React from 'react';
import { Calendar, User, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export const BlogPage: React.FC = () => {
  const { blogs } = useData();

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 block mb-2">
            Insights & Guides
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Travel Guides & Vacation Tips
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Curated destination advice, packing essentials, and insider recommendations from the InstaHoliday team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 border-t border-slate-50">
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100/60 text-xs text-slate-700 leading-relaxed">
                  <div className="font-bold text-brand-900 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Key Takeaway
                  </div>
                  {post.content.split('###')[1]?.slice(0, 160) || post.excerpt}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
