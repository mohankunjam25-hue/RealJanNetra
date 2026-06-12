import React from 'react';
import SettingsItem, { SettingsSectionWrapper } from '../SettingsShared';

const NotificationSettings: React.FC = () => (
  <SettingsSectionWrapper title="Notifications" desc="Manage platform and government alerts.">
    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4">Platform Interactions</h4>
    <SettingsItem label="Likes & Reactions" type="toggle" value="on" icon="fi-rr-heart" />
    <SettingsItem label="Comments" type="toggle" value="on" icon="fi-rr-comment" />
    <SettingsItem label="Mentions" type="toggle" value="on" icon="fi-rr-at" />
    
    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-6">Governance Alerts</h4>
    <SettingsItem label="Government Updates" type="toggle" value="on" icon="fi-rr-bullhorn" />
    <SettingsItem label="Scheme Alerts" desc="New schemes matching your profile" type="toggle" value="on" icon="fi-rr-document" />
    <SettingsItem label="Election Alerts" type="toggle" value="off" icon="fi-rr-vote-nay" />
    <SettingsItem label="Development Updates" desc="Projects in your village/district" type="toggle" value="on" icon="fi-rr-settings-sliders" />
  </SettingsSectionWrapper>
);

export default NotificationSettings;
