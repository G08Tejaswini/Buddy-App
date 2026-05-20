import Svg, { Ellipse, Rect, Path, Circle, G } from "react-native-svg";

// Helper: darken a hex color
const darken = (hex, amount = 0.3) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - 255 * amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - 255 * amount);
  const b = Math.max(0, (num & 0x0000ff) - 255 * amount);
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
};

export default function BuddyAvatar({
  skin,
  hair,
  hairColor,
  outfit,
  size = 120,
  mood = "happy",
  celebrating = false,
  personality = "chill",
}) {
  const s = size;
  const cx = s / 2;

  // ===== COZY OUTLINE (applied to head, body, ears, arms) =====
  const bodyOutline = "#2E2A25";
  const bodyOutlineWidth = s * 0.002;

  // Hair outline (slightly darker than hair color, thin)
  const hairStroke = darken(hairColor, 0.35);
  const hairOutlineWidth = s * 0.001;

  const outlineProps = {
    stroke: hairStroke,
    strokeWidth: hairOutlineWidth,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  };

  // ===== FACIAL FEATURES =====
  const eyeY = s * 0.42;
  const eyeRx = s * 0.065;
  const eyeRy = s * 0.065;

  // ===== PERSONALITY-BASED EXPRESSIONS =====
  const getExpression = () => {
    const effectiveMood = celebrating ? "excited" : mood;

    const persona = personality || "chill";

    // Mouths
    const mouths = {
      hype: {
        happy: `M${cx - 7} ${s * 0.54} Q${cx} ${s * 0.62} ${cx + 7} ${s * 0.54}`,
        excited: `M${cx - 8} ${s * 0.54} Q${cx} ${s * 0.66} ${cx + 8} ${s * 0.54} Q${cx} ${s * 0.6} ${cx - 8} ${s * 0.54}Z`,
        sad: `M${cx - 10} ${s * 0.57} Q${cx} ${s * 0.49} ${cx + 10} ${s * 0.57}`,
        neutral: `M${cx - 6} ${s * 0.55} L${cx + 6} ${s * 0.55}`,
      },
      chill: {
        happy: `M${cx - 5} ${s * 0.54} Q${cx} ${s * 0.58} ${cx + 5} ${s * 0.54}`,
        excited: `M${cx - 6} ${s * 0.54} Q${cx} ${s * 0.61} ${cx + 6} ${s * 0.54}`,
        sad: `M${cx - 8} ${s * 0.57} Q${cx} ${s * 0.52} ${cx + 8} ${s * 0.57}`,
        neutral: `M${cx - 4} ${s * 0.55} L${cx + 4} ${s * 0.55}`,
      },
      sassy: {
        happy: `M${cx - 4} ${s * 0.53} Q${cx} ${s * 0.59} ${cx + 7} ${s * 0.53}`,
        excited: `M${cx - 5} ${s * 0.53} Q${cx} ${s * 0.62} ${cx + 6} ${s * 0.53}`,
        sad: `M${cx - 6} ${s * 0.57} Q${cx + 2} ${s * 0.53} ${cx + 9} ${s * 0.57}`,
        neutral: `M${cx - 3} ${s * 0.54} Q${cx + 2} ${s * 0.56} ${cx + 6} ${s * 0.54}`,
      },
      cozy: {
        happy: `M${cx - 5} ${s * 0.54} Q${cx} ${s * 0.59} ${cx + 5} ${s * 0.54}`,
        excited: `M${cx - 6} ${s * 0.54} Q${cx} ${s * 0.63} ${cx + 6} ${s * 0.54} Q${cx} ${s * 0.58} ${cx - 6} ${s * 0.54}Z`,
        sad: `M${cx - 9} ${s * 0.57} Q${cx} ${s * 0.5} ${cx + 9} ${s * 0.57}`,
        neutral: `M${cx - 4} ${s * 0.55} L${cx + 4} ${s * 0.55}`,
      },
    };

    const selectedMouths = mouths[persona] || mouths.chill;
    const mouthD = selectedMouths[effectiveMood] || selectedMouths.neutral;
    const isOpenMouth = effectiveMood === "excited" && (persona === "hype" || persona === "cozy");

    // Blush
    const blushAlpha = { hype: 0.45, chill: 0.3, sassy: 0.35, cozy: 0.4 }[persona] || 0.3;

    // Eyes
    const eyeScale = persona === "hype" ? 1.15 : 1;
    const eyeSoft = persona === "cozy" ? 0.9 : 1;

    return { mouthD, isOpenMouth, blushAlpha, eyeScale, eyeSoft, showBrows: persona === "sassy" };
  };

  const expr = getExpression();
  // ===== BACK HAIR =====
  const renderBackHair = () => {
    if (hair === "ponytail") {
      return (
        <G {...outlineProps}>
          <Path
            d={`M${cx - s * 0.04} ${s * 0.05} Q${cx + s * 0.02} ${s * 0.25} ${cx - s * 0.03} ${s * 0.45} Q${cx - s * 0.08} ${s * 0.5} ${cx - s * 0.1} ${s * 0.42} Q${cx - s * 0.12} ${s * 0.25} ${cx - s * 0.06} ${s * 0.1}Z`}
            fill={hairColor}
          />
        </G>
      );
    }
    if (hair === "long" || hair === "longCurly") {
      return (
        <G {...outlineProps}>
          <Path
            d={`M${cx - s * 0.22} ${s * 0.33} Q${cx - s * 0.35} ${s * 0.55} ${cx - s * 0.3} ${s * 0.85} Q${cx - s * 0.24} ${s * 0.88} ${cx - s * 0.2} ${s * 0.82} Q${cx - s * 0.24} ${s * 0.55} ${cx - s * 0.16} ${s * 0.33}Z`}
            fill={hairColor}
          />
          <Path
            d={`M${cx + s * 0.22} ${s * 0.33} Q${cx + s * 0.35} ${s * 0.55} ${cx + s * 0.3} ${s * 0.85} Q${cx + s * 0.24} ${s * 0.88} ${cx + s * 0.2} ${s * 0.82} Q${cx + s * 0.24} ${s * 0.55} ${cx + s * 0.16} ${s * 0.33}Z`}
            fill={hairColor}
          />
        </G>
      );
    }
    return null;
  };

  // ===== FRONT HAIR =====
  const renderFrontHair = () => {
    const HairWrap = ({ children, offsetX = 0, offsetY = 0, scale = 1, rotate = 0 }) => (
      <G
        transform={`translate(${cx + offsetX * s}, ${offsetY * s}) scale(${scale * s / 100}) rotate(${rotate})`}
        {...outlineProps}
        fill={hairColor}
      >
        {children}
      </G>
    );

    if (hair === "bobCut") {
      return (
        <HairWrap offsetX={-0.37} offsetY={0.04} scale={0.76}>
          <Path d="M7.27157 23.6596C12.6609 17.0283 23.09 18.1337 26.9694 25.7475C28.288 28.3355 28.6072 31.3184 27.8661 34.1267L23.0295 52.4546C21.9079 56.7049 17.8525 59.5008 13.4812 59.0374C9.10985 58.5741 5.7307 54.9902 5.52503 50.5992L4.63817 31.6646C4.50228 28.7633 5.43975 25.9136 7.27157 23.6596Z" />
          <Path d="M68.1651 25.8684C71.0943 17.8821 81.313 15.6188 87.3406 21.6212C89.3439 23.6162 90.5542 26.2712 90.7462 29.0919L92.0517 48.273C92.3457 52.5928 89.4378 56.4786 85.2105 57.415C80.9832 58.3513 76.7064 56.0568 75.1488 52.0169L68.2327 34.0785C67.2156 31.4405 67.1916 28.5228 68.1651 25.8684Z" />
          <Ellipse cx={47.9272} cy={20.5} rx={32} ry={20.5} />
        </HairWrap>
      );
    }

    if (hair === "ponytail") {
      return (
        <HairWrap offsetX={-0.32} offsetY={0} scale={0.81} rotate={5}>
          <Path d="M77.7246 60.8926C78.159 63.6685 78.2016 66.4916 77.8506 69.2793L73.9395 100.338C73.397 104.645 69.9331 107.996 65.6104 108.396C61.2874 108.795 57.2676 106.135 55.9453 102L48.377 78.3311C62.2342 75.6107 73.1983 64.8302 76.1875 51.0713L77.7246 60.8926ZM47.9668 8.58888C53.698 3.18092 63.4552 3.60658 68.4414 10.6797C69.6469 12.3897 70.4421 14.3549 70.7656 16.4219L72.2158 25.6924C67.1044 16.8949 58.3229 10.495 47.9668 8.58888Z" />
          <Path d="M64.3229 15.6712C73.1276 22.9142 77.7924 31.7918 74.7419 35.4999C71.6915 39.2081 62.081 36.3426 53.2763 29.0997C44.4716 21.8568 39.8069 12.9791 42.8573 9.27096C45.9077 5.56279 55.5182 8.42828 64.3229 15.6712Z" />
          <Ellipse cx={29.7857} cy={26.4355} rx={15.2071} ry={25.6182} transform="rotate(58.1522 29.7857 26.4355)" />
          <Ellipse cx={73.0434} cy={34.5363} rx={3.37852} ry={15.1727} transform="rotate(-14.3907 73.0434 34.5363)" />
        </HairWrap>
      );
    }

    if (hair === "twoBuns") {
      return (
        <HairWrap offsetX={-0.34} offsetY={0} scale={0.81}>
          <Ellipse cx={59.5} cy={14.5001} rx={13.5} ry={14.5} />
          <Ellipse cx={13.5} cy={14.5} rx={13.5} ry={14.5} transform="matrix(-1 0 0 1 38 0)" />
          <Ellipse cx={29.7857} cy={26.4355} rx={15.2071} ry={25.6182} transform="rotate(58.1522 29.7857 26.4355)" />
          <Ellipse cx={73.0434} cy={34.5363} rx={3.37852} ry={15.1727} transform="rotate(-14.3907 73.0434 34.5363)" />
          <Path d="M64.3229 15.6713C73.1276 22.9142 77.7923 31.7918 74.7419 35.5C71.6915 39.2082 62.081 36.3427 53.2763 29.0997C44.4716 21.8568 39.8069 12.9792 42.8573 9.27101C45.9077 5.56284 55.5182 8.42833 64.3229 15.6713Z" />
        </HairWrap>
      );
    }

    if (hair === "twinTails") {
      return (
        <HairWrap offsetX={-0.33} offsetY={0.01} scale={0.79}>
          <Path d="M5.36098 60.9864C4.92655 63.7623 4.88394 66.5854 5.235 69.3731L9.14613 100.432C9.68858 104.739 13.1525 108.09 17.4752 108.489C21.7982 108.889 25.818 106.229 27.1403 102.094L34.7086 78.4249C20.8514 75.7045 9.88733 64.924 6.89809 51.1651L5.36098 60.9864ZM35.1188 8.68267C29.3876 3.2747 19.6304 3.70037 14.6442 10.7735C13.4387 12.4835 12.6435 14.4487 12.32 16.5157L10.8698 25.7862C15.9811 16.9887 24.7627 10.5888 35.1188 8.68267Z" />
          <Path d="M77.7246 60.8926C78.159 63.6686 78.2016 66.4917 77.8506 69.2794L73.9395 100.338C73.397 104.645 69.9331 107.996 65.6104 108.396C61.2874 108.795 57.2676 106.135 55.9453 102L48.377 78.3311C62.2342 75.6108 73.1983 64.8303 76.1875 51.0714L77.7246 60.8926ZM47.9668 8.58893C53.698 3.18097 63.4552 3.60663 68.4414 10.6798C69.6469 12.3897 70.4421 14.3549 70.7656 16.4219L72.2158 25.6925C67.1044 16.895 58.3229 10.495 47.9668 8.58893Z" />
          <Path d="M64.3229 15.6712C73.1276 22.9142 77.7924 31.7918 74.7419 35.4999C71.6915 39.2081 62.081 36.3426 53.2763 29.0997C44.4716 21.8568 39.8069 12.9791 42.8573 9.27096C45.9077 5.56279 55.5182 8.42828 64.3229 15.6712Z" />
          <Ellipse cx={29.7857} cy={26.4355} rx={15.2071} ry={25.6182} transform="rotate(58.1522 29.7857 26.4355)" />
          <Ellipse cx={73.0434} cy={34.5363} rx={3.37852} ry={15.1727} transform="rotate(-14.3907 73.0434 34.5363)" />
        </HairWrap>
      );
    }

    if (hair === "undercut") {
      return (
        <HairWrap offsetX={-0.359} offsetY={-0.01} scale={0.78}>
          <Path d="M38.2344 25.3512C39.5766 17.622 31.1934 11.908 24.4899 15.983V15.983C23.0946 16.8312 21.9521 18.038 21.1815 19.4777L9.2786 41.715C7.72795 44.612 8.61096 48.212 11.3261 50.0627V50.0627C14.0413 51.9133 17.7149 51.4191 19.8445 48.9167L36.1911 29.7082C37.2494 28.4646 37.955 26.9601 38.2344 25.3512V25.3512Z" fillOpacity={0.82} />
          <Path d="M55.1009 25.1886C54.0064 17.4205 62.5679 11.9773 69.1377 16.2645V16.2645C70.5053 17.1569 71.6086 18.3995 72.3328 19.8631L83.5189 42.4695C84.9762 45.4145 83.9786 48.9845 81.2057 50.7474V50.7474C78.4327 52.5104 74.7768 51.899 72.7283 49.3298L57.0039 29.6087C55.9859 28.3319 55.3288 26.8056 55.1009 25.1886V25.1886Z" fillOpacity={0.82} />
          <Path d="M46.4994 9.00014C64.1183 9.00014 78.5688 20.4405 79.9984 35.0001H13.0004C14.43 20.4405 28.8805 9.00014 46.4994 9.00014Z" />
        </HairWrap>
      );
    }

    if (hair === "singleBun") {
      return (
        <HairWrap offsetX={-0.31} offsetY={-0} scale={0.74}>
          <Ellipse cx={59.5} cy={14.5001} rx={13.5} ry={14.5} />
          <Ellipse cx={29.7857} cy={26.4355} rx={15.2071} ry={25.6182} transform="rotate(58.1522 29.7857 26.4355)" />
          <Ellipse cx={73.0434} cy={34.5363} rx={3.37852} ry={15.1727} transform="rotate(-14.3907 73.0434 34.5363)" />
          <Path d="M64.3229 15.6713C73.1276 22.9142 77.7923 31.7918 74.7419 35.5C71.6915 39.2082 62.081 36.3427 53.2763 29.0997C44.4716 21.8568 39.8069 12.9792 42.8573 9.27101C45.9077 5.56284 55.5182 8.42833 64.3229 15.6713Z" />
        </HairWrap>
      );
    }

    if (hair === "bowlCut") {
      return (
        <HairWrap offsetX={-0.32} offsetY={0.05} scale={0.78}>
          <Path d="M41 0C62.5635 4.38515e-06 80.2504 13.2004 82 30H0C1.74961 13.2004 19.4365 0 41 0Z" />
        </HairWrap>
      );
    }

    if (hair === "sideSweep") {
      return (
        <HairWrap offsetX={-0.34} offsetY={0.01} scale={0.78}>
          <Ellipse cx={29.7857} cy={26.4355} rx={15.2071} ry={25.6182} transform="rotate(58.1522 29.7857 26.4355)" />
          <Ellipse cx={73.0434} cy={34.5363} rx={3.37852} ry={15.1727} transform="rotate(-14.3907 73.0434 34.5363)" />
          <Path d="M64.3229 15.6713C73.1276 22.9142 77.7923 31.7918 74.7419 35.5C71.6915 39.2082 62.081 36.3427 53.2763 29.0997C44.4716 21.8568 39.8069 12.9792 42.8573 9.27101C45.9077 5.56284 55.5182 8.42833 64.3229 15.6713Z" />
        </HairWrap>
      );
    }

    if (hair === "cap") {
      return (
        <HairWrap offsetX={-0.34} offsetY={0.07} scale={0.78}>
          <Path d="M43.5 2C61.6449 2 76.5278 15.2003 78 32H9C10.4722 15.2004 25.3551 2 43.5 2Z" fill={hairColor} />
          <Rect x={0} y={27} width={71} height={5} fill={darken(hairColor, 0.3)} />
          <Ellipse cx={44} cy={2} rx={1} ry={2} fill={darken(hairColor, 0.4)} />
        </HairWrap>
      );
    }

    return null;
  };

  // ===== RENDER =====
  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} overflow="visible">
      {/* BACK HAIR */}
      {renderBackHair()}

      {/* EARS (smaller) */}
      <Ellipse cx={cx - s * 0.29} cy={s * 0.38} rx={s * 0.055} ry={s * 0.045} fill={skin} stroke={bodyOutline} strokeWidth={bodyOutlineWidth} />
      <Ellipse cx={cx + s * 0.29} cy={s * 0.38} rx={s * 0.055} ry={s * 0.045} fill={skin} stroke={bodyOutline} strokeWidth={bodyOutlineWidth} />

      {/* BODY — moved up to connect with head */}
      <Rect
        x={cx - s * 0.22}
        y={s * 0.58}           // closer to head
        width={s * 0.44}
        height={s * 0.22}      // slightly taller
        rx={s * 0.08}
        fill={outfit}
        stroke={bodyOutline}
        strokeWidth={bodyOutlineWidth}
      />

      {/* HEAD */}
      <Ellipse
        cx={cx}
        cy={s * 0.38}
        rx={s * 0.27}
        ry={s * 0.28}
        fill={skin}
        stroke={bodyOutline}
        strokeWidth={bodyOutlineWidth}
      />

      {/* FRONT HAIR */}
      {renderFrontHair()}

      {/* EYES */}
      <Ellipse
        cx={cx - s * 0.1}
        cy={eyeY}
        rx={eyeRx * expr.eyeScale * expr.eyeSoft}
        ry={eyeRy * expr.eyeScale}
        fill="#2E1A0A"
      />
      <Ellipse
        cx={cx + s * 0.1}
        cy={eyeY}
        rx={eyeRx * expr.eyeScale * expr.eyeSoft}
        ry={eyeRy * expr.eyeScale}
        fill="#2E1A0A"
      />

      {/* EYE SHINES */}
      <Circle cx={cx - s * 0.078} cy={eyeY - s * 0.018} r={s * 0.018} fill="white" />
      <Circle cx={cx - s * 0.117} cy={eyeY - s * 0.005} r={s * 0.008} fill="white" />
      <Circle cx={cx + s * 0.122} cy={eyeY - s * 0.018} r={s * 0.018} fill="white" />
      <Circle cx={cx + s * 0.082} cy={eyeY - s * 0.005} r={s * 0.008} fill="white" />

      {/* SASSY EYEBROWS */}
      {expr.showBrows && (
        <G>
          <Path
            d={`M${cx - s * 0.14} ${eyeY - s * 0.065} Q${cx - s * 0.1} ${eyeY - s * 0.085} ${cx - s * 0.06} ${eyeY - s * 0.065}`}
            fill="none"
            stroke="#2E1A0A"
            strokeWidth={s * 0.014}
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + s * 0.06} ${eyeY - s * 0.065} Q${cx + s * 0.1} ${eyeY - s * 0.075} ${cx + s * 0.14} ${eyeY - s * 0.055}`}
            fill="none"
            stroke="#2E1A0A"
            strokeWidth={s * 0.014}
            strokeLinecap="round"
          />
        </G>
      )}
      {/* NOSE (tiny dot) */}
      <Ellipse cx={cx} cy={s * 0.47} rx={s * 0.018} ry={s * 0.013} fill={darken(skin, 0.3)} />

      {/* CHEEKS */}
      <Ellipse cx={cx - s * 0.19} cy={s * 0.48} rx={s * 0.065} ry={s * 0.04} fill={`rgba(255,140,150,${expr.blushAlpha})`} />
      <Ellipse cx={cx + s * 0.19} cy={s * 0.48} rx={s * 0.065} ry={s * 0.04} fill={`rgba(255,140,150,${expr.blushAlpha})`} />
      
      {/* MOUTH */}
      {expr.isOpenMouth ? (
        <G>
          <Path d={expr.mouthD} fill="#3D1818" stroke="#2E1A0A" strokeWidth={s * 0.012} strokeLinejoin="round" />
          <Ellipse cx={cx} cy={s * 0.565} rx={s * 0.035} ry={s * 0.02} fill="#FF8A80" />
        </G>
      ) : (
        <Path d={expr.mouthD} fill="none" stroke="#2E1A0A" strokeWidth={s * 0.022} strokeLinecap="round" />
      )}
      {/* ARMS (resting, slightly higher) */}
      {!celebrating && (
        <G>
          {/* Left arm */}
          <Path
            d={`M${cx - s * 0.22} ${s * 0.62} Q${cx - s * 0.34} ${s * 0.66} ${cx - s * 0.32} ${s * 0.78}`}
            fill="none"
            stroke={outfit}
            strokeWidth={s * 0.1}
            strokeLinecap="round"
          />
          <Circle cx={cx - s * 0.32} cy={s * 0.79} r={s * 0.05} fill={skin} stroke={bodyOutline} strokeWidth={bodyOutlineWidth * 0.5} />

          {/* Right arm */}
          <Path
            d={`M${cx + s * 0.22} ${s * 0.62} Q${cx + s * 0.34} ${s * 0.66} ${cx + s * 0.32} ${s * 0.78}`}
            fill="none"
            stroke={outfit}
            strokeWidth={s * 0.1}
            strokeLinecap="round"
          />
          <Circle cx={cx + s * 0.32} cy={s * 0.79} r={s * 0.05} fill={skin} stroke={bodyOutline} strokeWidth={bodyOutlineWidth * 0.5} />
        </G>
        )}
        {/* Celebrating arms — raised to shoulder level */}
        {celebrating && (
          <G>
            <Path
              d={`M${cx - s * 0.22} ${s * 0.62} Q${cx - s * 0.42} ${s * 0.42} ${cx - s * 0.35} ${s * 0.32}`}
              fill="none"
              stroke={outfit}
              strokeWidth={s * 0.1}
              strokeLinecap="round"
            />
            <Circle cx={cx - s * 0.35} cy={s * 0.31} r={s * 0.05} fill={skin} stroke={bodyOutline} strokeWidth={bodyOutlineWidth * 0.7} />
            <Path
              d={`M${cx + s * 0.22} ${s * 0.62} Q${cx + s * 0.42} ${s * 0.42} ${cx + s * 0.35} ${s * 0.32}`}
              fill="none"
              stroke={outfit}
              strokeWidth={s * 0.1}
              strokeLinecap="round"
            />
            <Circle cx={cx + s * 0.35} cy={s * 0.31} r={s * 0.05} fill={skin} stroke={bodyOutline} strokeWidth={bodyOutlineWidth * 0.7} />
          </G>

      )}
    </Svg>
  );
}