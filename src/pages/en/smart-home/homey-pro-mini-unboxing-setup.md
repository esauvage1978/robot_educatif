---
layout: ../../../layouts/EnPost.astro
title: "Homey Pro mini: unboxing and setup (part 1)"
description: "Homey Pro mini first impressions: box contents, ports, Ethernet wiring and step-by-step app setup. Ready in about 15 minutes."
updated: "17 November 2026"
---

*Also available in [French](/domotique/test-homey-pro-mini-deballage-installation/).*

*Review started 23 October 2026.*

The Homey Pro mini arrived this morning—Athom’s compact “brain” for Zigbee, Matter, Thread, Z-Wave, 433 MHz and IR without extra USB radios. Before pairing plugs and sensors, here is part one: what is in the box and how setup runs from unboxing to “All set!”.

<div class="article-toc" role="navigation" aria-label="On this page">
<p class="article-toc-title">On this page</p>
<ul>
<li><a href="#summary">Summary</a></li>
<li><a href="#unboxing">Unboxing</a></li>
<li><a href="#ports">Ports</a></li>
<li><a href="#setup">App setup</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

## Summary so far {#summary}

**What we liked**

- **Very guided setup:** about 15 minutes from cable to finished screen.
- Firmware update on first boot (roughly 4 minutes in our run).
- Built-in **Ethernet RJ45** and a flat network cable in the box.
- House layout (floors, rooms) during onboarding—less tidying later.
- Many radios offered when adding devices: 433 MHz, IR, Matter, Z-Wave, Zigbee.

**Limits so far**

- The optional Ethernet adapter bundled with our order is **useless on the mini**—it already has RJ45 (that adapter is for the full-size Homey Pro).
- No devices paired yet: range, speed and automations still to test—no score until part 2.

Context: [Home Assistant, Jeedom, Homey or voice hubs](/en/smart-home/home-assistant-jeedom-homey-which-hub/).

## Unboxing {#unboxing}

![Homey Pro mini retail box opened](/images/domotique/homey/homey-pro-mini-carton-v2.webp)

Black understated retail box. Inside:

1. Homey Pro mini unit  
2. Flat Ethernet cable  
3. USB-C cable  
4. Mains USB adapter  
5. Legal & safety leaflet with QR to [setup.homey.app](https://setup.homey.app)

![Homey Pro mini box contents](/images/domotique/homey/homey-pro-mini-contenu.webp)

The unit is a small matte black square with a front LED—easy to hide by the router.

![Top view of Homey Pro mini](/images/domotique/homey/homey-pro-mini-boitier-dessus.webp)

## Ports {#ports}

Rear: **Ethernet RJ45** and **USB-C** power only.

![Ethernet and USB-C ports on Homey Pro mini](/images/domotique/homey/homey-pro-mini-connectique.webp)

We wired Ethernet to a Netgear GS108 switch, then power. The LED went purple: ready to configure. Wi-Fi works, but cable is simpler for a fixed hub. Cross-check devices in our [compatibility matrix](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/).

## App setup (our run) {#setup}

1. Install Homey app (QR on leaflet).  
2. Create Homey account.  
3. Automatic **software update** (~4 min)—do not unplug.  
4. “Welcome home”—configure house.  
5. Number of levels (we chose 2).  
6. Pick levels and rooms (ground floor, first floor, etc.).  
7. Summary tree of rooms.  
8. **Thread network** permission.  
9. “All set!” (~12:25 in our session).  
10. Add device screen lists 433 MHz, IR, Matter, Z-Wave, Zigbee.

Total **~15 minutes**, plain language throughout.

Official product page: [Homey Pro mini](https://homey.app/homey-pro-mini/) (pricing on the maker’s site).

## FAQ {#faq}

### Need the Ethernet adapter on the mini?

No—RJ45 and cable are included. The adapter is for the large Homey Pro: [unboxing and setup](/en/smart-home/homey-pro-unboxing-setup/).

### How long is setup?

About 15 minutes in our run, including a firmware update.

### Which protocol first?

Depends on your devices: [Zigbee, Wi-Fi, Thread, Matter](/en/smart-home/smart-home-protocols-zigbee-wifi-thread-matter/). UK search: <a href="/go/az-gb-bfdc8ca423/" rel="sponsored nofollow noopener">Homey Pro mini on Amazon.com</a>.

## Next in the series

The mini is installed but controls nothing yet. Part 2 will pair Matter-on-Thread and Zigbee devices and build first flows (door-open light, alerts). Full verdict later on this page.

Meanwhile: [getting started](/en/smart-home/getting-started/) and [all smart-home guides](/en/smart-home/).

[All smart-home guides](/en/smart-home/)
