const IMAGES = [
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-01.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879560&s=086ab8a578db90a897ccb42465a7075b",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-02.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879561&s=dc1e49888250a4939aac294b63fcceea",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-03.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879561&s=47245c8a50622ce01819ed9d1481153f",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-04.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879562&s=fbfefc6eee114f91ad6ccd58477b8feb",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-05.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879563&s=2a6b546b9601c21efb677c51bf39e4d2",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-06.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879564&s=0ac91ce79fa486fe66c5e79d30670d88",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-07.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879565&s=9a28f44510dc21fadd9449f4b328500c",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-08.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879566&s=eedecd5320ec481c45f2185416773346",
  "https://images.okaydev.co/production/uploads/articles/building-an-infinite-animated-grid-no-webgl-needed/okay-creature-09.jpg?w=1024&h=1024&auto=compress%2Cformat&fit=min&dm=1770879566&s=f60b32386d814a8df539b22f930f23c4",
];

const CONFIG = {
  COLS: 3,
  ROWS: 3,
  easingFactor: 0.1,
  rotationStrength: 0.1,
  rotationEasing: 0.06,
  scaleEasing: 0.08,
  maxScaleEffect: 0.2,
  tileOverscan: 1,
};

const imageFor = (baseX, baseY) => {
  const i = (baseX + baseY * CONFIG.COLS) % IMAGES.length;
  return IMAGES[(i + IMAGES.length) % IMAGES.length];
};

const state = {
  gridItems: [],
  cameraOffset: { x: 0, y: 0 },
  targetOffset: { x: 0, y: 0 },
  isDragging: false,
  previousMousePosition: { x: 0, y: 0 },
  touchStart: null,
  containerRotationX: 0,
  containerRotationY: 0,
  targetRotationX: 0,
  targetRotationY: 0,
  containerScale: 1,
  targetScale: 1,
  scrollSpeed: 0,
};

const viewport = document.getElementById("viewport");
const container = document.getElementById("container");
const grid = document.getElementById("grid");

let cellWidth = 0;
let cellHeight = 0;

let tilesX = 1;
let tilesY = 1;

const calculateCellSizeAndTiling = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const minScale = 1 - CONFIG.maxScaleEffect;

  const requiredCoverFactor = 1 / minScale;

  const size =
    Math.max(vw / CONFIG.COLS, vh / CONFIG.ROWS) * requiredCoverFactor;

  cellWidth = size;
  cellHeight = size;

  const totalWidth = cellWidth * CONFIG.COLS;
  const totalHeight = cellHeight * CONFIG.ROWS;

  const neededTilesX = Math.ceil((vw * requiredCoverFactor) / totalWidth);
  const neededTilesY = Math.ceil((vh * requiredCoverFactor) / totalHeight);

  tilesX = Math.max(1, neededTilesX + CONFIG.tileOverscan);
  tilesY = Math.max(1, neededTilesY + CONFIG.tileOverscan);
};

const createGridItems = () => {
  grid.innerHTML = "";
  state.gridItems = [];

  for (let tileY = -tilesY; tileY <= tilesY; tileY++) {
    for (let tileX = -tilesX; tileX <= tilesX; tileX++) {
      for (let y = 0; y < CONFIG.ROWS; y++) {
        for (let x = 0; x < CONFIG.COLS; x++) {
          const element = document.createElement("div");
          element.className = "grid-item";

          element.style.width = `${cellWidth}px`;
          element.style.height = `${cellHeight}px`;

          const baseX = x;
          const baseY = y;
          const yOffset = x * cellHeight * 0.15;

          const src = imageFor(baseX, baseY);
          element.innerHTML = `<img src="${src}" alt="Creature ${baseX}, ${baseY}" loading="lazy" decoding="async">`;

          grid.appendChild(element);

          state.gridItems.push({
            element,
            baseX,
            baseY,
            tileX,
            tileY,
            yOffset,
          });
        }
      }
    }
  }
};

