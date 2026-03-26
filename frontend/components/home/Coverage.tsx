import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPinned, ShieldEllipsis, Wrench } from "lucide-react";

type CoverageStreet = {
  id: string;
  title: string;
  houses: string[];
  lat: number;
  lng: number;
  mapAlias?: string;
};

type LeafletLatLng = [number, number];

interface LeafletPopupOptions {
  maxWidth?: number;
}

interface LeafletTileLayer {
  addTo(map: LeafletMap): void;
}

interface LeafletDivIcon {}

interface LeafletMarker {
  addTo(map: LeafletMap): LeafletMarker;
  bindPopup(content: string, options?: LeafletPopupOptions): LeafletMarker;
  on(event: "click", handler: () => void): LeafletMarker;
  openPopup(): LeafletMarker;
  setZIndexOffset(offset: number): LeafletMarker;
}

interface LeafletBounds {}

interface LeafletMap {
  fitBounds(bounds: LeafletBounds, options?: { padding?: LeafletLatLng }): void;
  remove(): void;
  setView(
    center: LeafletLatLng,
    zoom: number,
    options?: { animate?: boolean },
  ): void;
}

interface LeafletGlobal {
  divIcon(options: {
    className?: string;
    html: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
  }): LeafletDivIcon;
  latLngBounds(points: LeafletLatLng[]): LeafletBounds;
  map(
    element: HTMLElement,
    options?: {
      scrollWheelZoom?: boolean;
      zoomControl?: boolean;
    },
  ): LeafletMap;
  marker(
    latLng: LeafletLatLng,
    options?: {
      icon?: LeafletDivIcon;
    },
  ): LeafletMarker;
  tileLayer(
    urlTemplate: string,
    options?: {
      attribution?: string;
      maxZoom?: number;
    },
  ): LeafletTileLayer;
}

declare global {
  interface Window {
    L?: LeafletGlobal;
    __leafletPromise?: Promise<LeafletGlobal>;
  }
}

const LEAFLET_CSS_ID = "coverage-leaflet-styles";
const LEAFLET_SCRIPT_ID = "coverage-leaflet-script";
const MAP_MARKER_CLASSNAME = "!border-0 !bg-transparent";
const MAP_MARKER_PIN_CLASSNAME =
  "relative inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-secondary bg-[radial-gradient(circle_at_30%_30%,oklch(100%_0_0_/_0.08),transparent_40%),linear-gradient(180deg,var(--bg-light),var(--bg))] text-text text-[0.8125rem] font-bold shadow-[0_14px_28px_oklch(0%_0_0_/_0.28),inset_0_1px_0_oklch(100%_0_0_/_0.06)] before:absolute before:inset-[7px] before:rounded-full before:bg-secondary/25 before:content-['']";
const MAP_POPUP_WRAPPER_CLASSNAME = "max-w-[18rem] bg-transparent px-4 py-3.5";
const MAP_POPUP_EYEBROW_CLASSNAME =
  "m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted";
const MAP_POPUP_TITLE_CLASSNAME =
  "m-0 mt-2 text-base font-semibold leading-[1.35] text-text";
const MAP_POPUP_META_CLASSNAME =
  "m-0 mt-2 text-xs leading-[1.45] text-text-muted";
const MAP_POPUP_TEXT_CLASSNAME = "m-0 mt-3 text-sm leading-6 text-text";
const MAP_CONTAINER_CLASSNAME = [
  "h-[400px] w-full lg:h-[520px]",
  "bg-[radial-gradient(circle_at_top_right,oklch(0.78_0.19_67_/_0.14),transparent_26%),linear-gradient(180deg,oklch(0.18_0_0),oklch(0.12_0_0))]",
  "[&_.leaflet-control-zoom_a]:!border-border",
  "[&_.leaflet-control-zoom_a]:!bg-foreground",
  "[&_.leaflet-control-zoom_a]:!text-text",
  "[&_.leaflet-control-attribution]:!bg-[oklch(0.12_0_0_/_0.8)]",
  "[&_.leaflet-control-attribution]:!text-text-muted",
  "[&_.leaflet-control-attribution_a]:!text-text",
  "[&_.leaflet-popup-content-wrapper]:!rounded-[1.75rem]",
  "[&_.leaflet-popup-content-wrapper]:!border",
  "[&_.leaflet-popup-content-wrapper]:!border-secondary",
  "[&_.leaflet-popup-content-wrapper]:!bg-foreground",
  "[&_.leaflet-popup-content-wrapper]:!text-text",
  "[&_.leaflet-popup-content-wrapper]:!shadow-[0_18px_40px_oklch(0%_0_0_/_0.34),inset_0_1px_0_oklch(100%_0_0_/_0.05)]",
  "[&_.leaflet-popup-tip]:!bg-foreground",
  "[&_.leaflet-popup-tip]:!shadow-[0_18px_24px_oklch(0%_0_0_/_0.18)]",
  "[&_.leaflet-popup-close-button]:!text-text-muted",
  "[&_.leaflet-popup-close-button]:!top-3",
  "[&_.leaflet-popup-close-button]:!right-3",
  "[&_.leaflet-popup-close-button]:!p-0",
  "[&_.leaflet-popup-content]:!m-0",
].join(" ");

