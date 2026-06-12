import React from 'react';
import SettingsItem, { SettingsSectionWrapper } from '../SettingsShared';

const PrivacySettings: React.FC = () => (
  <SettingsSectionWrapper title="Privacy & Security" desc="Control profile visibility and security.">
    <SettingsItem label="Public Profile" desc="Visible to everyone" type="toggle" value="on" icon="fi-rr-eye" />
    <SettingsItem label="Private Profile" desc="Only Allies see your Voice" type="toggle" value="off" icon="fi-rr-lock" />
    <SettingsItem label="Who Can Message Me" value="Allies" icon="fi-rr-comment" />
    <SettingsItem label="Blocked Users" value="0 users" icon="fi-rr-ban" />
    <SettingsItem label="Two-Factor Authentication" desc="Highly Recommended" icon="fi-rr-shield-check" />
    <SettingsItem label="Active Sessions" value="2 Devices" icon="fi-rr-devices" />
  </SettingsSectionWrapper>
);

export default PrivacySettings;