const updateItemPositions = () => {
  const totalWidth = cellWidth * CONFIG.COLS;
  const totalHeight = cellHeight * CONFIG.ROWS;

  state.gridItems.forEach(
    ({ element, baseX, baseY, tileX, tileY, yOffset }) => {
      const baseOffsetX = state.cameraOffset.x % totalWidth;
      const baseOffsetY = state.cameraOffset.y % totalHeight;

      const x = baseX * cellWidth + tileX * totalWidth - baseOffsetX;
      const y =
        baseY * cellHeight + tileY * totalHeight - baseOffsetY + yOffset;

      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
  );
};

const onMouseDown = (e) => {
  state.isDragging = true;
  viewport.classList.add("grabbing");
  state.previousMousePosition = { x: e.clientX, y: e.clientY };
};

const onMouseMove = (e) => {
  if (!state.isDragging) return;

  const deltaX = e.clientX - state.previousMousePosition.x;
  const deltaY = e.clientY - state.previousMousePosition.y;

  state.targetOffset.x -= deltaX;
  state.targetOffset.y -= deltaY;

  state.scrollSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  state.targetRotationY = deltaX * CONFIG.rotationStrength;
  state.targetRotationX = -deltaY * CONFIG.rotationStrength;

  state.previousMousePosition = { x: e.clientX, y: e.clientY };
};

const onMouseUp = () => {
  state.isDragging = false;
  viewport.classList.remove("grabbing");
  state.targetRotationX = 0;
  state.targetRotationY = 0;
};

const onTouchStart = (e) => {
  if (e.touches.length === 1) {
    state.touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
};

const onTouchMove = (e) => {
  if (e.touches.length === 1 && state.touchStart) {
    e.preventDefault();
    const deltaX = e.touches[0].clientX - state.touchStart.x;
    const deltaY = e.touches[0].clientY - state.touchStart.y;

    state.targetOffset.x -= deltaX;
    state.targetOffset.y -= deltaY;

    state.scrollSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    state.targetRotationY = deltaX * CONFIG.rotationStrength;
    state.targetRotationX = -deltaY * CONFIG.rotationStrength;

    state.touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
};

const onTouchEnd = () => {
  state.touchStart = null;
  state.targetRotationX = 0;
  state.targetRotationY = 0;
};

const onWheel = (e) => {
  e.preventDefault();
  state.targetOffset.x += e.deltaX;
  state.targetOffset.y += e.deltaY;

  state.scrollSpeed = Math.sqrt(e.deltaX * e.deltaX + e.deltaY * e.deltaY);

  state.targetRotationY = e.deltaX * CONFIG.rotationStrength * 0.5;
  state.targetRotationX = -e.deltaY * CONFIG.rotationStrength * 0.5;
};

const onWindowResize = () => {
  calculateCellSizeAndTiling();
  createGridItems();
  updateItemPositions();
};

const animate = () => {
  requestAnimationFrame(animate);

  const dx = state.targetOffset.x - state.cameraOffset.x;
  const dy = state.targetOffset.y - state.cameraOffset.y;

  if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
    state.cameraOffset.x += dx * CONFIG.easingFactor;
    state.cameraOffset.y += dy * CONFIG.easingFactor;
    updateItemPositions();
  }

  const speedFactor = Math.min(state.scrollSpeed * 0.01, 1);
  state.targetScale = 1 - speedFactor * CONFIG.maxScaleEffect;
  state.scrollSpeed *= 0.85;

  state.containerScale +=
    (state.targetScale - state.containerScale) * CONFIG.scaleEasing;
  state.containerRotationX +=
    (state.targetRotationX - state.containerRotationX) * CONFIG.rotationEasing;
  state.containerRotationY +=
    (state.targetRotationY - state.containerRotationY) * CONFIG.rotationEasing;

  container.style.transform = `scale(${state.containerScale}) skewY(${state.containerRotationX}deg) skewX(${state.containerRotationY}deg)`;
};

const init = () => {
  calculateCellSizeAndTiling();
  createGridItems();
  updateItemPositions();

  container.parentElement.style.perspective = "1000px";

  viewport.addEventListener("mousedown", onMouseDown);
  viewport.addEventListener("mousemove", onMouseMove);
  viewport.addEventListener("mouseup", onMouseUp);
  viewport.addEventListener("mouseleave", onMouseUp);
  viewport.addEventListener("wheel", onWheel, { passive: false });
  viewport.addEventListener("touchstart", onTouchStart);
  viewport.addEventListener("touchmove", onTouchMove, { passive: false });
  viewport.addEventListener("touchend", onTouchEnd);
  window.addEventListener("resize", onWindowResize);

  animate();
};

init();
