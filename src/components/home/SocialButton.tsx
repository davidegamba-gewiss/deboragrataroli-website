'use client';

import { FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';

/**
 * Social platform types
 */
export type SocialPlatform = 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'spotify';

/**
 * SocialButton Props
 */
export interface SocialButtonProps {
  platform: SocialPlatform;
  url: string;
  label: string;
}

/**
 * Icon mapping for social platforms
 */
const socialIcons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  spotify: FaSpotify,
};

/**
 * SocialButton Component
 *
 * Square button with social media icon.
 *
 * Features:
 * - 60x60px square button
 * - Hover animation (scale, color change)
 * - Opens link in new tab
 * - Accessible with aria-label
 */
export function SocialButton({ platform, url, label }: SocialButtonProps) {
  const IconComponent = socialIcons[platform];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex items-center justify-center
        w-[60px] h-[60px]
        bg-[#f5f5f5]
        border-2 border-purple-light
        rounded-lg
        text-purple-dark
        transition-all duration-300 ease-in-out
        hover:bg-purple-dark hover:text-white hover:border-purple-dark
        hover:scale-110
        hover:shadow-[0_10px_25px_rgba(123,67,151,0.3)]
        focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2
      "
    >
      <IconComponent className="w-8 h-8" />
    </a>
  );
}

export default SocialButton;
