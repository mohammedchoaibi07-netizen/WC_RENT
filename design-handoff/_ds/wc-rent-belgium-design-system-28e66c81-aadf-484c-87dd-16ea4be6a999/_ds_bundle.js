/* @ds-bundle: {"format":4,"namespace":"WCRentBelgiumDesignSystem_28e66c","components":[{"name":"BrandWordmark","sourcePath":"components/brand/BrandWordmark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"ScriptNote","sourcePath":"components/core/ScriptNote.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"ChoiceOption","sourcePath":"components/forms/ChoiceOption.jsx"},{"name":"CounterField","sourcePath":"components/forms/CounterField.jsx"},{"name":"StepProgress","sourcePath":"components/forms/StepProgress.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"CtaPanel","sourcePath":"components/marketing/CtaPanel.jsx"},{"name":"EcoNote","sourcePath":"components/marketing/EcoNote.jsx"},{"name":"FaqAccordion","sourcePath":"components/marketing/FaqAccordion.jsx"},{"name":"FeatureRow","sourcePath":"components/marketing/FeatureRow.jsx"},{"name":"NeedTile","sourcePath":"components/marketing/NeedTile.jsx"},{"name":"ProcessSteps","sourcePath":"components/marketing/ProcessSteps.jsx"},{"name":"ProductCard","sourcePath":"components/marketing/ProductCard.jsx"},{"name":"ReasonList","sourcePath":"components/marketing/ReasonList.jsx"},{"name":"StatStrip","sourcePath":"components/marketing/StatStrip.jsx"},{"name":"TestimonialCard","sourcePath":"components/marketing/TestimonialCard.jsx"},{"name":"PhotoFrame","sourcePath":"components/media/PhotoFrame.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"},{"name":"MobileMenu","sourcePath":"components/navigation/MobileMenu.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"StickyActionBar","sourcePath":"components/navigation/StickyActionBar.jsx"}],"sourceHashes":{"components/brand/BrandWordmark.jsx":"e6446947c484","components/core/Badge.jsx":"28a3caa4f028","components/core/Button.jsx":"1cc4d3745c4e","components/core/Card.jsx":"ddfec35c9d7b","components/core/Icon.jsx":"08e2cd134c6d","components/core/IconButton.jsx":"914f892e8017","components/core/ScriptNote.jsx":"9daff6a2b9d3","components/core/SectionHeading.jsx":"13d49a97b28a","components/forms/ChoiceOption.jsx":"03cffc070a5c","components/forms/CounterField.jsx":"6ef093d9ac52","components/forms/StepProgress.jsx":"653a518a78b2","components/forms/TextField.jsx":"722303f49a91","components/marketing/CtaPanel.jsx":"2f2faa143d8d","components/marketing/EcoNote.jsx":"b8b84c1c50f8","components/marketing/FaqAccordion.jsx":"b1e569bbdc92","components/marketing/FeatureRow.jsx":"19bba0b638e2","components/marketing/NeedTile.jsx":"65d486acef7b","components/marketing/ProcessSteps.jsx":"4b43f76af57f","components/marketing/ProductCard.jsx":"599ec9aede89","components/marketing/ReasonList.jsx":"2f6a2d884dbf","components/marketing/StatStrip.jsx":"447e2b3b0c35","components/marketing/TestimonialCard.jsx":"7038ebb7ea16","components/media/PhotoFrame.jsx":"42e5f22f15bc","components/navigation/AppHeader.jsx":"e0e763551d91","components/navigation/MobileMenu.jsx":"9de17cccf795","components/navigation/SiteFooter.jsx":"2ff22e3f9c99","components/navigation/StickyActionBar.jsx":"a58f673fc7cb","ui_kits/website/ContactScreen.jsx":"9d78e37299cb","ui_kits/website/HomeScreen.jsx":"44bc97eecbe6","ui_kits/website/QuoteScreen.jsx":"a41db762dfb4","ui_kits/website/SolutionsScreen.jsx":"1becf48768dc"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WCRentBelgiumDesignSystem_28e66c = window.WCRentBelgiumDesignSystem_28e66c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BrandWordmark.jsx
try { (() => {
/* NOTE: no logo file was supplied with this brand. The real WC Rent Belgium mark
   (framed toilet-cabin pictogram) is NOT reproduced here — this is a type-only
   wordmark placeholder. Drop the real SVG into assets/ and swap it in. */
