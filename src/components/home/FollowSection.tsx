'use client';

import Link from 'next/link';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';
import { SocialButton, type SocialPlatform } from './SocialButton';
import { ROUTES } from '@/utils/routing';

/**
 * Social link interface
 */
interface SocialLinkItem {
  platform: SocialPlatform;
  url: string | undefined;
  label: string;
}

export interface FollowSectionProps {
  /** Section title from CMS */
  title?: string;
  /** Section subtitle from CMS */
  subtitle?: string;
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
 * - Accepts optional title and subtitle from CMS
 */
export function FollowSection({ title, subtitle }: FollowSectionProps) {
  const settings = useGlobalSettings();

  const sectionTitle = title && title.trim() ? title : 'Seguimi';
  const sectionSubtitle = subtitle && subtitle.trim() ? subtitle : 'Resta aggiornato sui miei nuovi brani, eventi e contenuti esclusivi';

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
          {sectionTitle}
        </h2>

        {/* Description */}
        <p className="text-center text-neutral-dark/80 max-w-xl mx-auto mb-10">
          {sectionSubtitle}
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

        {/* Internal link to events */}
        <div className="mt-10 text-center">
          <Link
            href={ROUTES.EVENTI}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-medium text-purple-medium font-medium rounded-lg transition-all duration-300 hover:bg-purple-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Prossimi concerti
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FollowSection;