const coverageStreets: CoverageStreet[] = [
  {
    id: "vasylkivska",
    title: "Васильківська вул.",
    houses: [
      "2А",
      "4",
      "6",
      "8",
      "8А",
      "5/7",
      "7/7",
      "9/14",
      "11/11",
      "13",
      "15/14",
      "27",
      "29",
      "47/1",
      "47/3",
      "49/1",
      "49/2",
      "49/3",
    ],
    lat: 50.3938386,
    lng: 30.4930576,
  },
  {
    id: "demiivska",
    title: "Деміївська вул.",
    houses: ["35", "39", "45", "45А", "47", "51", "55"],
    lat: 50.3996984,
    lng: 30.5073336,
  },
  {
    id: "holosiivskyi-prospect",
    title: "Голосіївський просп.",
    houses: [
      "74А",
      "88",
      "90",
      "92/1",
      "94/1",
      "96",
      "98/2",
      "100",
      "100/2",
      "102/1",
      "104",
      "106/2",
      "108/1",
      "108/1А",
      "108/2",
      "108/3",
      "110",
      "120/2",
      "120/3",
      "122/2",
      "122/3",
    ],
    lat: 50.389704,
    lng: 30.497969,
  },
  {
    id: "marychanska",
    title: "Маричанська вул.",
    houses: ["5", "5В", "6", "8", "9", "10", "11/8", "13"],
    lat: 50.3925529,
    lng: 30.5009428,
  },
  {
    id: "yulii-zdanovskoi",
    title: "Юлії Здановської вул.",
    houses: [
      "5/1",
      "7",
      "8",
      "8Б",
      "19",
      "21/14",
      "22/15",
      "24",
      "26",
      "27",
      "29",
      "31/1/2",
      "32",
      "34Б",
    ],
    lat: 50.3915048,
    lng: 30.4901859,
  },
  {
    id: "kolomyiskyi",
    title: "Коломийський пров.",
    houses: ["3/1", "10", "12", "13/23", "17/25", "20"],
    lat: 50.3909751,
    lng: 30.4934273,
  },
  {
    id: "burmistenka",
    title: "Бурмістенка вул.",
    houses: ["6", "8/9", "10", "12"],
    lat: 50.3929178,
    lng: 30.4977266,
    mapAlias: "Оріхуватська вул.",
  },
  {
    id: "dubinina",
    title: "Дубініна вул.",
    houses: ["16"],
    lat: 50.3937862,
    lng: 30.496132,
    mapAlias: "Рея Бредбері вул.",
  },
  {
    id: "zadorozhnyi",
    title: "Задорожний пров.",
    houses: ["3 к.1-3", "5 к.1-2", "6"],
    lat: 50.3954691,
    lng: 30.5051101,
  },
  {
    id: "stelmakha",
    title: "Стельмаха вул.",
    houses: ["9", "10"],
    lat: 50.3946822,
    lng: 30.5034204,
  },
  {
    id: "zhukovskoho",
    title: "Жуковського пров.",
    houses: ["10", "13/16", "14", "15", "17/25"],
    lat: 50.3933164,
    lng: 30.49488,
    mapAlias: "пров. Леопольда Ященка",
  },
  {
    id: "maksymovycha",
    title: "Максимовича вул.",
    houses: ["3Г", "3Д", "3Е"],
    lat: 50.3916824,
    lng: 30.4800426,
  },
  {
    id: "sechenova",
    title: "Сеченова вул.",
    houses: ["3", "4", "5", "10/1/2/3"],
    lat: 50.3891134,
    lng: 30.4918301,
    mapAlias: "Зої Бутенко вул.",
  },
];