function BrandWordmark({
  size = 'md',
  onDark = false,
  showFlag = true,
  style
}) {
  const scale = {
    sm: 0.82,
    md: 1,
    lg: 1.35
  }[size] || 1;
  const ink = onDark ? 'var(--white)' : 'var(--navy-800)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-grid',
      gap: 2 * scale,
      fontFamily: 'var(--font-core)',
      lineHeight: 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24 * scale,
      fontWeight: 'var(--fw-extrabold)',
      letterSpacing: '-0.02em',
      color: ink
    }
  }, "WC Rent"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8 * scale
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10 * scale,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '.34em',
      color: onDark ? 'rgba(255,255,255,.78)' : 'var(--grey-500)'
    }
  }, "BELGIUM"), showFlag ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      borderRadius: 2,
      overflow: 'hidden',
      height: 9 * scale
    }
  }, ['var(--be-black)', 'var(--be-yellow)', 'var(--be-red)'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 4 * scale,
      background: c
    }
  }))) : null));
}
Object.assign(__ds_scope, { BrandWordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BrandWordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  tone = 'default',
  interactive = false,
  padding = 'var(--space-5)',
  style,
  onClick
}) {
  const [hovered, setHovered] = React.useState(false);
  const tones = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)'
    },
    info: {
      background: 'var(--surface-info)',
      border: '1px solid transparent'
    },
    eco: {
      background: 'var(--surface-eco)',
      border: '1px solid transparent'
    },
    dark: {
      background: 'var(--surface-dark)',
      border: '1px solid rgba(255,255,255,.10)',
      color: 'var(--text-invert)'
    },
    flat: {
      background: 'var(--surface-alt)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => interactive && setHovered(true),
    onMouseLeave: () => interactive && setHovered(false),
    style: {
      borderRadius: 'var(--radius-lg)',
      padding,
      overflow: 'hidden',
      boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      transform: hovered ? 'translateY(var(--lift-hover))' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : undefined,
      fontFamily: 'var(--font-core)',
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/* Thin wrapper over the Lucide icon set (CDN). The host page must load
   https://unpkg.com/lucide@latest/dist/umd/lucide.js once. */
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.9,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const draw = () => {
      if (window.lucide && ref.current) {
        ref.current.innerHTML = '<i data-lucide="' + name + '"></i>';
        window.lucide.createIcons({
          nameAttr: 'data-lucide',
          attrs: {
            width: size,
            height: size,
            stroke: color,
            'stroke-width': strokeWidth
          }
        });
      }
    };
    draw();
    const t = setTimeout(draw, 400);
    return () => clearTimeout(t);
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      flex: '0 0 auto',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  info: {
    background: 'var(--surface-info)',
    color: 'var(--navy-800)'
  },
  eco: {
    background: 'var(--green-050)',
    color: 'var(--green-600)'
  },
  solid: {
    background: 'var(--action-default)',
    color: 'var(--white)'
  },
  neutral: {
    background: 'var(--grey-100)',
    color: 'var(--grey-700)'
  },
  belgian: {
    background: 'var(--be-yellow)',
    color: 'var(--be-black)'
  }
};
function Badge({
  children,
  tone = 'info',
  icon,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-core)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '.01em',
      padding: '6px 12px',
      borderRadius: 'var(--radius-pill)',
      ...TONES[tone],
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  fontFamily: 'var(--font-core)',
  fontWeight: 'var(--fw-semibold)',
  fontSize: '17px',
  lineHeight: 1,
  textDecoration: 'none',
  cursor: 'pointer',
  border: '1.5px solid transparent',
  borderRadius: 'var(--radius-md)',
  height: 'var(--control-h)',
  padding: '0 22px',
  transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)'
};
const SIZES = {
  sm: {
    height: 'var(--control-h-sm)',
    fontSize: '15px',
    padding: '0 12px',
    borderRadius: 'var(--radius-md)',
    gap: '6px'
  },
  md: {
    height: '52px',
    fontSize: '16px',
    padding: '0 20px'
  },
  lg: {
    height: 'var(--control-h)',
    fontSize: '17px',
    padding: '0 24px'
  }
};
function palette(variant, hovered) {
  switch (variant) {
    case 'secondary':
      return {
        background: hovered ? 'var(--action-soft)' : 'var(--white)',
        color: 'var(--action-default)',
        borderColor: 'var(--border-action)'
      };
    case 'phone':
      return {
        background: hovered ? 'var(--blue-100)' : 'var(--action-soft)',
        color: 'var(--navy-800)',
        borderColor: 'transparent'
      };
    case 'onDark':
      return {
        background: 'var(--white)',
        color: 'var(--action-default)',
        borderColor: 'transparent',
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-xs)'
      };
    case 'ghost':
      return {
        background: hovered ? 'var(--action-soft)' : 'transparent',
        color: 'var(--action-default)',
        borderColor: 'transparent'
      };
    default:
      return {
        background: hovered ? 'var(--action-hover)' : 'var(--action-default)',
        color: 'var(--white)',
        borderColor: 'transparent',
        boxShadow: 'var(--shadow-cta)'
      };
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'lg',
  block = false,
  icon,
  iconAfter = 'arrow-right',
  showArrow = true,
  disabled = false,
  href,
  onClick,
  type = 'button',
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const s = {
    ...BASE,
    ...SIZES[size],
    ...palette(variant, hovered && !disabled),
    width: block ? '100%' : undefined,
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    transform: pressed ? 'scale(var(--press-scale))' : 'none',
    ...style
  };
  const Tag = href ? 'a' : 'button';
  const arrow = showArrow && iconAfter ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter,
    size: 18,
    style: {
      transform: hovered ? 'translateX(3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }) : null;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    href: href,
    type: href ? undefined : type,
    onClick: onClick,
    disabled: href ? undefined : disabled,
    style: s,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false)
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, children), arrow);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  variant = 'plain',
  size = 44,
  onClick,
  style
}) {
  const [hovered, setHovered] = React.useState(false);
  const tones = {
    plain: {
      background: hovered ? 'var(--grey-050)' : 'transparent',
      color: 'var(--navy-800)',
      border: '1px solid transparent'
    },
    outline: {
      background: hovered ? 'var(--action-soft)' : 'var(--white)',
      color: 'var(--action-default)',
      border: '1.5px solid var(--border-subtle)'
    },
    solid: {
      background: hovered ? 'var(--action-hover)' : 'var(--action-default)',
      color: 'var(--white)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": label,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      transition: 'background var(--dur-base) var(--ease-out)',
      ...tones[variant],
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.5)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/ScriptNote.jsx
try { (() => {
function ScriptNote({
  children,
  color = 'var(--action-default)',
  size = 'var(--fs-script)',
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-script)',
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1.1,
      color,
      display: 'inline-block',
      transform: 'rotate(-4deg)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ScriptNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ScriptNote.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
  onDark = false,
  align = 'left',
  style
}) {
  const ink = onDark ? 'var(--text-invert)' : 'var(--text-strong)';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      fontFamily: 'var(--font-core)',
      textAlign: align,
      display: 'grid',
      gap: 'var(--space-3)',
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: onDark ? 'var(--blue-100)' : 'var(--text-muted)'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-h2)',
      lineHeight: 'var(--lh-heading)',
      letterSpacing: 'var(--ls-heading)',
      fontWeight: 'var(--fw-extrabold)',
      color: ink,
      textWrap: 'pretty'
    }
  }, title), intro ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body-lg)',
      lineHeight: 'var(--lh-body)',
      color: onDark ? 'rgba(255,255,255,.82)' : 'var(--text-body)',
      maxWidth: '58ch',
      textWrap: 'pretty'
    }
  }, intro) : null, link ? /*#__PURE__*/React.createElement("a", {
    href: link.href || '#',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: 'var(--text-link)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-body)',
      textDecoration: 'none',
      justifySelf: align === 'center' ? 'center' : 'start'
    }
  }, link.label, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 17
  })) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/forms/ChoiceOption.jsx
