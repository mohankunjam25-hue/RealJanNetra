import React from 'react';
import SettingsItem, { SettingsSectionWrapper } from '../SettingsShared';

const AppearanceSettings: React.FC = () => (
  <SettingsSectionWrapper title="Appearance" desc="Customize your visual experience.">
    <SettingsItem label="Theme" value="Dark Mode" icon="fi-rr-eye" />
    <SettingsItem label="Font Size" value="Default" icon="fi-rr-text" />
    <SettingsItem label="Compact View" type="toggle" value="off" icon="fi-rr-apps" />
    <SettingsItem label="High Contrast" type="toggle" value="off" icon="fi-rr-brightness" />
  </SettingsSectionWrapper>
);

export default AppearanceSettings;