const coverageStats = [
  {
    value: `${coverageStreets.reduce((count, street) => count + street.houses.length, 0)}`,
    label: "будинків уже в зоні підключення",
  },
  {
    value: `${coverageStreets.length}`,
    label: "вулиць і провулків на карті",
  },
  {
    value: "Київ",
    label: "Голосіївський район",
  },
];

const steps = [
  {
    icon: MapPinned,
    title: "1. Звіряємо будинок з картою",
    text: "Одразу бачимо, чи входить ваша вулиця в зону покриття, і уточнюємо конкретний номер будинку.",
  },
  {
    icon: Wrench,
    title: "2. Домовляємось про візит",
    text: "Погоджуємо зручний час і приїжджаємо з усім потрібним для монтажу та первинного налаштування.",
  },
  {
    icon: ShieldEllipsis,
    title: "3. Підключаємо без зайвих кроків",
    text: "Запускаємо інтернет, перевіряємо швидкість і залишаємо прямий контакт підтримки на випадок питань.",
  },
];

function ensureLeafletStylesheet() {
  if (document.getElementById(LEAFLET_CSS_ID)) {
    return;
  }

  const stylesheet = document.createElement("link");
  stylesheet.id = LEAFLET_CSS_ID;
  stylesheet.rel = "stylesheet";
  stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.append(stylesheet);
}