try { (() => {
function ChoiceOption({
  icon,
  label,
  description,
  selected = false,
  onSelect,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSelect,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      width: '100%',
      textAlign: 'left',
      minHeight: 'var(--control-h)',
      padding: 'var(--space-4)',
      cursor: 'pointer',
      fontFamily: 'var(--font-core)',
      borderRadius: 'var(--radius-md)',
      background: selected ? 'var(--surface-info)' : h ? 'var(--grey-050)' : 'var(--white)',
      border: '1.5px solid ' + (selected ? 'var(--border-action)' : 'var(--border-subtle)'),
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    color: selected ? 'var(--action-default)' : 'var(--navy-800)'
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      gap: 2,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)'
    }
  }, description) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      border: '1.5px solid ' + (selected ? 'var(--action-default)' : 'var(--border-strong)'),
      background: selected ? 'var(--action-default)' : 'transparent'
    }
  }, selected ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    color: "var(--white)",
    strokeWidth: 3
  }) : null));
}
Object.assign(__ds_scope, { ChoiceOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ChoiceOption.jsx", error: String((e && e.message) || e) }); }

// components/forms/CounterField.jsx
try { (() => {
function CounterField({
  label,
  value = 100,
  step = 25,
  min = 0,
  max = 9999,
  suffix = 'personnes',
  onChange,
  style
}) {
  const set = v => onChange && onChange(Math.min(max, Math.max(min, v)));
  const btn = {
    width: 48,
    height: 48,
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--border-subtle)',
    background: 'var(--white)',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-3)',
      border: '1.5px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-2)',
      background: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set(value - step),
    "aria-label": "Diminuer",
    style: btn
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 18,
    color: "var(--action-default)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '20px',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, value, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-muted)'
    }
  }, suffix)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set(value + step),
    "aria-label": "Augmenter",
    style: btn
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 18,
    color: "var(--action-default)"
  }))));
}
Object.assign(__ds_scope, { CounterField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CounterField.jsx", error: String((e && e.message) || e) }); }

// components/forms/StepProgress.jsx
try { (() => {
function StepProgress({
  step = 1,
  total = 5,
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xC9tape ", step, " / ", total), label ? /*#__PURE__*/React.createElement("span", null, label) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--grey-100)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: step / total * 100 + '%',
      background: 'var(--action-default)',
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { StepProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/StepProgress.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function TextField({
  label,
  hint,
  error,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", {
    type: type,
    name: name,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: 'var(--control-h)',
      padding: '0 16px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid ' + (error ? 'var(--red-600)' : focus ? 'var(--border-action)' : 'var(--border-subtle)'),
      boxShadow: focus ? 'var(--ring-focus)' : 'none',
      outline: 'none',
      background: 'var(--white)',
      fontFamily: 'inherit',
      fontSize: 'var(--fs-body-lg)',
      color: 'var(--text-strong)',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--red-600)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CtaPanel.jsx
try { (() => {
function CtaPanel({
  eyebrow,
  title,
  intro,
  ctaLabel = 'Demander un devis',
  onCta,
  assurances = [{
    icon: 'clock',
    label: 'Rapide'
  }, {
    icon: 'shield-check',
    label: 'Gratuit'
  }, {
    icon: 'file-text',
    label: 'Sans engagement'
  }],
  tone = 'blue',
  style
}) {
  const bg = tone === 'navy' ? 'var(--surface-dark)' : 'var(--action-default)';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg,
      color: 'var(--white)',
      padding: 'var(--space-8) var(--space-5)',
      display: 'grid',
      gap: 'var(--space-4)',
      justifyItems: 'center',
      textAlign: 'center',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,.85)'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-h2)',
      lineHeight: 'var(--lh-heading)',
      letterSpacing: 'var(--ls-heading)',
      fontWeight: 'var(--fw-extrabold)',
      maxWidth: '16ch',
      textWrap: 'balance'
    }
  }, title), intro ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'rgba(255,255,255,.9)',
      maxWidth: '44ch'
    }
  }, intro) : null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "onDark",
    block: true,
    onClick: onCta,
    style: {
      maxWidth: 420
    }
  }, ctaLabel), assurances && assurances.length ? /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-medium)'
    }
  }, assurances.map(a => /*#__PURE__*/React.createElement("li", {
    key: a.label,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: a.icon,
    size: 16,
    color: "var(--white)"
  }), a.label))) : null);
}
Object.assign(__ds_scope, { CtaPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CtaPanel.jsx", error: String((e && e.message) || e) }); }

// components/marketing/EcoNote.jsx
try { (() => {
function EcoNote({
  title = 'Un engagement plus vert',
  body,
  linkLabel = 'En savoir plus',
  onLink,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'var(--space-4)',
      alignItems: 'start',
      background: 'var(--surface-eco)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "leaf",
    size: 28,
    color: "var(--green-600)",
    strokeWidth: 1.7
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--green-600)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-small)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, body), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onLink,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-link)',
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-semibold)',
      textDecoration: 'none'
    }
  }, linkLabel, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15
  }))));
}
Object.assign(__ds_scope, { EcoNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/EcoNote.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FaqAccordion.jsx
try { (() => {
function FaqAccordion({
  items = [],
  defaultOpen = 0,
  style
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-core)',
      borderTop: '1px solid var(--border-subtle)',
      ...style
    }
  }, items.map((it, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: it.q,
      style: {
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        padding: '18px 0',
        background: 'none',
        border: 0,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        fontSize: 'var(--fs-body)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--text-strong)'
      }
    }, it.q, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: isOpen ? 'minus' : 'plus',
      size: 18,
      color: "var(--action-default)"
    })), isOpen ? /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 18px',
        fontSize: 'var(--fs-body)',
        lineHeight: 'var(--lh-body)',
        color: 'var(--text-body)',
        maxWidth: '62ch'
      }
    }, it.a) : null);
  }));
}
Object.assign(__ds_scope, { FaqAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FaqAccordion.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FeatureRow.jsx
try { (() => {
function FeatureRow({
  items = [],
  onDark = false,
  columns,
  style
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gridTemplateColumns: `repeat(${columns || items.length || 3},1fr)`,
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.label,
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 'var(--space-2)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 26,
    color: onDark ? 'var(--white)' : 'var(--navy-800)',
    strokeWidth: 1.7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 1.3,
      color: onDark ? 'var(--white)' : 'var(--text-strong)'
    }
  }, it.label))));
}
Object.assign(__ds_scope, { FeatureRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FeatureRow.jsx", error: String((e && e.message) || e) }); }

// components/marketing/NeedTile.jsx
try { (() => {
function NeedTile({
  icon,
  label,
  caption,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 'var(--space-2)',
      padding: 'var(--space-2)',
      background: 'none',
      border: 0,
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-core)',
      transform: h ? 'translateY(var(--lift-hover))' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-info)',
      boxShadow: h ? 'var(--shadow-card)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 28,
    color: "var(--navy-800)",
    strokeWidth: 1.7
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, label), caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { NeedTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/NeedTile.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ProcessSteps.jsx
try { (() => {
function ProcessSteps({
  steps = [],
  layout = 'row',
  style
}) {
  const row = layout === 'row';
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gridTemplateColumns: row ? `repeat(${steps.length},1fr)` : '1fr',
      gap: row ? 'var(--space-2)' : 'var(--space-5)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.title,
    style: {
      display: row ? 'grid' : 'grid',
      gridTemplateColumns: row ? undefined : 'auto 1fr',
      justifyItems: row ? 'center' : 'start',
      alignItems: row ? undefined : 'start',
      gap: row ? 'var(--space-2)' : 'var(--space-4)',
      textAlign: row ? 'center' : 'left',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center'
    }
  }, row && i > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: '50%',
      top: 13,
      height: 2,
      background: 'var(--border-subtle)'
    }
  }) : null, row && i < steps.length - 1 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      right: 0,
      top: 13,
      height: 2,
      background: 'var(--border-subtle)'
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--action-default)',
      color: 'var(--white)',
      display: 'grid',
      placeItems: 'center',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)'
    }
  }, i + 1)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      justifyItems: row ? 'center' : 'start',
      gap: 4
    }
  }, s.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: s.icon,
    size: 24,
    color: "var(--navy-800)",
    strokeWidth: 1.7
  }) : null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)',
      lineHeight: 1.3
    }
  }, s.title), s.caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)',
      lineHeight: 1.35
    }
  }, s.caption) : null))));
}
Object.assign(__ds_scope, { ProcessSteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ProcessSteps.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ReasonList.jsx
try { (() => {
function ReasonList({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gap: 'var(--space-6)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: it.title,
    style: {
      display: 'grid',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '.08em',
      color: 'var(--blue-400)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      flex: 1,
      background: 'rgba(255,255,255,.16)'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-h3)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--white)'
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      color: 'rgba(255,255,255,.78)'
    }
  }, it.body))));
}
Object.assign(__ds_scope, { ReasonList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ReasonList.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatStrip.jsx
try { (() => {
function StatStrip({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: '1fr',
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      padding: 'var(--space-4) var(--space-2)',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.value,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: '0 var(--space-3)',
      borderLeft: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 20,
    color: it.tone === 'eco' ? 'var(--green-600)' : 'var(--navy-800)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '17px',
      fontWeight: 'var(--fw-extrabold)',
      color: 'var(--text-strong)',
      lineHeight: 1.15
    }
  }, it.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)',
      lineHeight: 1.25
    }
  }, it.label)))));
}
Object.assign(__ds_scope, { StatStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StatStrip.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TestimonialCard.jsx
try { (() => {
function TestimonialCard({
  quote,
  author,
  meta,
  rating = 5,
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      padding: 'var(--space-5)',
      display: 'grid',
      gap: 'var(--space-3)',
      gridTemplateColumns: 'auto 1fr',
      fontFamily: 'var(--font-core)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 40,
      lineHeight: .8,
      color: 'var(--navy-800)',
      fontWeight: 'var(--fw-extrabold)'
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-body)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)'
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-muted)'
    }
  }, "\u2013 ", author, meta ? ', ' + meta : ''), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2
    }
  }, Array.from({
    length: rating
  }).map((_, i) => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: i,
    name: "star",
    size: 15,
    color: "var(--amber-500)",
    strokeWidth: 0,
    style: {
      fill: 'var(--amber-500)'
    }
  }))))));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/media/PhotoFrame.jsx
