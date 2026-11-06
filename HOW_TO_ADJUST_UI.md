# Quick Manual: How to Adjust Size & Position

This guide shows you exactly which numbers to change in the code.
No fancy jargon — just plain instructions.

---

## 1. The Runner (Size & Position)

Open file: `src/animations/RunnerCanvasScrubber.jsx`

All the runner numbers are right at the very top of the file!

### IMPORTANT: Are you looking at Mobile or Desktop?
* If you are testing in a normal browser window on your computer screen, you are looking at **DESKTOP**.
* If you want to see the **MOBILE** layout, press `F12` in Chrome/Edge, click the **Mobile Device Toggle** icon (📱), or open the site on your phone.

---

### On Mobile (Phone Screen)
Look at lines 8–16 at the top of `RunnerCanvasScrubber.jsx`:

```javascript
export const MOBILE_RUNNER_CONFIG = {
  FIRST_FRAME_SIZE: 1.6, // Size at 0% scroll
  FIRST_FRAME_Y: 0,      // Pixels from top at 0% scroll
  LAST_FRAME_SIZE: 1.3,  // Runner size at end (100% scroll / SETTLED)
  LAST_FRAME_X: -20,     // Horizontal offset (negative moves left, positive moves right)
  LAST_FRAME_Y: -1,      // Vertical offset (negative moves up, positive moves down)
  HEIGHT_RATIO: 0.65,
};
```

* **Move the runner LEFT or RIGHT at the end:**
  Change `LAST_FRAME_X`:
  * Want it further to the **right**? Increase to `-10`, `10`, or `30`.
  * Want it further to the **left**? Decrease to `-30`, `-50`, or `-80`.
* **Move the runner UP or DOWN at the end:**
  Change `LAST_FRAME_Y`:
  * Want it **lower down**? Increase to `10`, `30`, or `50`.
  * Want it **higher up**? Decrease to `-10`, `-20`, or `-40`.
* **Runner size at the end:**
  Change `LAST_FRAME_SIZE` (e.g. `1.1` or `0.9` for smaller legs).

---

### On Desktop (Computer Screen at default 100% zoom)
Look at lines 20–29 at the top of `RunnerCanvasScrubber.jsx`:

```javascript
export const DESKTOP_RUNNER_CONFIG = {
  FIRST_FRAME_SIZE: 1.5, // Size at 0% scroll
  FIRST_FRAME_Y: 0,      // Pixels from top at 0% scroll
  LAST_FRAME_SIZE: 1.4,  // Runner size at end (100% scroll / SETTLED)
  LAST_FRAME_X: 290,     // Horizontal offset (290 matches Figma layout)
  LAST_FRAME_Y: 0,       // Vertical offset
  HEIGHT_RATIO: 0.72,
  MAX_HEIGHT: 750,
};
```

* **Move runner LEFT / RIGHT on desktop:** Change `LAST_FRAME_X` (e.g. `200` to go further left, `350` to go right).
* **Move runner UP / DOWN on desktop:** Change `LAST_FRAME_Y` (e.g. `20` to go down, `-20` to go up).
* **Runner size on desktop:** Change `LAST_FRAME_SIZE` (e.g. `1.2` for smaller, `1.5` for larger).

---

## 2. Text Layout (Last Frame / Settled)

Open file: `src/sections/HeroTransformationSection.jsx`

### 📱 On Mobile (Inside `MobileSettledView`, lines 330–360):

```jsx
{/* 1. TITLE: Change mb-[6px] for margin below title */}
<h1 className="... mb-[6px]">
  <span className="block">Run the</span>
  <span className="block">Vibe.</span>
</h1>

{/* 2. TAGLINE: Change mb-[14px] for margin below tagline */}
<p className="... mb-[14px]">
  Movement becomes music.
</p>

{/* 3. DESCRIPTION BOX / DIV: */}
{/* Change w-[150px] for box width, and mb-[20px] for margin below the box */}
<div className="w-[150px] mb-[20px]">
  <p className="font-sans ... text-[10px] ...">
    STRADIO is a movement music experience that turns every step
    into your soundtrack.
  </p>
</div>

{/* 4. BUTTON: */}
<div className="bg-[#0b0c0c] text-white px-1.5 py-1 rounded-[40px] ...">
  <span className="font-sans font-medium text-[7px] sm:text-[12px]">
    Get the App
  </span>
</div>
```

* **Margin below Title (between Title and Tagline):**
  Change `mb-[6px]` (e.g. `mb-[2px]` for very close, or `mb-[12px]` for wide).

* **Margin below Tagline (between Tagline and Description):**
  Change `mb-[14px]` (e.g. `mb-[8px]` for close, or `mb-[20px]` for wide).

* **Description Box / Div:**
  * **Box Width:** Change `w-[150px]` (e.g. `w-[130px]` for narrower, `w-[180px]` for wider).
  * **Margin below Description:** Change `mb-[20px]`.

---

### 💻 On Desktop (Inside `DesktopSettledView`, lines 165–200):

```jsx
{/* Main Hero Pitch (Right Column - 1:1 Figma Layout) */}
<div className="w-full max-w-[1920px] mx-auto flex-1 flex flex-col justify-center px-4 xl:px-8">
  <div className="ml-auto w-[52%] max-w-[480px] xl:max-w-[560px] flex flex-col gap-2 xl:gap-3.5">
```

