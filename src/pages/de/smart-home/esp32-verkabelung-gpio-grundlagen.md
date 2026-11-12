---
layout: ../../../layouts/DePost.astro
title: "ESP32-Verkabelung: GPIO, 3,3 V, Pull-up"
description: "ESP32-C6 sicher verkabeln: 3,3 V, kritische Pins, Pull-up, LED-Widerstand, gemeinsame Masse und Test. Material, GPIO-Plan, ESPHome-YAML und Home Assistant."
updated: "30. Oktober 2026"
---

Eine ESP32-Platine, eine kleine Elektronikplatine mit WLAN, zu verdrahten, verlangt nur wenige einfache Regeln, doch das Ignorieren einer einzigen reicht, um einen Pin zu zerstören oder instabile Messwerte zu bekommen. Dieses Tutorial bündelt die Grundlagen für die [ESP32-Projekte dieser Seite](/de/smart-home/esp32-smart-home-projektideen/), mit dem ESP32-C6-DevKitC-1 als Referenzplatine. Sie lernen, was GPIOs sind, die metallenen Pins am Rand der Platine, wie Sie den richtigen auswählen und wie Sie einen Taster und eine LED gefahrlos anschließen.

**Erwartetes Ergebnis:** einen Pin wählen, Taster und LED gefahrlos anschließen und den Aufbau mit ESPHome testen können. **Dauer:** 30 Minuten. **Schwierigkeit:** Einsteiger.

## Regel 1: Die Pins arbeiten mit 3,3 V

Die GPIO-Pins des ESP32-C6 arbeiten mit **3,3 V** und vertragen keine 5 V. Den 5-V-Ausgang eines Sensors direkt an einen Eingang zu legen, kann ihn beschädigen. Zwei Lösungen: den Sensor mit 3,3 V versorgen, wenn er das akzeptiert, oder sein Signal mit einem **Pegelwandler** oder einem **Spannungsteiler** absenken (zwei Widerstände, etwa 10 kΩ und 20 kΩ, um von 5 V auf etwa 3,3 V zu kommen).

Jeder Pin liefert nur begrenzten Strom: Peilen Sie **höchstens etwa zehn Milliampere** an und überschreiten Sie nie die Werte des Espressif-Datenblatts. Für größere Lasten (Relais, LED-Streifen, Motor) ein dafür gebautes, getrennt versorgtes Modul mit **gemeinsamer Masse** zum Mikrocontroller verwenden.

## Welche Pins am ESP32-C6-DevKitC-1?

| Pins | Hinweis | Empfohlene Nutzung |
|---|---|---|
| GPIO0 bis GPIO3, GPIO6, GPIO7, GPIO10, GPIO11, GPIO18 bis GPIO23 | Beim Start frei | Eingänge, Ausgänge, I²C, UART |
| GPIO0 bis GPIO6 | Können eine Analogspannung lesen (ADC) | Analoge Sonden |
| GPIO4, GPIO5, GPIO8, GPIO9, GPIO15 | Konfigurationspins beim Start; GPIO8 steuert die RGB-LED der Platine, GPIO9 ist die BOOT-Taste | Meiden oder mit Vorsicht nutzen |
| GPIO12, GPIO13 | Native USB-Verbindung | Frei lassen |
| GPIO16, GPIO17 | Serielle Konsole (UART0) | Frei lassen |

Diese Liste folgt der Espressif-Dokumentation der Platine; bei einer anderen Platine (z. B. XIAO ESP32C6) prüfen, deren Pins andere Nummern tragen.

## Pull-up-Widerstände und Eingänge

Ein Eingang, der mit nichts verbunden ist, „schwebt“ und liest zufällige Werte. Ein **Pull-up-Widerstand** legt ihn auf einen bekannten Pegel. Der ESP32 hat interne Widerstände, die sich in ESPHome aktivieren lassen:

```yaml
binary_sensor:
  - platform: gpio
    name: "Testtaster"
    pin:
      number: GPIO10
      mode: INPUT_PULLUP      # High-Pegel im Ruhezustand
      inverted: true          # Drücken = ON
    filters:
      - delayed_on: 50ms      # Entprellung
      - delayed_off: 50ms
```