try { (() => {
/* No brand photography was supplied. Without src this renders an honest
   placeholder describing the shot that belongs there. */
function PhotoFrame({
  src,
  alt = '',
  label = 'Photo WC Rent',
  ratio = '4 / 3',
  radius = 'var(--radius-lg)',
  zoomOnHover = true,
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      aspectRatio: ratio,
      borderRadius: radius,
      overflow: 'hidden',
      background: 'var(--grey-100)',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: zoomOnHover && h ? 'scale(var(--img-zoom))' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeContent: 'center',
      justifyItems: 'center',
      gap: 8,
      background: 'repeating-linear-gradient(135deg,var(--grey-100) 0 10px,var(--grey-050) 10px 20px)',
      fontFamily: 'var(--font-core)',
      color: 'var(--grey-500)',
      textAlign: 'center',
      padding: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "image",
    size: 22,
    color: "var(--grey-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '.04em'
    }
  }, label)));
}
Object.assign(__ds_scope, { PhotoFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/PhotoFrame.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ProductCard.jsx
try { (() => {
function ProductCard({
  title,
  description,
  image,
  imageLabel,
  ctaLabel = 'En savoir plus',
  onClick,
  featured = false,
  style
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    padding: "0",
    onClick: onClick,
    style: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PhotoFrame, {
    src: image,
    label: imageLabel || title,
    ratio: featured ? '16 / 9' : '4 / 3',
    radius: "0"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      alignContent: 'start',
      gap: 'var(--space-2)',
      padding: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-h3)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-heading)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-small)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-muted)'
    }
  }, description) : null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    block: true,
    style: {
      marginTop: 'var(--space-2)'
    }
  }, ctaLabel)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
