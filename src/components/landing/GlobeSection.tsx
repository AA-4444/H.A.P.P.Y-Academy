import { useEffect, useMemo, useRef } from "react";
import createGlobe from "cobe";
import { ArrowRight } from "lucide-react";

const BG_HEX = "#F7F3EE";

function hexToRgb01(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const BG_RGB = hexToRgb01(BG_HEX);
const ORANGE = hexToRgb01("#E64B1E");
const DARK = hexToRgb01("#1F1F1F");

// ✅ ЖЁЛТЫЙ ШАР (мягкий, не кислотный)
const GLOBE_YELLOW = hexToRgb01("#F7D36A"); // можешь поменять

const formatInt = (n: number) => n.toLocaleString("ru-RU");

function mulberry32(seed: number) {
  return function () {
	let t = (seed += 0x6d2b79f5);
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Marker = {
  location: [number, number];
  size: number;
  color?: [number, number, number];
};

const LAND_ANCHORS: Array<[number, number]> = [
  // North America
  [40.7128, -74.006],
  [34.0522, -118.2437],
  [41.8781, -87.6298],
  [29.7604, -95.3698],
  [49.2827, -123.1207],
  [45.5017, -73.5673],
  [19.4326, -99.1332],
  [14.6349, -90.5069],

  // South America
  [-23.5505, -46.6333],
  [-22.9068, -43.1729],
  [-34.6037, -58.3816],
  [-12.0464, -77.0428],
  [-33.4489, -70.6693],
  [4.711, -74.0721],

  // Europe
  [51.5074, -0.1278],
  [48.8566, 2.3522],
  [52.52, 13.405],
  [41.9028, 12.4964],
  [40.4168, -3.7038],
  [52.2297, 21.0122],
  [59.3293, 18.0686],
  [55.7558, 37.6173],
  [50.0755, 14.4378],
  [37.9838, 23.7275],

  // Africa
  [30.0444, 31.2357],
  [6.5244, 3.3792],
  [-1.2921, 36.8219],
  [-26.2041, 28.0473],
  [33.5731, -7.5898],
  [14.7167, -17.4677],
  [5.6037, -0.187],
  [9.0765, 7.3986],

  // Middle East / Asia
  [25.2048, 55.2708],
  [24.7136, 46.6753],
  [35.6892, 51.389],

  // South Asia
  [28.6139, 77.209],
  [19.076, 72.8777],
  [13.0827, 80.2707],
  [23.8103, 90.4125],
  [6.9271, 79.8612],
  [27.7172, 85.324],

  // East Asia
  [35.6762, 139.6503],
  [37.5665, 126.978],
  [31.2304, 121.4737],
  [39.9042, 116.4074],
  [22.3193, 114.1694],
  [25.033, 121.5654],

  // Southeast Asia
  [1.3521, 103.8198],
  [13.7563, 100.5018],
  [21.0285, 105.8542],
  [10.8231, 106.6297],
  [14.5995, 120.9842],
  [-6.2088, 106.8456],
  [3.139, 101.6869],

  // Oceania
  [-33.8688, 151.2093],
  [-37.8136, 144.9631],
  [-36.8485, 174.7633],
];

function buildManyMarkers(
  anchors: Array<[number, number]>,
  perAnchor: number,
  seed: number,
  orangeRatio: number
): Marker[] {
  const rand = mulberry32(seed);
  const out: Marker[] = [];

  const jitter = 2.6;

  for (const [lat, lon] of anchors) {
	for (let i = 0; i < perAnchor; i++) {
	  const dLat = (rand() - 0.5) * 2 * jitter;
	  const dLon = (rand() - 0.5) * 2 * jitter;

	  const big = rand() < 0.22;
	  const size = big ? 0.055 + rand() * 0.045 : 0.022 + rand() * 0.022;

	  out.push({
		location: [lat + dLat, lon + dLon],
		size,
	  });
	}
  }

  for (let i = out.length - 1; i > 0; i--) {
	const j = (rand() * (i + 1)) | 0;
	[out[i], out[j]] = [out[j], out[i]];
  }

  const orangeCount = Math.floor(out.length * orangeRatio);
  for (let i = 0; i < out.length; i++) {
	out[i].color = i < orangeCount ? ORANGE : DARK;
  }

  return out;
}

export default function GlobeSection() {
  const target = 1_000_000;
  const progress = 0.2;
  const achievedPeople = Math.round(target * progress);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const PER_ANCHOR = 180; // много точек
  const markers = useMemo(
	() => buildManyMarkers(LAND_ANCHORS, PER_ANCHOR, 1337420, progress),
	[]
  );

  useEffect(() => {
	const canvas = canvasRef.current;
	if (!canvas) return;

	const dpr = Math.min(2, window.devicePixelRatio || 1);

	let width = 1;
	let height = 1;

	const measure = () => {
	  const rect = canvas.getBoundingClientRect();
	  width = Math.max(1, Math.round(rect.width * dpr));
	  height = Math.max(1, Math.round(rect.height * dpr));
	};

	measure();
	const ro = new ResizeObserver(measure);
	ro.observe(canvas);

	let phi = 0;
	let theta = 0.25;

	// drag rotate
	let dragging = false;
	let lastX = 0;
	let lastY = 0;
	let velPhi = 0;

	const onDown = (e: PointerEvent) => {
	  dragging = true;
	  lastX = e.clientX;
	  lastY = e.clientY;
	  velPhi = 0;
	};

	const onMove = (e: PointerEvent) => {
	  if (!dragging) return;
	  const dx = e.clientX - lastX;
	  const dy = e.clientY - lastY;
	  lastX = e.clientX;
	  lastY = e.clientY;

	  phi += dx * 0.006;
	  theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, theta + dy * 0.003));
	  velPhi = dx * 0.0016;
	};

	const onUp = () => (dragging = false);

	canvas.addEventListener("pointerdown", onDown, { passive: true });
	window.addEventListener("pointermove", onMove, { passive: true });
	window.addEventListener("pointerup", onUp, { passive: true });

	const globe = createGlobe(canvas, {
	  devicePixelRatio: dpr,
	  width,
	  height,

	  phi,
	  theta,

	  dark: 0,
	  diffuse: 1.0,

	  // континенты (точечная карта) делаем темнее, чтобы читалась на жёлтом
	  mapSamples: 100000,
	  mapBrightness: 0.75,
	  mapBaseBrightness: 0.02,

	  // ✅ жёлтая база шара
	  baseColor: GLOBE_YELLOW,

	  // ✅ убираем ореол/свечение: цвет = фон секции
	  glowColor: BG_RGB,

	  markers,
	  markerColor: DARK,

	  // нормальный размер (не раздуваем)
	  scale: 1.0,
	  offset: [0, 0],
	  opacity: 1,

	  onRender: (state) => {
		state.width = width;
		state.height = height;

		velPhi *= 0.94;
		phi += 0.0028 + velPhi;

		state.phi = phi;
		state.theta = theta;
	  },
	});

	return () => {
	  globe.destroy();
	  ro.disconnect();
	  canvas.removeEventListener("pointerdown", onDown as any);
	  window.removeEventListener("pointermove", onMove as any);
	  window.removeEventListener("pointerup", onUp as any);
	};
  }, [markers]);

  return (
	<section id="million" style={{ background: BG_HEX }} className="py-20">
	  <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
		{/* ✅ делаем больше места справа и правим прижатие текста */}
		<div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
		  {/* LEFT */}
		  <div className="max-w-2xl">
			<div className="text-[11px] tracking-[0.22em] uppercase text-black/50">
			  MISSION / IMPACT
			</div>

			<h2 className="mt-4 font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
			  Цель — сделать{" "}
			  <span className="whitespace-nowrap">{formatInt(target)}</span> людей счастливее
			</h2>

			<p className="mt-6 font-sans text-black/70 text-base sm:text-lg leading-relaxed max-w-[60ch]">
			  <span className="font-semibold text-black">Оранжевые маркеры</span> — это прогресс:
			  {" "}
			  <span className="font-semibold text-black">{formatInt(achievedPeople)} людей</span>
			  {" "}({Math.round(progress * 100)}%).
			</p>

			<div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
			  <button
				type="button"
				className="h-12 px-8 rounded-full bg-black text-white hover:opacity-90 transition font-sans font-semibold inline-flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
			  >
				Присоединиться
				<ArrowRight className="h-5 w-5" />
			  </button>

			  <button
				type="button"
				className="h-12 px-8 rounded-full bg-white text-black border border-black/10 hover:bg-black/[0.03] transition font-sans font-semibold inline-flex items-center justify-center gap-2"
			  >
				Как это работает
				<ArrowRight className="h-5 w-5" />
			  </button>
			</div>
		  </div>

		  {/* RIGHT */}
		  <div className="relative flex justify-end lg:justify-end">
			{/* ✅ правее: на lg чуть сдвигаем ещё вправо */}
			<div
			  className="relative lg:translate-x-6"
			  style={{
				width: "min(44vw, 720px)",
				height: "min(44vw, 720px)",
				maxWidth: "720px",
				maxHeight: "720px",
				overflow: "visible",
			  }}
			>
			  <canvas
				ref={canvasRef}
				style={{
				  width: "100%",
				  height: "100%",
				  background: "transparent",
				  boxShadow: "none",
				  filter: "none",
				  outline: "none",
				  touchAction: "none",
				  display: "block",
				}}
			  />
			</div>
		  </div>
		</div>
	  </div>
	</section>
  );
}