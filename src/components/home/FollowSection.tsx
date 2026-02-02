'use client';

import { useGlobalSettings } from '@/context/GlobalSettingsContext';
import { SocialButton, type SocialPlatform } from './SocialButton';

/**
 * Social link interface
 */
interface SocialLinkItem {
  platform: SocialPlatform;
  url: string | undefined;
  label: string;
}

/**
 * FollowSection Component
 *
 * Section with social media buttons.
 *
 * Features:
 * - Reads social links from GlobalSettingsContext
 * - Responsive grid (3 on mobile, 5 on tablet/desktop)
 * - SocialButton components
 */
export function FollowSection() {
  const settings = useGlobalSettings();

  // Build social links array from settings
  const allSocialLinks: SocialLinkItem[] = [
    {
      platform: 'instagram' as const,
      url: settings.socialInstagram,
      label: 'Seguimi su Instagram',
    },
    {
      platform: 'facebook' as const,
      url: settings.socialFacebook,
      label: 'Seguimi su Facebook',
    },
    {
      platform: 'youtube' as const,
      url: settings.socialYoutube,
      label: 'Iscriviti al mio canale YouTube',
    },
    {
      platform: 'tiktok' as const,
      url: settings.socialTiktok,
      label: 'Seguimi su TikTok',
    },
    {
      platform: 'spotify' as const,
      url: settings.socialSpotify,
      label: 'Ascoltami su Spotify',
    },
  ];

  // Filter out links without URLs
  const socialLinks = allSocialLinks.filter((link): link is SocialLinkItem & { url: string } => Boolean(link.url));

  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 bg-[#f9f9f9]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-[40px] text-purple-dark text-center mb-8">
          Seguimi
        </h2>

        {/* Description */}
        <p className="text-center text-neutral-dark/80 max-w-xl mx-auto mb-10">
          Resta aggiornato sui miei nuovi brani, eventi e contenuti esclusivi
        </p>

        {/* Social Buttons Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {socialLinks.map((social) => (
            <SocialButton
              key={social.platform}
              platform={social.platform}
              url={social.url!}
              label={social.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FollowSection;
