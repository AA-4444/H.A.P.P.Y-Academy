import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

/**
 * Установка:
 * npm i react-simple-maps d3-geo
 */

const SECTION_BG = "#F3EEE6";
const ACCENT = "#E64B1E";
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const formatInt = (n: number) => n.toLocaleString("ru-RU");

export default function MillionImpactSection() {
  const GOAL = 1_000_000;
  const CURRENT = 200_000;
  const PERCENT = Math.round((CURRENT / GOAL) * 100);

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasRunRef = useRef(false);

  // number animation
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
	const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
	return () => unsub();
  }, [mv]);

  // points reveal animation (0..1)
  const reveal = useMotionValue(0);

  useEffect(() => {
	const el = sectionRef.current;
	if (!el) return;

	const io = new IntersectionObserver(
	  (entries) => {
		const e = entries[0];
		if (!e?.isIntersecting) return;
		if (hasRunRef.current) return;
		hasRunRef.current = true;

		mv.set(0);
		reveal.set(0);

		animate(mv, CURRENT, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
		animate(reveal, 1, { duration: 1.0, ease: [0.22, 1, 0.36, 1] });
	  },
	  { threshold: 0.4 }
	);

	io.observe(el);
	return () => io.disconnect();
  }, [mv, reveal]);

  const subtitle = useMemo(
	() =>
	  "Мы строим систему, которая масштабируется. Прогресс измеряется людьми — не обещаниями.",
	[]
  );

  /**
   * ✅ More points in USA + Israel
   * Format: [lon, lat]
   */
  const points = useMemo(() => {
	const base: Array<[number, number]> = [
	  // Europe
	  [37.6173, 55.7558],
	  [30.5234, 50.4501],
	  [19.0402, 47.4979],
	  [14.4378, 50.0755],
	  [2.3522, 48.8566],
	  [13.405, 52.52],
	  [-0.1276, 51.5072],
	  [12.4964, 41.9028],
	  [23.7275, 37.9838],
	  [28.9784, 41.0082],

	  // MENA
	  [31.2357, 30.0444],
	  [46.6753, 24.7136],
	  [55.2708, 25.2048],
	  [51.389, 35.6892],

	  // Africa
	  [3.3792, 6.5244],
	  [36.8219, -1.2921],
	  [18.4241, -33.9249],
	  [28.0473, -26.2041],

	  // Asia
	  [72.8777, 19.076],
	  [77.209, 28.6139],
	  [116.4074, 39.9042],
	  [121.4737, 31.2304],
	  [139.6917, 35.6895],
	  [126.978, 37.5665],
	  [100.5018, 13.7563],
	  [106.865, -6.1751],
	  [103.8198, 1.3521],
	  [121.774, 12.8797],

	  // Oceania
	  [151.2093, -33.8688],
	  [144.9631, -37.8136],
	  [174.7633, -36.8485],

	  // Americas (base)
	  [-99.1332, 19.4326], // Mexico City
	  [-46.6333, -23.5505], // Sao Paulo
	  [-58.3816, -34.6037], // Buenos Aires
	  [-70.6693, -33.4489], // Santiago
	  [-79.3832, 43.6532], // Toronto
	];

	const usa: Array<[number, number]> = [
	  // West
	  [-122.4194, 37.7749], // SF
	  [-118.2437, 34.0522], // LA
	  [-122.3321, 47.6062], // Seattle
	  [-121.8863, 37.3382], // San Jose
	  [-117.1611, 32.7157], // San Diego
	  [-112.074, 33.4484], // Phoenix
	  [-104.9903, 39.7392], // Denver
	  [-115.1398, 36.1699], // Las Vegas

	  // Central
	  [-97.7431, 30.2672], // Austin
	  [-96.797, 32.7767], // Dallas
	  [-95.3698, 29.7604], // Houston
	  [-87.6298, 41.8781], // Chicago
	  [-93.265, 44.9778], // Minneapolis

	  // East
	  [-74.006, 40.7128], // NYC
	  [-71.0589, 42.3601], // Boston
	  [-77.0369, 38.9072], // DC
	  [-75.1652, 39.9526], // Philly
	  [-80.1918, 25.7617], // Miami
	  [-84.388, 33.749], // Atlanta
	  [-81.3792, 28.5383], // Orlando
	  [-86.7816, 36.1627], // Nashville
	  [-90.0489, 35.1495], // Memphis
	];

	const israel: Array<[number, number]> = [
	  [34.7818, 32.0853], // Tel Aviv
	  [35.2137, 31.7683], // Jerusalem
	  [34.9885, 32.794], // Haifa
	  [34.7999, 31.2518], // Be'er Sheva
	  [34.8333, 32.1667], // Rishon LeZion (approx)
	  [34.8583, 32.0833], // Givatayim/Ramat Gan (approx)
	  [35.095, 31.0461], // Eilat (approx)
	];

	const all = [...base, ...usa, ...israel];

	return all.map((c, idx) => ({
	  id: `p-${idx}`,
	  coordinates: c as [number, number],
	}));
  }, []);

  return (
	<section
	  ref={sectionRef as any}
	  id="million-impact"
	  className="relative"
	  style={{ background: SECTION_BG }}
	>
	  {/* DESKTOP/TABLET: карта как фон секции */}
	  <div className="absolute inset-0 z-0 hidden sm:block">
		<WorldMapCoverBackground
		  geoUrl={GEO_URL}
		  points={points}
		  accent={ACCENT}
		  reveal={reveal}
		  mode="cover"
		  isMobile={false}
		/>
		<div
		  className="absolute inset-0"
		  style={{
			background:
			 
			  "linear-gradient(to bottom, rgba(243,238,230,0.78) 0%, rgba(243,238,230,0.58) 42%, rgba(243,238,230,0.46) 100%)",
		  }}
		/>
	  </div>

	  {/* MOBILE: карта отдельным блоком под текстом */}
	  <div className="relative z-10 sm:hidden">
		<div className="mx-auto max-w-7xl px-6 pt-12">
		  <div className="text-center max-w-5xl mx-auto">
			<div className="text-[11px] tracking-[0.22em] uppercase text-black/45">
			  МИССИЯ
			</div>

			<h2 className="mt-4 font-sans font-extrabold tracking-tight text-4xl text-black leading-[1.05]">
			  <MarkerHighlight>{formatInt(GOAL)} людей счастливее</MarkerHighlight>
			</h2>

			<p className="mt-4 font-sans text-black/70 text-base leading-relaxed">
			  {subtitle}
			</p>
		  </div>

		  <div className="mt-8 grid grid-cols-1 gap-4">
			<div>
			 
			  <div className="mt-2 font-sans font-extrabold tracking-tight text-2xl text-black">
				Реальные люди по всему миру
			  </div>
			  <div className="mt-2 font-sans text-black/60 text-sm">
				{PERCENT}% от цели · рост идёт каждый день
			  </div>
			</div>

			<div>
			  <div
				className="font-sans font-extrabold tracking-tight text-4xl text-black tabular-nums"
				style={{ fontVariantNumeric: "tabular-nums" }}
			  >
				{formatInt(display)}
			  </div>
			  <div className="mt-1 font-sans text-black/55 text-xs">
				участников / вовлечённых
			  </div>
			</div>
		  </div>
		</div>

		{/* MOBILE MAP (no pan/zoom, no drag blocking scroll) */}
		<div className="mt-6 px-2">
		  <div
			className="w-full"
			style={{
			  height: "min(46svh, 360px)",
			}}
		  >
			<WorldMapCoverBackground
			  geoUrl={GEO_URL}
			  points={points}
			  accent={ACCENT}
			  reveal={reveal}
			  mode="contain"
			  isMobile={true}
			/>
		  </div>
		</div>

		<div className="h-6" />
	  </div>

	  {/* DESKTOP/TABLET CONTENT поверх фона */}
	  <div className="relative z-10 hidden sm:block">
		<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-14 sm:pt-16">
		  <div className="text-center max-w-5xl mx-auto">
			<div className="text-[11px] tracking-[0.22em] uppercase text-black/45">
			  МИССИЯ
			</div>

			<h2 className="mt-4 font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
			  <MarkerHighlight>{formatInt(GOAL)} людей счастливее</MarkerHighlight>
			</h2>

			<p className="mt-5 font-sans text-black/70 text-base sm:text-lg leading-relaxed">
			  {subtitle}
			</p>
		  </div>
		</div>

		<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mt-10 sm:mt-12">
		  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-6 items-start">
			<div>
			  
			  <div className="mt-2 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl text-black">
				Реальные люди по всему миру
			  </div>
			  <div className="mt-2 font-sans text-black/60 text-sm sm:text-base">
				{PERCENT}% от цели · рост идёт каждый день
			  </div>
			</div>

			<div className="sm:text-right">
			  <div
				className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black tabular-nums"
				style={{ fontVariantNumeric: "tabular-nums" }}
			  >
				{formatInt(display)}
			  </div>
			  <div className="mt-1 font-sans text-black/55 text-xs sm:text-sm">
				участников / вовлечённых
			  </div>
			</div>
		  </div>
		</div>

		<div className="h-[58svh] sm:h-[62svh]" />
	  </div>

	  {/* CTA sticky внутри секции */}
	  <div className="sticky bottom-0 z-20">
		<button
		  type="button"
		  className={[
			"w-full",
			"h-[76px] sm:h-[90px]",
			"bg-yellow-400 text-black",
			"hover:bg-yellow-300 transition",
			"font-sans font-extrabold",
			"text-lg sm:text-xl",
			"flex items-center justify-center gap-3",
			"shadow-[0_-10px_30px_rgba(0,0,0,0.12)]",
		  ].join(" ")}
		>
		  Принять участие
		  <ArrowRight className="h-6 w-6" />
		</button>
	  </div>
	</section>
  );
}

