// Product photos (free Unsplash License), keyed by product slug.
// Checked by hand: no third-party logos or club/brand names visible.
// The first image is the main image; colour variants reuse these in order.
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const PRODUCT_IMAGES = {
  // ── Street Wear ──
  'oversized-drop-shoulder-hoodie': [unsplash('1564557287817-3785e38ec1f5'), unsplash('1677538537484-324385aff147')],
  'heavyweight-french-terry-pullover': [unsplash('1578587018452-892bacefd3f2'), unsplash('1556821840-3a63f95609a7')],
  'premium-quality-t-shirt': [unsplash('1581655353564-df123a1eb820'), unsplash('1521572163474-6864f9cf17ab')],
  'vintage-acid-wash-heavyweight-street-tee': [unsplash('1628259748819-9bc7c7417fbb'), unsplash('1780566759983-483dd201237c')],
  'collegiate-wool-leather-varsity-jacket': [unsplash('1591047139829-d91aecb6caea'), unsplash('1629353689974-af4d5c70440f')],
  'tactical-3d-multi-pocket-cargo-trousers': [unsplash('1511794322962-129ddbd0af38'), unsplash('1766575696324-5b65330f23c2')],
  'heavyweight-fleece-shorts': [unsplash('1789110520388-ebea45c8bbbb'), unsplash('1591678495920-daa30e3d2c38')],
  'heavyweight-fleece-tracksuit': [unsplash('1775836214303-416ff5ce9f81'), unsplash('1760736534441-4d14bf11103e')],

  // ── Sports Wear ──
  'sublimated-football-kit': [unsplash('1767731154269-904a69c11fe4'), unsplash('1560272564-c83b66b1ad12')],
  'soccer-match-jersey-shorts': [unsplash('1791910534341-eb81265b5854'), unsplash('1606925797300-0b35e9d1794e')],
  'pro-rugby-jersey': [unsplash('1652107945878-73afa1eba6ad'), unsplash('1631021825693-64017b6067c1')],
  'ice-hockey-game-jersey': [unsplash('1549598145-86b354509082'), unsplash('1583713428041-0e7b18c3fdfb')],
  'american-football-game-jersey': [unsplash('1488474739786-757973c2dff6'), unsplash('1619535813695-fa2c4db59d3d')],
  'basketball-uniform-set': [unsplash('1608245449230-4ac19066d2d0'), unsplash('1773161005887-d6d5ce769e8f')],
  'button-front-baseball-jersey': [unsplash('1770668952034-43b606a342c3'), unsplash('1770668951936-3bf67d737ec0')],
  'tennis-performance-polo': [unsplash('1554068865-24cecd4e34b8'), unsplash('1714840961998-8d6c02ace00b')],
};

// Old bundled placeholder images — a product still using only these gets the new photos
export const PLACEHOLDER_IMAGES = [
  '/active-wear.png', '/street_wear.png', '/active.jpg', '/team-wear.png', '/team-wear-bg.jpeg',
  '/active-wear-bg.jpeg', '/team.jpg', '/hero-01.png', '/hero.png',
];
