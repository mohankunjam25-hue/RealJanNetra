import React from 'react';
import LatestUpdates from '../features/feed/components/LatestUpdates';
import CommunityFeed from '../features/feed/components/CommunityFeed';
import { AreaWidget, LeaderWidget, SchemeWidget } from '../features/feed/components/FeedWidgets';

const HomeFeed: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-4 animate-in fade-in duration-700 pt-4">
      
      {/* LEFT COLUMN: Main Feed (Latest Updates & Community) */}
      <div className="flex-1 space-y-12">
        <LatestUpdates />
        <CommunityFeed />
      </div>

      {/* RIGHT COLUMN: Widgets (Your Area, Leaders, Schemes) */}
      <div className="w-full lg:w-[380px] space-y-8">
        <div className="sticky top-20 space-y-8">
          <AreaWidget />
          <LeaderWidget />
          <SchemeWidget />
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
