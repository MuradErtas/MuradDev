/**
 * Shared CTA styles for project detail pages (match home hero `shimmer-btn` look).
 * Use `BTN_OPEN_EXTERNAL` for any “open live app / new tab” link.
 */
export const BTN_GITHUB =
  'shimmer-btn inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105 transition-all leading-none'

export const BTN_OPEN_EXTERNAL =
  'shimmer-btn inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold text-lg shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/45 hover:scale-105 transition-all leading-none'

/** Compact shimmer controls (game/chat): same look as CTAs, smaller padding */
const BTN_CONTROL_BASE =
  'shimmer-btn inline-flex items-center justify-center min-w-[5.5rem] px-6 py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg transition-all hover:scale-105 disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none leading-none'

export const BTN_CONTROL_BLUE =
  `${BTN_CONTROL_BASE} bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/25 hover:shadow-blue-600/45`

export const BTN_CONTROL_ORANGE =
  `${BTN_CONTROL_BASE} bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/25 hover:shadow-orange-600/45`

export const BTN_CONTROL_RED =
  `${BTN_CONTROL_BASE} bg-red-600 text-white hover:bg-red-700 shadow-red-600/25 hover:shadow-red-600/45`

export const BTN_CONTROL_PURPLE =
  `${BTN_CONTROL_BASE} bg-purple-600 text-white hover:bg-purple-700 shadow-purple-600/25 hover:shadow-purple-600/45`