Der Taster liegt zwischen GPIO10 und GND: In Ruhe liest der Pin 3,3 V, gedrückt 0 V. Die internen Widerstände sind recht schwach; bei Kabeln über einige Meter einen externen 10-kΩ-Widerstand nach 3V3 ergänzen.

## Eine LED mit Vorwiderstand anschließen

Eine LED ohne Widerstand zieht zu viel Strom. Die Rechnung ist einfach: R = (3,3 V − LED-Spannung) ÷ gewünschter Strom. Für eine rote LED mit etwa 2 V bei 5 mA: (3,3 − 2) ÷ 0,005 = 260 Ω, also passt ein **330-Ω-Widerstand**. GPIO18 → Widerstand → Anode (langes Bein) → Kathode → GND.

```yaml
output:
  - platform: gpio
    pin: GPIO18
    id: led_out

light:
  - platform: binary
    name: "Test-LED"
    output: led_out
```

Diese beiden Ausschnitte wurden für diesen Artikel nicht auf einer Platine ausgeführt; sie folgen der Standardsyntax der ESPHome-Dokumentation.

## Weitere Regeln

- **Gemeinsame Masse:** Alle mit dem Mikrocontroller verbundenen Module müssen GND teilen, sonst haben Signale keine Referenz.
- **Polarität:** Vertauschtes + und − zerstört das Bauteil oft. Mit Aufdruck oder Datenblatt prüfen.
- **I²C-Bus:** SDA und SCL erhalten Pull-up-Widerstände (auf den meisten Modulen schon vorhanden); jedes Gerät hat eine Adresse. Die Option `scan: true` listet sie auf.
- **Induktive Lasten** (Relais, Magnetventile, Motoren): Bei Gleichstromlasten eine Freilaufdiode ergänzen.
- **230 V:** Netzspannung nie an einen Pin, ein Testboard oder ein ungeschütztes Modul legen. Netz-Aufbauten gehören in die Hand einer Elektrofachkraft.

## Testmethode in vier Schritten

1. **Auf dem Breadboard aufbauen**, bevor gelötet wird.
2. **Mit dem Multimeter prüfen:** Durchgang der Verbindungen, kein Kurzschluss zwischen 3V3 und GND, spannungsfrei.
3. **Ein Bauteil nach dem anderen anschließen** und testen, bevor das nächste folgt.
4. **ESPHome-Logs lesen**, wenn ein Bauteil nicht reagiert.

**Prüfung:** In Home Assistant wechselt „Testtaster“ beim Drücken auf „an“, und „Test-LED“ schaltet die LED ein.

## Häufige Probleme

| Symptom | Wahrscheinliche Ursache | Lösung |
|---|---|---|
| Die Platine startet nach einer Verdrahtung nicht mehr | Ein Bauteil zieht einen Konfigurationspin | GPIO4, 5, 8, 9 oder 15 abziehen oder den Pin wechseln |
| Eingang ändert sich von selbst | Schwebender Pin oder langes Kabel | Interner oder externer Pull-up, kürzeres Kabel |
| LED sehr schwach oder aus | Falsche Polung oder Widerstand zu groß | LED drehen, 220 bis 330 Ω testen |
| Instabile Analogwerte | Verrauschte Versorgung oder Nicht-ADC-Pin | GPIO0 bis GPIO6 nutzen, `median`-Filter ergänzen |
| Ein Bauteil ist heiß | Kurzschluss oder falsche Polung | Sofort abziehen und neu prüfen |

Zum Weiterlesen: [Platine flashen](/de/smart-home/esp32-esphome-flashen/) und [ohne Kabel aktualisieren](/de/smart-home/esphome-ota-updates/). Offizielle Dokumentation: [ESP32-C6-DevKitC-1, Espressif](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c6/esp32-c6-devkitc-1/user_guide.html).

<small>Aktualisiert am 30. Oktober 2026. Pinnummern Ihrer Platine vor jeder Verdrahtung prüfen.</small>