function loadLeaflet(): Promise<LeafletGlobal> {
  ensureLeafletStylesheet();

  if (window.L) {
    return Promise.resolve(window.L);
  }

  if (window.__leafletPromise) {
    return window.__leafletPromise;
  }

  window.__leafletPromise = new Promise<LeafletGlobal>((resolve, reject) => {
    const handleLoad = () => {
      if (window.L) {
        resolve(window.L);
        return;
      }

      window.__leafletPromise = undefined;
      reject(new Error("Leaflet did not initialize correctly."));
    };

    const handleError = () => {
      window.__leafletPromise = undefined;
      reject(new Error("Leaflet assets failed to load."));
    };

    const existingScript = document.getElementById(
      LEAFLET_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = LEAFLET_SCRIPT_ID;
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.body.append(script);
  });

  return window.__leafletPromise;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createPopupMarkup(street: CoverageStreet) {
  const aliasNote = street.mapAlias
    ? `<p class="${MAP_POPUP_META_CLASSNAME}">На міській мапі може відображатися як ${escapeHtml(street.mapAlias)}</p>`
    : "";

  return `
    <div class="${MAP_POPUP_WRAPPER_CLASSNAME}">
      <p class="${MAP_POPUP_EYEBROW_CLASSNAME}">Покриття</p>
      <h3 class="${MAP_POPUP_TITLE_CLASSNAME}">${escapeHtml(street.title)}</h3>
      ${aliasNote}
      <p class="${MAP_POPUP_TEXT_CLASSNAME}">${escapeHtml(street.houses.join(", "))}</p>
    </div>
  `;
}

export default function CoverageSection() {
  const [activeStreetId, setActiveStreetId] = useState<string | null>(null);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<Record<string, LeafletMarker>>({});

  useEffect(() => {
    let isCancelled = false;

    async function initializeMap() {
      if (!mapElementRef.current) {
        return;
      }

      try {
        const Leaflet = await loadLeaflet();

        if (isCancelled || !mapElementRef.current) {
          return;
        }

        const map = Leaflet.map(mapElementRef.current, {
          scrollWheelZoom: false,
        });

        mapRef.current = map;

        Leaflet.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19,
          },
        ).addTo(map);

        const markers: Record<string, LeafletMarker> = {};

        coverageStreets.forEach((street, index) => {
          const marker = Leaflet.marker([street.lat, street.lng], {
            icon: Leaflet.divIcon({
              className: MAP_MARKER_CLASSNAME,
              html: `<span class="${MAP_MARKER_PIN_CLASSNAME}">${index + 1}</span>`,
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              popupAnchor: [0, -24],
            }),
          })
            .addTo(map)
            .bindPopup(createPopupMarkup(street), {
              maxWidth: 300,
            });

          marker.on("click", () => {
            setActiveStreetId(street.id);
          });

          markers[street.id] = marker;
        });

        markerRefs.current = markers;

        map.fitBounds(
          Leaflet.latLngBounds(
            coverageStreets.map(
              (street): LeafletLatLng => [street.lat, street.lng],
            ),
          ),
          { padding: [24, 24] },
        );

        if (!isCancelled) {
          setMapStatus("ready");
        }
      } catch {
        if (!isCancelled) {
          setMapStatus("error");
        }
      }
    }

    initializeMap();

    return () => {
      isCancelled = true;
      markerRefs.current = {};
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapStatus !== "ready" || !activeStreetId || !mapRef.current) {
      return;
    }

    const selectedStreet = coverageStreets.find(
      (street) => street.id === activeStreetId,
    );

    if (!selectedStreet) {
      return;
    }

    Object.entries(markerRefs.current).forEach(([streetId, marker]) => {
      marker.setZIndexOffset(streetId === activeStreetId ? 400 : 0);
    });

    mapRef.current.setView([selectedStreet.lat, selectedStreet.lng], 16, {
      animate: true,
    });
    markerRefs.current[activeStreetId]?.openPopup();
  }, [activeStreetId, mapStatus]);

  return (
    <section id="coverage" className="border-border scroll-mt-28 border-b">
      <div className="px-5 py-16 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="grid gap-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="border-border bg-foreground rounded-[1.75rem] border p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="border-border/50 bg-secondary/50 text-text-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-text text-xl font-medium">
                        {step.title}
                      </h3>
                      <p className="text-text-muted leading-6">{step.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="border-border bg-foreground h-full rounded-3xl border p-5">
            <div>
              <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
                Покриття
              </p>
              <h2 className="text-text mt-4 text-3xl font-medium sm:text-4xl">
                Працюємо в Голосіївському районі Києва
              </h2>
              <p className="text-text-muted mt-4 max-w-3xl text-base leading-7">
                Підключаємо будинки на вказаних вулицях і швидко підкажемо, чи
                доступне підключення саме за вашою адресою. Нижче зібрали карту
                покриття та список будинків, які вже в роботі.
              </p>
            </div>

            <div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {coverageStats.map((item) => (
                  <div
                    key={item.label}
                    className="border-border/25 bg-secondary/25 rounded-3xl border px-4 py-3"
                  >
                    <p className="text-text text-lg font-medium">
                      {item.value}
                    </p>
                    <p className="text-text-muted mt-1 text-sm leading-5">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#support"
                  className="bg-text text-background hover:bg-highlight inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition"
                >
                  Перевірити свою адресу
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-border mt-6 rounded-4xl border p-5"
          style={{
            backgroundImage: "var(--gradient)",
            boxShadow: "var(--shadow)",
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
                Зона покриття
              </p>
              <h2 className="text-text mt-4 text-3xl font-medium sm:text-4xl">
                Перевірте, чи є ваш будинок у зоні підключення
              </h2>
              <p className="text-text-muted mt-4 text-base leading-7">
                Натисніть на мітку на мапі або виберіть вулицю у списку
                праворуч, щоб побачити конкретні будинки, які вже підключаємо в
                Голосіївському районі.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4">
              <div className="border-border bg-background relative z-0 isolate overflow-hidden rounded-[1.75rem] border">
                <div
                  ref={mapElementRef}
                  className={MAP_CONTAINER_CLASSNAME}
                  aria-label="Карта покриття 4Seasons у Голосіївському районі Києва"
                />

                {mapStatus !== "ready" ? (
                  <div className="bg-background/92 absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center backdrop-blur-sm">
                    <div className="border-border/50 bg-secondary/50 text-text-muted flex h-12 w-12 items-center justify-center rounded-2xl border">
                      <MapPinned className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-text text-lg font-medium">
                        {mapStatus === "loading"
                          ? "Завантажуємо карту покриття"
                          : "Не вдалося завантажити карту"}
                      </p>
                      <p className="text-text-muted text-sm leading-6">
                        {mapStatus === "loading"
                          ? "Мітки з адресами вже підготовлені і з'являться за мить."
                          : "Список будинків праворуч доступний, навіть якщо карта тимчасово не відкрилася."}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:max-h-130 lg:grid-cols-1 lg:overflow-y-auto lg:pr-1">
              {coverageStreets.map((street, index) => {
                const isActive = street.id === activeStreetId;

                return (
                  <button
                    key={street.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveStreetId(street.id)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      isActive
                        ? "border-highlight/70 bg-background"
                        : "border-border bg-secondary/25 hover:bg-secondary/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-text text-base font-medium">
                          {street.title}
                        </h3>
                        {street.mapAlias ? (
                          <p className="text-text-muted mt-1 text-xs leading-5">
                            На мапі може бути як {street.mapAlias}
                          </p>
                        ) : null}
                      </div>

                      <div className="border-border/50 bg-background text-text flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border text-sm font-medium">
                        {index + 1}
                      </div>
                    </div>

                    <p className="text-text-muted mt-3 text-sm leading-6">
                      {street.houses.join(", ")}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
