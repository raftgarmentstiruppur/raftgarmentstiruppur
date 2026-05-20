export interface ColorSwatch {
  hex: string
  name: string
  group: string
}

export const COLOR_PALETTE: ColorSwatch[] = [
  // ── Whites & Off-Whites ──
  { hex: "#FFFFFF", name: "White",           group: "Whites" },
  { hex: "#FAFAFA", name: "Bright White",    group: "Whites" },
  { hex: "#FFF8F0", name: "Ivory",           group: "Whites" },
  { hex: "#F5F0E8", name: "Cream",           group: "Whites" },
  { hex: "#FAF0DC", name: "Off White",       group: "Whites" },
  { hex: "#FFF5E1", name: "Antique White",   group: "Whites" },
  { hex: "#F2E8D9", name: "Linen",           group: "Whites" },

  // ── Greys ──
  { hex: "#F2F2F2", name: "Light Grey",      group: "Greys" },
  { hex: "#E8E8E8", name: "Ash Grey",        group: "Greys" },
  { hex: "#D4D4D4", name: "Silver",          group: "Greys" },
  { hex: "#BEBEBE", name: "Medium Grey",     group: "Greys" },
  { hex: "#A8A8A8", name: "Steel Grey",      group: "Greys" },
  { hex: "#909090", name: "Grey",            group: "Greys" },
  { hex: "#787878", name: "Slate Grey",      group: "Greys" },
  { hex: "#606060", name: "Dark Grey",       group: "Greys" },
  { hex: "#484848", name: "Charcoal",        group: "Greys" },
  { hex: "#D6D2C4", name: "Warm Grey",       group: "Greys" },
  { hex: "#C8CDD1", name: "Cool Grey",       group: "Greys" },
  { hex: "#B8C0C8", name: "Mist Grey",       group: "Greys" },

  // ── Blacks ──
  { hex: "#2E2E2E", name: "Soft Black",      group: "Blacks" },
  { hex: "#1A1A1A", name: "Black",           group: "Blacks" },
  { hex: "#0D0D0D", name: "Jet Black",       group: "Blacks" },
  { hex: "#2C2C3A", name: "Carbon",          group: "Blacks" },

  // ── Melange / Heather ──
  { hex: "#D8D0C8", name: "Ecru Melange",    group: "Melange" },
  { hex: "#C0BEB8", name: "Grey Melange",    group: "Melange" },
  { hex: "#A8A098", name: "Anthra Melange",  group: "Melange" },
  { hex: "#908888", name: "Dark Melange",    group: "Melange" },
  { hex: "#D8C8C0", name: "Pink Melange",    group: "Melange" },
  { hex: "#C8D0D8", name: "Blue Melange",    group: "Melange" },

  // ── Skin Tones ──
  { hex: "#FDDBB4", name: "Skin Light",      group: "Skin Tones" },
  { hex: "#F0C8A0", name: "Skin",            group: "Skin Tones" },
  { hex: "#E8B88A", name: "Skin Medium",     group: "Skin Tones" },
  { hex: "#D4A070", name: "Skin Tan",        group: "Skin Tones" },
  { hex: "#C08858", name: "Skin Dark",       group: "Skin Tones" },
  { hex: "#A07040", name: "Caramel",         group: "Skin Tones" },

  // ── Blues ──
  { hex: "#E8F4FD", name: "Baby Blue",       group: "Blues" },
  { hex: "#D6EAF8", name: "Alice Blue",      group: "Blues" },
  { hex: "#AED6F1", name: "Sky Blue",        group: "Blues" },
  { hex: "#85C1E9", name: "Cornflower",      group: "Blues" },
  { hex: "#5DADE2", name: "Medium Blue",     group: "Blues" },
  { hex: "#3498DB", name: "Bright Blue",     group: "Blues" },
  { hex: "#2E86C1", name: "Royal Blue",      group: "Blues" },
  { hex: "#1F618D", name: "Cobalt",          group: "Blues" },
  { hex: "#1A5276", name: "Navy",            group: "Blues" },
  { hex: "#0B2D6E", name: "Deep Navy",       group: "Blues" },
  { hex: "#154360", name: "Midnight Blue",   group: "Blues" },
  { hex: "#4A90C4", name: "Denim Blue",      group: "Blues" },
  { hex: "#6BAED6", name: "Powder Blue",     group: "Blues" },
  { hex: "#7EB8D4", name: "Steel Blue",      group: "Blues" },

  // ── Teals & Cyans ──
  { hex: "#D1F2EB", name: "Mint",            group: "Teals" },
  { hex: "#A3E4D7", name: "Pale Teal",       group: "Teals" },
  { hex: "#76D7C4", name: "Turquoise",       group: "Teals" },
  { hex: "#48C9B0", name: "Medium Teal",     group: "Teals" },
  { hex: "#17A589", name: "Teal",            group: "Teals" },
  { hex: "#117A65", name: "Dark Teal",       group: "Teals" },
  { hex: "#0E6655", name: "Deep Teal",       group: "Teals" },
  { hex: "#00BCD4", name: "Cyan",            group: "Teals" },
  { hex: "#0097A7", name: "Dark Cyan",       group: "Teals" },

  // ── Greens ──
  { hex: "#E8F8E8", name: "Honeydew",        group: "Greens" },
  { hex: "#C8E6C9", name: "Light Green",     group: "Greens" },
  { hex: "#A5D6A7", name: "Pale Green",      group: "Greens" },
  { hex: "#81C784", name: "Medium Green",    group: "Greens" },
  { hex: "#4CAF50", name: "Green",           group: "Greens" },
  { hex: "#43A047", name: "Grass Green",     group: "Greens" },
  { hex: "#2E7D32", name: "Forest Green",    group: "Greens" },
  { hex: "#1B5E20", name: "Dark Green",      group: "Greens" },
  { hex: "#8BC34A", name: "Lime Green",      group: "Greens" },
  { hex: "#558B2F", name: "Olive Green",     group: "Greens" },
  { hex: "#A5B700", name: "Yellow Green",    group: "Greens" },
  { hex: "#6B8E23", name: "Olive",           group: "Greens" },
  { hex: "#B2D8B2", name: "Sage",            group: "Greens" },

  // ── Yellows ──
  { hex: "#FFF9C4", name: "Pale Yellow",     group: "Yellows" },
  { hex: "#FFF176", name: "Light Yellow",    group: "Yellows" },
  { hex: "#FFEE58", name: "Yellow",          group: "Yellows" },
  { hex: "#FDD835", name: "Bright Yellow",   group: "Yellows" },
  { hex: "#F9A825", name: "Amber",           group: "Yellows" },
  { hex: "#F57F17", name: "Dark Amber",      group: "Yellows" },
  { hex: "#FFD700", name: "Gold",            group: "Yellows" },

  // ── Oranges ──
  { hex: "#FFE0B2", name: "Light Peach",     group: "Oranges" },
  { hex: "#FADADD", name: "Peach",           group: "Oranges" },
  { hex: "#FFCC80", name: "Light Orange",    group: "Oranges" },
  { hex: "#FFA726", name: "Orange",          group: "Oranges" },
  { hex: "#FB8C00", name: "Bright Orange",   group: "Oranges" },
  { hex: "#E65100", name: "Burnt Orange",    group: "Oranges" },
  { hex: "#FF7043", name: "Deep Orange",     group: "Oranges" },
  { hex: "#D84315", name: "Rust",            group: "Oranges" },

  // ── Reds ──
  { hex: "#FFEBEE", name: "Blush White",     group: "Reds" },
  { hex: "#FFCDD2", name: "Blush",           group: "Reds" },
  { hex: "#EF9A9A", name: "Rose",            group: "Reds" },
  { hex: "#E57373", name: "Salmon",          group: "Reds" },
  { hex: "#EF5350", name: "Coral Red",       group: "Reds" },
  { hex: "#F44336", name: "Red",             group: "Reds" },
  { hex: "#E53935", name: "Bright Red",      group: "Reds" },
  { hex: "#C62828", name: "Dark Red",        group: "Reds" },
  { hex: "#B71C1C", name: "Deep Red",        group: "Reds" },
  { hex: "#7B1E1E", name: "Burgundy",        group: "Reds" },
  { hex: "#6D2B2B", name: "Maroon",          group: "Reds" },
  { hex: "#FF6B6B", name: "Watermelon",      group: "Reds" },
  { hex: "#FF1744", name: "Scarlet",         group: "Reds" },

  // ── Pinks ──
  { hex: "#FCE4EC", name: "Baby Pink",       group: "Pinks" },
  { hex: "#F8BBD9", name: "Light Pink",      group: "Pinks" },
  { hex: "#F48FB1", name: "Pink",            group: "Pinks" },
  { hex: "#F06292", name: "Medium Pink",     group: "Pinks" },
  { hex: "#E91E8C", name: "Hot Pink",        group: "Pinks" },
  { hex: "#C2185B", name: "Dark Pink",       group: "Pinks" },
  { hex: "#F5A7C7", name: "Rose Pink",       group: "Pinks" },
  { hex: "#FFB6C1", name: "Candy Pink",      group: "Pinks" },
  { hex: "#FF69B4", name: "Fuchsia",         group: "Pinks" },
  { hex: "#DB7093", name: "Dusty Rose",      group: "Pinks" },
  { hex: "#C48B9F", name: "Mauve",           group: "Pinks" },

  // ── Purples ──
  { hex: "#F3E5F5", name: "Lavender Tint",   group: "Purples" },
  { hex: "#E1BEE7", name: "Lavender",        group: "Purples" },
  { hex: "#CE93D8", name: "Lilac",           group: "Purples" },
  { hex: "#BA68C8", name: "Orchid",          group: "Purples" },
  { hex: "#AB47BC", name: "Medium Purple",   group: "Purples" },
  { hex: "#8E24AA", name: "Purple",          group: "Purples" },
  { hex: "#6A1B9A", name: "Dark Purple",     group: "Purples" },
  { hex: "#4A148C", name: "Deep Purple",     group: "Purples" },
  { hex: "#7E57C2", name: "Violet",          group: "Purples" },
  { hex: "#512DA8", name: "Indigo Purple",   group: "Purples" },

  // ── Indigo ──
  { hex: "#C5CAE9", name: "Light Indigo",    group: "Indigo" },
  { hex: "#9FA8DA", name: "Periwinkle",      group: "Indigo" },
  { hex: "#7986CB", name: "Indigo",          group: "Indigo" },
  { hex: "#3949AB", name: "Medium Indigo",   group: "Indigo" },
  { hex: "#283593", name: "Dark Indigo",     group: "Indigo" },
  { hex: "#1A237E", name: "Deep Indigo",     group: "Indigo" },

  // ── Browns & Earth ──
  { hex: "#EFEBE9", name: "Latte",           group: "Browns" },
  { hex: "#D7CCC8", name: "Warm Beige",      group: "Browns" },
  { hex: "#BCAAA4", name: "Sand",            group: "Browns" },
  { hex: "#A1887F", name: "Blush Brown",     group: "Browns" },
  { hex: "#8D6E63", name: "Warm Brown",      group: "Browns" },
  { hex: "#795548", name: "Brown",           group: "Browns" },
  { hex: "#6D4C41", name: "Dark Brown",      group: "Browns" },
  { hex: "#4E342E", name: "Espresso",        group: "Browns" },
  { hex: "#3E2723", name: "Deep Brown",      group: "Browns" },
  { hex: "#C49A6C", name: "Camel",           group: "Browns" },
  { hex: "#D2B48C", name: "Tan",             group: "Browns" },
  { hex: "#DEB887", name: "Burlywood",       group: "Browns" },
  { hex: "#B8860B", name: "Dark Goldenrod",  group: "Browns" },
]