function AppHeader({
  onMenu,
  menuOpen = false,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      height: 'var(--header-h)',
      background: 'var(--white)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--gutter)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BrandWordmark, {
    size: "sm"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: menuOpen ? 'x' : 'menu',
    label: menuOpen ? 'Fermer le menu' : 'Ouvrir le menu',
    onClick: onMenu,
    size: 44
  }));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MobileMenu.jsx
try { (() => {
const DEFAULT_ITEMS = ['Accueil', 'Nos solutions', 'Pour vos événements', 'Chantiers', 'À propos', 'FAQ', 'Contact'];
function MobileMenu({
  open = false,
  items = DEFAULT_ITEMS,
  onSelect,
  onClose,
  ctaLabel = 'Demander un devis',
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 'var(--header-h) 0 0 0',
      zIndex: 39,
      background: 'rgba(4,24,47,.35)',
      backdropFilter: 'blur(2px)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("nav", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--white)',
      padding: 'var(--space-2) var(--gutter) var(--space-6)',
      boxShadow: 'var(--shadow-menu)',
      fontFamily: 'var(--font-core)'
    }
  }, items.map(label => /*#__PURE__*/React.createElement("button", {
    key: label,
    type: "button",
    onClick: () => onSelect && onSelect(label),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: '16px 0',
      background: 'none',
      border: 0,
      borderBottom: '1px solid var(--border-subtle)',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, label, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--grey-400)"
  }))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    block: true,
    style: {
      marginTop: 'var(--space-5)'
    }
  }, ctaLabel)));
}
Object.assign(__ds_scope, { MobileMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MobileMenu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
const DEFAULT_LINKS = ['Nos solutions', 'Nos réalisations', 'À propos', 'FAQ', 'Conditions générales', 'Contact'];
function SiteFooter({
  phone = '+32 470 12 34 56',
  email = 'info@wcrentbelgium.be',
  area = 'Belgique entière',
  links = DEFAULT_LINKS,
  socials = ['facebook', 'instagram', 'linkedin'],
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-darkest)',
      color: 'var(--text-invert)',
      fontFamily: 'var(--font-core)',
      padding: 'var(--space-10) var(--gutter) var(--space-8)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BrandWordmark, {
    onDark: true
  }), /*#__PURE__*/React.createElement(__ds_scope.ScriptNote, {
    color: "var(--white)",
    size: "20px",
    style: {
      textAlign: 'right',
      maxWidth: 120
    }
  }, "Partout en Belgique")), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 'var(--space-8) 0 0',
      padding: 0,
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, [['phone', phone], ['mail', email], ['map-pin', area]].map(([icon, value]) => /*#__PURE__*/React.createElement("li", {
    key: icon,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      fontSize: 'var(--fs-body)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19,
    color: "var(--white)"
  }), value))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      margin: 'var(--space-6) 0'
    }
  }, socials.map(s => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: s,
    name: s,
    size: 22,
    color: "var(--white)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.14)',
      paddingTop: 'var(--space-4)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: 'var(--space-6)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      color: 'rgba(255,255,255,.85)',
      textDecoration: 'none',
      fontSize: 'var(--fs-small)'
    }
  }, l, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 15,
    color: "rgba(255,255,255,.5)"
  })))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/StickyActionBar.jsx
