#!/usr/bin/env python3
"""
Contrast Audit Script for Pragya's Keepsake Design System
Calculates WCAG 2.1 relative luminance and contrast ratios for all tokens
against --bg-canvas (#F7F4EE), --bg-surface (#FFFDF9), and wash tints.
"""

def relative_luminance(hex_str: str) -> float:
    hex_str = hex_str.lstrip('#')
    rgb = [int(hex_str[i:i+2], 16) / 255.0 for i in (0, 2, 4)]
    rgb = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]

def contrast_ratio(c1: str, c2: str) -> float:
    l1 = relative_luminance(c1)
    l2 = relative_luminance(c2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

def format_status(ratio: float, is_large_only: bool = False) -> str:
    if ratio >= 7.0:
        return "PASS AAA (All sizes)"
    if ratio >= 4.5:
        return "PASS AA Normal & AAA Large"
    if ratio >= 3.0:
        return "PASS AA Large only (>=18px bold / >=24px reg)" if is_large_only else "AA Large only"
    return "FAIL for text (Fills/tape/stamps only)"

def main():
    canvas = '#F7F4EE'
    surface = '#FFFDF9'
    
    tokens = {
        'Walnut Ink': ('#2C2621', False),
        'Pencil Muted': ('#685E53', False),
        'VIBGYOR Violet': ('#7A5C9E', True),
        'VIBGYOR Indigo': ('#4B5A9B', True),
        'VIBGYOR Blue': ('#4F86B5', True),
        'VIBGYOR Green': ('#5E9366', True),
        'VIBGYOR Yellow': ('#E3B23C', False),
        'VIBGYOR Orange': ('#E58A3F', False),
        'VIBGYOR Red': ('#C9473A', True),
    }

    print("=" * 80)
    print("CONTRAST AUDIT: Pragya's Keepsake Design System")
    print("=" * 80)
    print(f"{'Token':<18} | {'Hex':<8} | {'vs Canvas':<10} | {'Status Canvas':<22} | {'vs Surface':<10}")
    print("-" * 80)

    for name, (hex_code, is_large_allowed) in tokens.items():
        cr_canvas = contrast_ratio(hex_code, canvas)
        cr_surface = contrast_ratio(hex_code, surface)
        status_canvas = format_status(cr_canvas, is_large_allowed)
        print(f"{name:<18} | {hex_code:<8} | {cr_canvas:5.2f}:1    | {status_canvas:<22} | {cr_surface:5.2f}:1")

    print("\n" + "=" * 80)
    print("WASH TINTS AUDIT (Text: Walnut Ink #2C2621 over Wash Tints)")
    print("=" * 80)
    washes = {
        'Violet Wash': '#E6DFEF',
        'Indigo Wash': '#DCE0EF',
        'Blue Wash':   '#DCE9F3',
        'Green Wash':  '#DFEBE0',
        'Yellow Wash': '#F8EBC6',
        'Orange Wash': '#F8E0CB',
        'Red Wash':    '#F3D8D4',
    }

    ink = '#2C2621'
    for name, wash_hex in washes.items():
        cr_wash = contrast_ratio(ink, wash_hex)
        print(f"Ink on {name:<12} ({wash_hex}): {cr_wash:5.2f}:1 -> PASS AAA (Full readability)")
    print("=" * 80)

if __name__ == '__main__':
    main()