* **Move text LEFT or RIGHT on desktop:**
  Change `w-[52%]`:
  * `w-[48%]` moves it **more right**.
  * `w-[56%]` moves it **more left**.

* **Headline "Run the Vibe." Font Size (Line 173):**
  ```jsx
  text-[54px] xl:text-[68px] 2xl:text-[72px]
  ```

* **Underline Gradient Bar Size (Line 180):**
  ```jsx
  w-[100px] xl:w-[140px] h-[3.5px] xl:h-[4.5px]
  ```

---

## 3. The 3 Feature Cards

Open file: `src/sections/HeroTransformationSection.jsx`

### 📱 On Mobile (Inside `MobileSettledView`, lines 375–435):

```jsx
{/* FEATURE CARDS ROW (All 3 cards together) */}
<div
  className="relative flex items-center justify-center gap-1.5 sm:gap-4 py-2 mb-[0px]"
  style={{ transform: "translateY(-100px)" }}
>
```

* **Move ALL 3 cards UP or DOWN:**
  Change `translateY(-100px)`:
  * Want them **higher (UP)**? Use a larger negative number: `translateY(-120px)`.
  * Want them **lower (DOWN)**? Use a smaller negative number: `translateY(-60px)` or `translateY(0px)`.
* **Push cards up away from the bottom bar:**
  Change `mb-[0px]` to `mb-[15px]` or `mb-[30px]`.

#### Move Each Card Individually:
Each card uses `MobileFeatureCard`:
```jsx
<MobileFeatureCard
  badge="01"
  title="Step Detection"
  subtitle="with precision"
  iconSrc="/assets/images/figma/figma_feature_shoe.svg"
  bgClass="bg-gradient-to-b from-[#ba617b] to-[#211d36]"
  badgeBgClass="bg-[#ba617b]"
  translateY="0px"
/>
```
Change `translateY="0px"` (e.g. `translateY("-10px")` to lift one card up).

---

### 💻 On Desktop (Inside `DesktopSettledView`, line 225):

```jsx
{/* 3 Product Benefits (Desktop) */}
<div
  className="flex items-center gap-4 xl:gap-7"
  style={{ transform: "translateX(400px) translateY(0px)" }}
>
```
* **Move Desktop cards LEFT or RIGHT:** Change `translateX(400px)`:
  * Want them further **RIGHT**? Increase to `450px`.
  * Want them further **LEFT**? Decrease to `350px` or `250px`.
* **Move Desktop cards UP or DOWN:** Change `translateY(0px)`:
  * `translateY(-20px)` moves **UP**.
  * `translateY(20px)` moves **DOWN**.

---

## 4. Navbar Size & Floating Glass Island

Open file: `src/components/Navbar.jsx`

* **Navbar Total Width:** Line 77, change `max-w-[1100px]`.
* **Navbar Height / Thickness:** Line 95, change `py-2 lg:py-2.5`.
* **Logo Size on Desktop:** Line 117, change `lg:w-[28px] lg:h-[36px]`.
* **"Download App" Button Size:** Line 159, change `lg:h-[34px] lg:px-5 lg:text-[12px]`.
* **Navigation Links Font & Gap:** Line 128, change `gap-6 xl:gap-8` and `text-[12px] xl:text-[13px]`.
* **When the glass appears:** Line 9, `const GLASS_SCROLL_POINT = 1.0;`.
* **Space from Top of Screen:** Line 66, change `top-3 sm:top-4`.

---

## 5. Music Player Button (Phone & Desktop)

Open file: `src/components/AudioVibePlayer.jsx`

* **📱 On Phone Screen:** Look at line 75:
  ```jsx
  <div className="sm:hidden fixed bottom-3 right-3 z-40">
  ```
  * Change `bottom-3 right-3` to move it anywhere on your phone.

* **💻 On Desktop:** Look at line 70:
  ```jsx
  <div className="hidden sm:block fixed bottom-6 right-8 z-40">
  ```

---

## 6. Edge-to-Edge Fluid Wave (Music Sensor Section)

Open file: `src/sections/MusicSensorSection.jsx`

Look at `EdgeToEdgeFluidWave` (lines 280–295):
```jsx
<div
  className="w-full min-w-full relative flex items-end mt-10 sm:mt-14 pointer-events-none select-none overflow-hidden"
  style={{ transform: "translateX(0px) translateY(0px)" }}
>
  <img
    src="/assets/images/custom_design_footer.png"
    alt="STRADIO Fluid Wave"
    className="w-full min-w-full h-auto object-cover object-top block"
  />
</div>
```

* **100% Edge-to-Edge:** Spans the entire screen from 0px on the left to the right edge with zero gap.
* **Move Up or Down:** Change `translateY(0px)`:
  * `translateY(-40px)` moves UP.
  * `translateY(40px)` moves DOWN.
* **Move Left or Right:** Change `translateX(0px)`.
* **Space from Content Above:** Change `mt-10 sm:mt-14`.

---

## 7. How to Test Your Changes Live

In your terminal, inside the `stradio_web` folder:
```bash
npm run dev
```
Open your browser at:
* Regular scroll mode: `http://localhost:5173`
* Jump straight to settled frame (100% scroll): `http://localhost:5173/?scroll=1`

Any time you save a file, the browser updates instantly!