try { (() => {
function SideAction({
  icon,
  label,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 4,
      minWidth: 64,
      height: 56,
      padding: '6px 8px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      background: h ? 'var(--action-soft)' : 'var(--white)',
      fontFamily: 'var(--font-core)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: "var(--action-default)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--navy-800)'
    }
  }, label));
}
function StickyActionBar({
  onCall,
  onContact,
  onQuote,
  callLabel = 'Appeler',
  contactLabel = 'Nous contacter',
  quoteLabel = 'Devis',
  style
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      zIndex: 50,
      height: 'var(--bar-h)',
      background: 'var(--white)',
      borderTop: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-bar)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: '0 var(--gutter)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(SideAction, {
    icon: "phone",
    label: callLabel,
    onClick: onCall
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onContact,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      flex: 1,
      height: 56,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      border: 0,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: 'var(--white)',
      background: h ? 'var(--action-hover)' : 'var(--action-default)',
      boxShadow: 'var(--shadow-cta)',
      fontFamily: 'var(--font-core)',
      fontSize: '16px',
      fontWeight: 'var(--fw-bold)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "message-circle",
    size: 20
  }), contactLabel), /*#__PURE__*/React.createElement(SideAction, {
    icon: "file-text",
    label: quoteLabel,
    onClick: onQuote
  }));
}
Object.assign(__ds_scope, { StickyActionBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/StickyActionBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
function ContactScreen({
  go
}) {
  const {
    SectionHeading,
    Button,
    Card,
    Badge,
    TextField,
    Icon
  } = window.WCRentBelgiumDesignSystem_28e66c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8) var(--gutter) var(--section-y)',
      display: 'grid',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Nous contacter",
    title: "Parlons de votre projet",
    intro: "R\xE9ponse rapide, du lundi au samedi."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "phone",
    block: true,
    icon: "phone",
    showArrow: false
  }, "+32 470 12 34 56"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    icon: "mail",
    showArrow: false
  }, "info@wcrentbelgium.be")), /*#__PURE__*/React.createElement(Card, {
    tone: "info",
    padding: "var(--space-5)",
    style: {
      display: 'grid',
      gap: 'var(--space-3)',
      boxShadow: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 18,
    color: "var(--action-default)"
  }), "Belgique enti\xE8re"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 18,
    color: "var(--action-default)"
  }), "Lun \u2013 Sam \xB7 7h30 \u2013 18h")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Nom",
    placeholder: "Pr\xE9nom et nom"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    placeholder: "vous@entreprise.be"
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: 'var(--space-2)',
      fontFamily: 'var(--font-core)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-strong)'
    }
  }, "Votre message"), /*#__PURE__*/React.createElement("textarea", {
    rows: "4",
    placeholder: "D\xE9crivez votre projet en deux lignes.",
    style: {
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--border-subtle)',
      fontFamily: 'inherit',
      fontSize: 'var(--fs-body-lg)',
      color: 'var(--text-strong)',
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement(Button, {
    block: true,
    onClick: () => go('devis')
  }, "Envoyer ma demande"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    icon: "clock"
  }, "R\xE9ponse sous 24h"), /*#__PURE__*/React.createElement(Badge, {
    icon: "file-text"
  }, "Sans engagement"))));
}
window.ContactScreen = ContactScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const S = {
  section: {
    padding: 'var(--section-y) var(--gutter)',
    display: 'grid',
    gap: 'var(--space-6)'
  },
  bleed: {
    padding: 'var(--section-y) 0'
  }
};
function HomeScreen({
  go
}) {
  const {
    SectionHeading,
    Button,
    Card,
    Badge,
    ScriptNote,
    FeatureRow,
    ProductCard,
    NeedTile,
    StatStrip,
    TestimonialCard,
    CtaPanel,
    ReasonList,
    ProcessSteps,
    EcoNote,
    FaqAccordion,
    PhotoFrame,
    Icon
  } = window.WCRentBelgiumDesignSystem_28e66c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    radius: "0",
    zoomOnHover: false,
    label: "Cabines WC Rent sur un chantier belge \u2014 lumi\xE8re naturelle",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      aspectRatio: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.86) 26%,var(--white) 46%)',
      padding: '150px var(--gutter) var(--space-8)',
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-eyebrow)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Partout en Belgique"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-display)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      fontWeight: 'var(--fw-extrabold)',
      color: 'var(--text-strong)',
      textWrap: 'balance'
    }
  }, "Des sanitaires pour tous vos projets"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-lead)',
      lineHeight: 1.45,
      color: 'var(--text-body)'
    }
  }, "Location de toilettes mobiles, sanitaires et \xE9quipements pour chantiers, \xE9v\xE9nements et besoins temporaires."), /*#__PURE__*/React.createElement(FeatureRow, {
    style: {
      marginTop: 'var(--space-2)'
    },
    items: [{
      icon: 'leaf',
      label: 'Propres et hygiéniques'
    }, {
      icon: 'truck',
      label: 'Livraison rapide dans toute la Belgique'
    }, {
      icon: 'shield-check',
      label: 'Solutions écoresponsables'
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    block: true,
    onClick: () => go('devis')
  }, "Demander un devis gratuit"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    icon: "phone",
    showArrow: false
  }, "Appeler maintenant"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      paddingTop: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(ScriptNote, null, "Partout en Belgique"), /*#__PURE__*/React.createElement(PhotoFrame, {
    ratio: "1 / 1",
    label: "Carte Belgique",
    style: {
      width: 128
    }
  })), /*#__PURE__*/React.createElement(StatStrip, {
    items: [{
      icon: 'users',
      value: '+500',
      label: 'projets réalisés'
    }, {
      icon: 'star',
      value: '4,9/5',
      label: 'clients satisfaits'
    }, {
      icon: 'leaf',
      value: '100%',
      label: 'engagement vert',
      tone: 'eco'
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...S.section,
      background: 'var(--surface-alt)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Nos solutions",
    title: "Des sanitaires adapt\xE9s \xE0 chaque besoin",
    link: {
      label: 'Voir toutes nos solutions'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(ProductCard, {
    title: "Toilettes standard",
    description: "Pratique et \xE9conomique pour tous vos \xE9v\xE9nements.",
    onClick: () => go('solutions')
  }), /*#__PURE__*/React.createElement(ProductCard, {
    title: "Toilettes PMR",
    description: "Acc\xE8s facile et confortable pour tous.",
    onClick: () => go('solutions')
  }), /*#__PURE__*/React.createElement(ProductCard, {
    title: "Sanitaires de luxe",
    description: "Confort et \xE9l\xE9gance pour vos \xE9v\xE9nements haut de gamme.",
    onClick: () => go('solutions')
  }), /*#__PURE__*/React.createElement(ProductCard, {
    title: "Lave-mains autonomes",
    description: "Hygi\xE8ne et praticit\xE9 sur site.",
    onClick: () => go('solutions')
  }))), /*#__PURE__*/React.createElement("section", {
    style: S.section
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Pour tous vos projets",
    title: "Un partenaire de confiance"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-2)'
    }
  }, [['hard-hat', 'Chantiers'], ['calendar-days', 'Événements'], ['users', 'Collectivités'], ['factory', 'Sites industriels']].map(([i, l]) => /*#__PURE__*/React.createElement(NeedTile, {
    key: l,
    icon: i,
    label: l
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...S.section,
      background: 'var(--surface-dark)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    eyebrow: "Pourquoi WC Rent ?",
    title: "Un partenaire sur lequel vous pouvez compter."
  }), /*#__PURE__*/React.createElement(ReasonList, {
    items: [{
      title: 'Réactif',
      body: 'Une équipe disponible quand vous en avez besoin.'
    }, {
      title: 'Hygiénique',
      body: 'Des équipements entretenus professionnellement.'
    }, {
      title: 'Flexible',
      body: 'Des solutions adaptées à chaque projet.'
    }, {
      title: 'Partout en Belgique',
      body: 'Livraison et intervention dans tout le pays.'
    }]
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      ...S.section,
      background: 'var(--surface-alt)'
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    ratio: "16 / 9",
    label: "Festival \u2014 rang\xE9e de cabines WC Rent"
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    style: {
      marginTop: '-56px',
      marginLeft: 'var(--space-3)',
      marginRight: 'var(--space-3)'
    },
    quote: "Service impeccable, livraison rapide et mat\xE9riel tr\xE8s propre. Je recommande WC Rent Belgium !",
    author: "Thomas L.",
    meta: "organisateur d'\xE9v\xE9nements"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 6
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: i ? 'var(--grey-200)' : 'var(--navy-800)'
    }
  })))), /*#__PURE__*/React.createElement(CtaPanel, {
    eyebrow: "Un projet ? Un devis ?",
    title: "Obtenez votre devis gratuit en moins de 24h",
    intro: "Notre \xE9quipe vous accompagne pour trouver la solution la plus adapt\xE9e \xE0 vos besoins.",
    onCta: () => go('devis')
  }), /*#__PURE__*/React.createElement("section", {
    style: S.section
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Comment \xE7a marche ?"
  }), /*#__PURE__*/React.createElement(ProcessSteps, {
    steps: [{
      title: 'Demandez un devis',
      caption: 'En ligne ou par téléphone',
      icon: 'clipboard-list'
    }, {
      title: 'Recevez notre offre',
      caption: 'Sous 24h',
      icon: 'user-round'
    }, {
      title: 'Nous planifions la livraison',
      caption: 'À la date et au lieu de votre choix',
      icon: 'truck'
    }, {
      title: 'Profitez de nos services',
      caption: 'En toute sérénité',
      icon: 'smile'
    }]
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 var(--gutter) var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement(EcoNote, {
    body: "Nous privil\xE9gions des solutions durables et un entretien respectueux de l'environnement."
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      ...S.section,
      background: 'var(--surface-alt)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "FAQ",
    title: "Questions fr\xE9quentes"
  }), /*#__PURE__*/React.createElement(FaqAccordion, {
    items: [{
      q: 'Livrez-vous partout en Belgique ?',
      a: 'Oui, nous intervenons dans les trois régions du pays, en ville comme en zone rurale.'
    }, {
      q: 'Quel est le délai de livraison ?',
      a: 'La plupart des commandes sont livrées sous 48h. Pour les grands événements, nous planifions avec vous à l’avance.'
    }, {
      q: 'L’entretien est-il inclus ?',
      a: 'Il est proposé en option sur toutes les locations de plus d’une semaine.'
    }, {
      q: 'Puis-je louer pour une seule journée ?',
      a: 'Oui, la durée minimale est d’une journée.'
    }]
  })));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/QuoteScreen.jsx
