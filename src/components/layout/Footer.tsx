'use client';

import { FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';
import { useCookieConsent } from '@/context/CookieContext';
import type { SocialLink, SocialPlatform } from '@/types/footer';

/**
 * Social icon mapping
 */
const SocialIcons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  spotify: FaSpotify,
};

/**
 * Footer Component
 *
 * Sticky bottom footer with copyright, email, and social links.
 * Reads contact info from GlobalSettings context.
 *
 * Features:
 * - Responsive layout: stack on mobile, row on desktop
 * - WCAG 2.1 AA compliant contrast
 * - Accessible social links with aria-labels
 * - Smooth hover transitions
 */
export function Footer() {
  const settings = useGlobalSettings();
  const { setShowPreferencesModal, showBanner } = useCookieConsent();

  // Build social links array from settings
  const socialLinks: SocialLink[] = [
    settings.socialInstagram && {
      platform: 'instagram' as SocialPlatform,
      url: settings.socialInstagram,
      label: 'Seguici su Instagram',
    },
    settings.socialFacebook && {
      platform: 'facebook' as SocialPlatform,
      url: settings.socialFacebook,
      label: 'Seguici su Facebook',
    },
    settings.socialYoutube && {
      platform: 'youtube' as SocialPlatform,
      url: settings.socialYoutube,
      label: 'Seguici su YouTube',
    },
    settings.socialTiktok && {
      platform: 'tiktok' as SocialPlatform,
      url: settings.socialTiktok,
      label: 'Seguici su TikTok',
    },
    settings.socialSpotify && {
      platform: 'spotify' as SocialPlatform,
      url: settings.socialSpotify,
      label: 'Ascoltaci su Spotify',
    },
  ].filter((link): link is SocialLink => Boolean(link));

  return (
    <footer
      className="
        relative w-full mt-auto
        bg-black
        border-t border-white/10
        min-h-[120px]
        py-6 px-6 md:py-12 md:px-12
      "
    >
      {/* Mobile layout: stacked, centered */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        {/* Email */}
        <address className="not-italic">
          <a
            href={`mailto:${settings.emailContatto}`}
            className="
              text-sm text-white font-sans
              hover:text-purple-medium hover:underline
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
              rounded
            "
          >
            {settings.emailContatto}
          </a>
        </address>

        {/* Social Links */}
        <nav aria-label="Social media links">
          <ul className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = SocialIcons[social.platform];
              return (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      inline-flex items-center justify-center
                      text-white
                      hover:text-purple-medium hover:scale-[1.15]
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                      rounded
                    "
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-sm text-[#a0a0a0] font-sans text-center">
          © 2026 Debora Grataroli. Tutti i diritti riservati.
        </p>
      </div>

      {/* Desktop layout: 3-column grid for perfect centering */}
      <div
        className="
          hidden md:grid
          max-w-[1280px] mx-auto
          grid-cols-3
          items-center
          gap-8
        "
      >
        {/* Left column: Copyright */}
        <p className="text-sm text-[#a0a0a0] font-sans text-left">
          © 2026 Debora Grataroli. Tutti i diritti riservati.
        </p>

        {/* Center column: Email - perfectly centered */}
        <address className="not-italic text-center">
          <a
            href={`mailto:${settings.emailContatto}`}
            className="
              text-sm text-white font-sans
              hover:text-purple-medium hover:underline
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
              rounded
            "
          >
            {settings.emailContatto}
          </a>
        </address>

        {/* Right column: Social Links */}
        <nav aria-label="Social media links" className="justify-self-end">
          <ul className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = SocialIcons[social.platform];
              return (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      inline-flex items-center justify-center
                      text-white
                      hover:text-purple-medium hover:scale-[1.15]
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                      rounded
                    "
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Legal links row */}
      <div
        className="
          max-w-[1280px] mx-auto
          flex flex-wrap items-center justify-center
          gap-4 mt-6 pt-4
          border-t border-white/10
        "
      >
        <a
          href="/privacy-policy"
          className="
            text-xs text-[#a0a0a0]
            hover:text-purple-medium
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            rounded
          "
        >
          Privacy Policy
        </a>
        <span className="text-[#a0a0a0] text-xs">|</span>
        <a
          href="/cookie-policy"
          className="
            text-xs text-[#a0a0a0]
            hover:text-purple-medium
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            rounded
          "
        >
          Cookie Policy
        </a>
        <span className="text-[#a0a0a0] text-xs">|</span>
        <button
          type="button"
          onClick={() => {
            showBanner();
            setShowPreferencesModal(true);
          }}
          className="
            text-xs text-[#a0a0a0]
            hover:text-purple-medium
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            cursor-pointer
            bg-transparent border-none
            rounded
          "
        >
          Gestisci Cookie
        </button>
      </div>
    </footer>
  );
}

export default Footer;
