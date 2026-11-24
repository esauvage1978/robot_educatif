---
layout: ../../layouts/EnPost.astro
title: "Arduino robot kit for kids: how to choose (2026)"
description: "ELEGOO Smart Robot Car V4.0 on Amazon.com (around £70–80), Penguin Bot, age and first Arduino IDE steps. UK prices, not a converted euro price."
updated: "16 November 2026"
---

An Arduino robot kit is a box of parts: a controller board, motors, sensors, a chassis and wires. Your child builds it, then programs it in C/C++ with the free [Arduino IDE](https://www.arduino.cc/en/software). It is a step on from a block-based robot such as the mBot. There is more wiring and more typing, and those are the skills that carry over to other electronics.

This page is for parents and teachers choosing a kit for a child of at least 12, or for a keen teenager. For a first car, the ELEGOO Smart Robot Car V4.0 is the kit here: typically **under about £80** on Amazon.com — check the current price on Amazon. ELEGOO rates it 13+. The Penguin Bot is the smaller biped, from about 8 with an adult nearby. That UK listing had no price on the same check. Prices in euros from a French shop are not used here.

## What is usually in the box

A complete kit has an Arduino UNO-compatible board, DC motors, a motor driver, and sensors. Distance is often ultrasonic. Line following is common. Some boxes add an infrared remote or a camera. You also get a battery pack, a chassis, wheels, cables and screws. Dupont wires and a breadboard, or a board that is already soldered, are part of the same idea. LEDs, a buzzer and a Bluetooth module show up often.

The gain is that the child can see what each wire does, change the code and the hardware, and reuse the board later. Forums, tutorials and free libraries are easy to find, and a lot of the useful ones are in English. The cost is time. Someone has to read a datasheet, sort out plus, minus, 5 V, ground and pin numbers, and sit through the first compile errors. The box does not look like a finished toy.

## Two ELEGOO kits

![ELEGOO Smart Robot Car Kit V4.0: black chassis, ultrasonic sensor and a camera module on top](/images/products/elegoo-robot-car.webp)

[ELEGOO](/en/elegoo-brand/) rates the [Smart Robot Car V4.0](https://www.elegoo.com/products/elegoo-smart-robot-car-kit-v-4-0) as 13+ on the manufacturer page, checked 21 October 2026. On Amazon.com the listing we checked is a different age line: the title says 8+. Read the age on the box you are about to buy. The same UK listing, [ELEGOO Smart Robot Car Kit V4.0](https://www.amazon.com/dp/B07474MMB5?tag=roboteducatif-20) is typically **under about £80** — check today's price on Amazon.com. The title names an UNO R3 board, line tracking, an ultrasonic sensor and an infrared module. It does not name a camera. The manufacturer kit in the photo has a camera module on the chassis. If a camera is the reason for the purchase, confirm it on the product page that day. There is no US or Canadian price in our checks. See today's price on the shop for that country.

The smaller kit in this guide is the ELEGOO Penguin Bot, a biped that walks, plays sounds and responds to an infrared remote. A program is already loaded, and servos are the moving parts. It is a first Arduino project from about 8 with an adult nearby, or from about 10 with some independence. It does not include the richer sensors of the car. Extra modules come later, and this page does not add them up into a yearly budget. The Amazon.com listing had no price on 16 November 2026. [See the Penguin Bot listing](https://www.amazon.com/dp/B07GVD6GQH?tag=roboteducatif-20) and check today's price. The same applies in the US and in Canada.

## Is it the right age?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Age (guide only)</th>
<th scope="col">Recommendation</th>
</tr></thead><tbody>
<tr>
<td data-label="Age (guide only)"><span class="td-val">8–10</span></td>
<td data-label="Recommendation"><span class="td-val">Penguin Bot with an adult nearby, or a block robot: <a href="/en/best-robot-for-an-8-year-old/">robot for an 8-year-old</a></span></td>
</tr>
<tr>
<td data-label="Age (guide only)"><span class="td-val">10–12</span></td>
<td data-label="Recommendation"><span class="td-val">Penguin Bot with some independence, or the car kit with help. <a href="/en/best-robot-for-a-10-year-old/">Robot for a 10-year-old</a></span></td>
</tr>
<tr>
<td data-label="Age (guide only)"><span class="td-val">12–14</span></td>
<td data-label="Recommendation"><span class="td-val">ELEGOO car with growing independence. <a href="/en/best-robot-for-a-12-year-old/">Robot for a 12-year-old</a></span></td>
</tr>
<tr>
<td data-label="Age (guide only)"><span class="td-val">14+</span></td>
<td data-label="Recommendation"><span class="td-val">Car kit, then more sensors. <a href="/en/best-robot-for-a-14-year-old/">Robot for a 14-year-old</a> and <a href="/en/osoyoo-sport-car-v1-unboxing/">OSOYOO Sport Car</a></span></td>
</tr>
</tbody>
</table>
</div>

Twelve is the age where C/C++ is a fair start. Ten can work with an adult beside the child. Under that, the Penguin Bot is the Arduino option on this page, and a block robot is usually kinder. Prior programming is not required. The kits ship with examples. The child does have to read, try, and fix.

A clear PDF or a video, plus downloadable example code, matters more than a long sensor list. A genuine UNO-compatible board lets you reuse sensors from another kit later. Check that motors and sensors are sold on their own before you rely on the box for several years. The same board can leave the car and become a weather station or a small home project, and a class can share the modules.

The first projects are short. Make the robot drive, stop before a wall with the ultrasonic sensor, follow a black line, or drive it from the infrared remote. A longer sitting can combine sensors to cross a room, show a message on an LCD, sound an alarm when something moves, or steer toward a light. Wi-Fi control from a phone, a camera that notices a colour, a balancing gyro, or a servo arm come after that, and only if the parts are actually in the box or bought separately.

In the first month or two the child meets digital outputs, analog reads, loops and conditions. A project with several sensors, done without someone typing for them, is more like three to six months. Wi-Fi and multi-file sketches are often a year of occasional evenings. Those are ranges, not a timetable.

## Arduino, mBot, Raspberry Pi, LEGO

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Arduino car kit</th>
<th scope="col">Makeblock mBot</th>
<th scope="col">Raspberry Pi</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Main use</span></td>
<td data-label="Arduino car kit"><span class="td-val">robotics, real-time sensors</span></td>
<td data-label="Makeblock mBot"><span class="td-val">first robot, school</span></td>
<td data-label="Raspberry Pi"><span class="td-val">small computer, server, AI</span></td>
</tr>
<tr>
<td><span class="td-val">Programming</span></td>
<td data-label="Arduino car kit"><span class="td-val">C/C++ in Arduino IDE</span></td>
<td data-label="Makeblock mBot"><span class="td-val">blocks (mBlock), then Arduino</span></td>
<td data-label="Raspberry Pi"><span class="td-val">Python, Scratch, C++ and more</span></td>
</tr>
<tr>
<td><span class="td-val">Getting started</span></td>
<td data-label="Arduino car kit"><span class="td-val">plug in USB and upload</span></td>
<td data-label="Makeblock mBot"><span class="td-val">Bluetooth or USB with mBlock</span></td>
<td data-label="Raspberry Pi"><span class="td-val">install an OS, needs screen or SSH</span></td>
</tr>
<tr>
<td><span class="td-val">Assembly</span></td>
<td data-label="Arduino car kit"><span class="td-val">more technical</span></td>
<td data-label="Makeblock mBot"><span class="td-val">mechanical build, then mBlock</span></td>
<td data-label="Raspberry Pi"><span class="td-val">depends on the kit</span></td>
</tr>
</tbody>
</table>
</div>

From about 8, start with a block robot. The [programmable robot guide](/en/best-programmable-robot-for-kids/) compares those. From about 12, if the point is the electronics, the Arduino car is the better tool. A Raspberry Pi is the other path: a small computer for a server, an old-games project or an AI experiment, after an operating system is installed. Boards are compared in [Raspberry Pi 3 vs 4 vs 5](/en/raspberry-pi-3-vs-4-vs-5/).

LEGO Mindstorms and Spike stay inside the LEGO system, program in Scratch or, for Spike, Python, and survive knocks better than a hobby chassis. They fit primary school and a club. Arduino uses ordinary sensors and fits secondary school and a teenager who wants to leave the boxed set. As an order of magnitude for this choice, a typical Arduino board draws about 50 mA and a Raspberry Pi about 1 to 3 A. That is why USB from a laptop often lights the board and still cannot turn the motors.

Most UNO-compatible sensors work across UNO-compatible boards, so parts from two kits can be mixed. A car kit also fits a school session of about two hours if the build is not being discovered that same hour.

## Where to buy

Makers' stores and large marketplaces sell these kits in the UK and the US. For loose parts, US-based [SparkFun's Arduino section](https://www.sparkfun.com/catalogsearch/result/?q=arduino&affiliate_code=WRBz4h1uMN) (affiliate link) sells sensors, boards and spares. [DFRobot](https://www.dfrobot.com/) ships internationally and sells chassis and sensors. The only checked price on this page is the Amazon.com car kit above. See today's price for any other shop.

## First steps

You need the kit, a Windows, Mac or Linux computer, the USB A-B cable that comes in the box, and rechargeable AA cells. Kits usually want four to six of them.

1. Install the Arduino IDE from arduino.cc.
2. Plug the board in by USB and select Arduino Uno and the port that appears.
3. Upload the Blink example. The onboard LED should toggle once a second. That is the check that the cable, the port and the board agree.
4. Build the robot from the kit guide. Do not force a part. Check battery and LED polarity. Try each stage before the next. Plan on one to three hours.
5. Open the kit's first example sketch and upload it. ELEGOO examples are often named `01-Forward`, `02-Obstacle_Avoidance` and `03-Line_Tracking`. Turn the battery switch on before you decide the robot is dead.

Our free [Arduino C course](/en/arduino/) starts with [sketch structure and Serial](/en/arduino-c-sketch-structure-serial/), then [types and variables](/en/arduino-c-types-variables/), [conditions and sensors](/en/arduino-c-conditions-sensors/) and [functions](/en/arduino-c-functions-best-practices/).

## When it does not move

If the upload succeeded and the robot stays still, the cells are flat or inserted the wrong way, the power switch is off, or a motor is wired backwards. A multimeter settles the battery question. USB power alone often cannot drive the motors.

If the port never appears, try another USB cable. Some cables only charge. Then install the board's USB driver if the kit names one. CH340 and FTDI are the two you will see in the booklet.

A robot that spins in a circle has one motor reversed, or two motors that do not run at the same speed. Swap that motor's two wires, or trim the speeds in the sketch.

A sketch that will not compile is usually a missing library (AFMotor, Servo, NewPing) or a missing semicolon or brace. Install libraries from the IDE library manager.

After the car, a teenager can move to an ESP32 and sensors that talk to Home Assistant. Starting points are the [ESP32 project ideas](/en/smart-home/esp32-smart-home-project-ideas/) and the [ESPHome temperature sensor](/en/smart-home/esp32-esphome-temperature-sensor/).