function MarkerHighlight({ children }: { children: React.ReactNode }) {
  return (
	<span className="relative inline-block">
	  <span
		className="absolute left-[-0.06em] right-[-0.06em] bottom-[0.08em] top-[0.55em] rounded-[18px]"
		style={{
		  background: "rgba(250, 210, 72, 0.85)",
		  transform: "rotate(-1.2deg)",
		}}
	  />
	  <span className="relative">{children}</span>
	</span>
  );
}

function WorldMapCoverBackground({
  geoUrl,
  points,
  accent,
  reveal,
  mode,
  isMobile,
}: {
  geoUrl: string;
  points: Array<{ id: string; coordinates: [number, number] }>;
  accent: string;
  reveal: any;
  mode: "cover" | "contain";
  isMobile: boolean;
}) {
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
	const unsub = reveal.on("change", (v: number) => {
	  const t = Math.max(0, Math.min(1, v));
	  setShownCount(Math.round(points.length * t));
	});
	return () => unsub();
  }, [reveal, points.length]);

  const visible = points.slice(0, shownCount);

  // ✅ map a bit stronger on desktop
  const geoFill = isMobile ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.10)";
  const geoStroke = isMobile ? "rgba(0,0,0,0.14)" : "rgba(0,0,0,0.18)";

  return (
	<div className="w-full h-full">
	  <ComposableMap
		projection="geoMercator"
		projectionConfig={{
		  scale: mode === "cover" ? 185 : 150, // ✅ чуть крупнее на ПК
		}}
		className="w-full h-full"
		style={{ width: "100%", height: "100%" }}
		preserveAspectRatio={mode === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
	  >
		<ZoomableGroup
		  zoom={1}
		  minZoom={1}
		  maxZoom={1}
		  center={[0, 12]}
		  // ✅ IMPORTANT: отключаем drag/zoom на мобиле, чтобы не мешало скроллу
		  translateExtent={[[0, 0], [0, 0]]}
		  disablePanning={isMobile}
		  disableZooming={true}
		>
		  <Geographies geography={geoUrl}>
			{({ geographies }) =>
			  geographies.map((geo) => (
				<Geography
				  key={geo.rsmKey}
				  geography={geo}
				  style={{
					default: {
					  fill: geoFill,
					  stroke: geoStroke,
					  strokeWidth: isMobile ? 0.6 : 0.75,
					  outline: "none",
					},
					hover: {
					  fill: isMobile ? geoFill : "rgba(0,0,0,0.11)",
					  stroke: isMobile ? geoStroke : "rgba(0,0,0,0.20)",
					  strokeWidth: isMobile ? 0.6 : 0.8,
					  outline: "none",
					},
					pressed: { fill: geoFill, outline: "none" },
				  }}
				/>
			  ))
			}
		  </Geographies>

		  {visible.map((p, idx) => (
			<Marker key={p.id} coordinates={p.coordinates}>
			  <PulsingDot accent={accent} delay={Math.min(0.7, idx * 0.015)} />
			</Marker>
		  ))}
		</ZoomableGroup>
	  </ComposableMap>
	</div>
  );
}

function PulsingDot({ accent, delay = 0 }: { accent: string; delay?: number }) {
  return (
	<g>
	  <motion.circle
		r={11}
		fill={accent}
		opacity={0.16}
		initial={{ scale: 0.6, opacity: 0 }}
		animate={{ scale: [0.8, 1.7, 0.8], opacity: [0.0, 0.18, 0.0] }}
		transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay }}
	  />
	  <motion.circle
		r={3.6}
		fill={accent}
		initial={{ scale: 0.6, opacity: 0 }}
		animate={{ scale: 1, opacity: 0.95 }}
		transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay }}
	  />
	</g>
  );
}