try { (() => {
const STEPS = ['Besoin', 'Volume', 'Lieu', 'Date', 'Coordonnées'];
function QuoteScreen({
  go
}) {
  const {
    Button,
    SectionHeading,
    Card,
    Badge,
    StepProgress,
    ChoiceOption,
    CounterField,
    TextField,
    Icon
  } = window.WCRentBelgiumDesignSystem_28e66c;
  const [step, setStep] = React.useState(1);
  const [need, setNeed] = React.useState('Chantier');
  const [people, setPeople] = React.useState(100);
  const [place, setPlace] = React.useState('');
  const [date, setDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-12) var(--gutter)',
        display: 'grid',
        gap: 'var(--space-5)',
        justifyItems: 'center',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'var(--surface-info)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 34,
      color: "var(--action-default)",
      strokeWidth: 2.4
    })), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 'var(--fs-h2)',
        fontWeight: 'var(--fw-extrabold)',
        color: 'var(--text-strong)'
      }
    }, "Demande envoy\xE9e"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--fs-body-lg)',
        color: 'var(--text-body)',
        maxWidth: '34ch'
      }
    }, "Vous recevez votre devis sous 24h. Un conseiller vous contacte si votre projet demande une visite."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      block: true,
      onClick: () => go('home')
    }, "Retour \xE0 l\u2019accueil"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6) var(--gutter) var(--section-y)',
      display: 'grid',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(StepProgress, {
    step: step,
    total: 5,
    label: STEPS[step - 1]
  }), step === 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Quel est votre besoin ?"
  }), [['hard-hat', 'Chantier'], ['calendar-days', 'Événement'], ['heart', 'Mariage'], ['circle-ellipsis', 'Autre']].map(([i, l]) => /*#__PURE__*/React.createElement(ChoiceOption, {
    key: l,
    icon: i,
    label: l,
    selected: need === l,
    onSelect: () => setNeed(l)
  }))) : null, step === 2 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Combien de personnes ?",
    intro: "Une estimation suffit \u2014 nous ajustons ensuite avec vous."
  }), /*#__PURE__*/React.createElement(CounterField, {
    value: people,
    onChange: setPeople
  })) : null, step === 3 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "O\xF9 ?"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Code postal ou ville",
    placeholder: "1000 Bruxelles",
    value: place,
    onChange: setPlace
  }), /*#__PURE__*/React.createElement(Badge, {
    icon: "map-pin"
  }, "Nous livrons partout en Belgique")) : null, step === 4 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Quand ?"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Date de livraison",
    type: "date",
    value: date,
    onChange: setDate,
    hint: "Modifiable jusqu\u2019\xE0 48h avant."
  })) : null, step === 5 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Vos coordonn\xE9es"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Nom",
    placeholder: "Pr\xE9nom et nom",
    value: name,
    onChange: setName
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    placeholder: "vous@entreprise.be",
    value: mail,
    onChange: setMail
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "T\xE9l\xE9phone",
    type: "tel",
    placeholder: "+32 470 12 34 56"
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "info",
    padding: "var(--space-4)",
    style: {
      boxShadow: 'none',
      fontSize: 'var(--fs-small)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)'
    }
  }, need), " \xB7 ", people, " personnes \xB7 ", place || 'Belgique', " ", date ? '· ' + date : '')) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)'
    }
  }, step > 1 ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    showArrow: false,
    icon: "chevron-left",
    onClick: () => setStep(step - 1)
  }, "Retour") : null, /*#__PURE__*/React.createElement(Button, {
    block: true,
    onClick: () => step === 5 ? setSent(true) : setStep(step + 1)
  }, step === 5 ? 'Recevoir mon devis' : 'Continuer')));
}
window.QuoteScreen = QuoteScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/QuoteScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SolutionsScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PRODUCTS = [{
  title: 'Toilettes standard',
  description: 'Simple, pratique et économique.'
}, {
  title: 'Toilettes PMR',
  description: 'Accès facile et confortable pour tous.'
}, {
  title: 'Sanitaires de luxe',
  description: 'Confort et élégance pour vos événements haut de gamme.'
}, {
  title: 'Lave-mains autonomes',
  description: 'Hygiène et praticité sur site.'
}, {
  title: 'Urinoirs',
  description: 'Débit élevé pour les grands rassemblements.'
}, {
  title: 'Sanitaires événementiels',
  description: 'Configurations sur mesure pour festivals et manifestations.'
}];
function SolutionsScreen({
  go
}) {
  const {
    SectionHeading,
    Badge,
    Button,
    ProductCard,
    NeedTile,
    CtaPanel
  } = window.WCRentBelgiumDesignSystem_28e66c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-8) var(--gutter) var(--space-6)',
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Nos solutions",
    title: "Toute la gamme WC Rent",
    intro: "Du chantier au mariage, chaque configuration est livr\xE9e nettoy\xE9e et pr\xEAte \xE0 l\u2019emploi."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "solid"
  }, "Tout"), /*#__PURE__*/React.createElement(Badge, null, "Chantiers"), /*#__PURE__*/React.createElement(Badge, null, "\xC9v\xE9nements"), /*#__PURE__*/React.createElement(Badge, null, "Mariages"), /*#__PURE__*/React.createElement(Badge, {
    tone: "eco",
    icon: "leaf"
  }, "\xC9co"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 var(--gutter) var(--section-y)',
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(ProductCard, {
    featured: true,
    title: "Sanitaires \xE9v\xE9nementiels",
    description: "Remorques sanitaires compl\xE8tes, install\xE9es et entretenues par nos \xE9quipes pendant toute la dur\xE9e de votre \xE9v\xE9nement.",
    ctaLabel: "D\xE9couvrir la gamme"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-3)'
    }
  }, PRODUCTS.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.title
  }, p))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 var(--gutter) var(--section-y)',
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Pour quel besoin ?",
    title: "Chaque projet a sa configuration"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-3)'
    }
  }, [['hard-hat', 'Chantiers'], ['calendar-days', 'Événements'], ['heart', 'Mariages'], ['medal', 'Sport'], ['factory', 'Industrie'], ['landmark', 'Collectivités']].map(([i, l]) => /*#__PURE__*/React.createElement(NeedTile, {
    key: l,
    icon: i,
    label: l
  })))), /*#__PURE__*/React.createElement(CtaPanel, {
    tone: "navy",
    title: "Une question sur nos \xE9quipements ?",
    intro: "Nous vous conseillons la configuration adapt\xE9e \xE0 votre site.",
    ctaLabel: "Demander un devis",
    onCta: () => go('devis'),
    assurances: []
  }));
}
window.SolutionsScreen = SolutionsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SolutionsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BrandWordmark = __ds_scope.BrandWordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.ScriptNote = __ds_scope.ScriptNote;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ChoiceOption = __ds_scope.ChoiceOption;

__ds_ns.CounterField = __ds_scope.CounterField;

__ds_ns.StepProgress = __ds_scope.StepProgress;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.CtaPanel = __ds_scope.CtaPanel;

__ds_ns.EcoNote = __ds_scope.EcoNote;

__ds_ns.FaqAccordion = __ds_scope.FaqAccordion;

__ds_ns.FeatureRow = __ds_scope.FeatureRow;

__ds_ns.NeedTile = __ds_scope.NeedTile;

__ds_ns.ProcessSteps = __ds_scope.ProcessSteps;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ReasonList = __ds_scope.ReasonList;

__ds_ns.StatStrip = __ds_scope.StatStrip;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.PhotoFrame = __ds_scope.PhotoFrame;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.MobileMenu = __ds_scope.MobileMenu;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.StickyActionBar = __ds_scope.StickyActionBar;

})();
