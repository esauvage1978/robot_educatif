#!/usr/bin/env python3
"""Station météo BME280 sur Raspberry Pi avec historique SQLite.

Matériel : Raspberry Pi 4 ou 5 (Bookworm), module BME280 en I2C (0x77 ou 0x76 selon le module).
Dépendance (dans un venv) : adafruit-circuitpython-bme280.
Usage :
  python meteo_bme280_sqlite.py            -> enregistre une mesure toutes les INTERVAL secondes
  python meteo_bme280_sqlite.py --resume   -> min / max / moyenne par jour (7 derniers jours)
  python meteo_bme280_sqlite.py --csv      -> export CSV sur la sortie standard
Source : robot-educatif.info - tutoriel « Station météo BME280 avec historique ».
"""
import argparse
import csv
import os
import sqlite3
import sys
import time
from datetime import datetime, timezone

DB_PATH = os.getenv("DB_PATH", os.path.expanduser("~/meteo.db"))
INTERVAL = int(os.getenv("INTERVAL", "300"))           # 5 minutes
I2C_ADDR = int(os.getenv("BME280_ADDR", "0x77"), 16)    # mettre 0x76 si i2cdetect l'indique
ALTITUDE_M = float(os.getenv("ALTITUDE_M", "0"))        # altitude du lieu pour la pression mer

SCHEMA = """CREATE TABLE IF NOT EXISTS mesures (
    ts TEXT PRIMARY KEY,          -- horodatage ISO 8601 UTC
    temperature REAL,             -- °C
    humidite REAL,                -- %
    pression REAL                 -- hPa ramenée au niveau de la mer
)"""


def ouvrir_db():
    db = sqlite3.connect(DB_PATH)
    db.execute(SCHEMA)
    return db


def pression_niveau_mer(p_hpa, altitude_m):
    """Formule barométrique internationale (approximation standard)."""
    return p_hpa / (1 - altitude_m / 44330.0) ** 5.255


def enregistrer():
    import board
    from adafruit_bme280 import basic as adafruit_bme280

    capteur = adafruit_bme280.Adafruit_BME280_I2C(board.I2C(), address=I2C_ADDR)
    db = ouvrir_db()
    print(f"Enregistrement dans {DB_PATH} toutes les {INTERVAL} s", flush=True)
    while True:
        ts = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
        t = round(capteur.temperature, 2)
        h = round(capteur.relative_humidity, 1)
        p = round(pression_niveau_mer(capteur.pressure, ALTITUDE_M), 1)
        with db:                                   # commit automatique
            db.execute("INSERT OR REPLACE INTO mesures VALUES (?,?,?,?)", (ts, t, h, p))
        print(ts, t, "°C", h, "%", p, "hPa", flush=True)
        time.sleep(INTERVAL)


def resume():
    db = ouvrir_db()
    rows = db.execute("""SELECT substr(ts,1,10) AS jour,
               ROUND(MIN(temperature),1), ROUND(MAX(temperature),1), ROUND(AVG(temperature),1),
               ROUND(AVG(humidite),0), ROUND(AVG(pression),1), COUNT(*)
        FROM mesures GROUP BY jour ORDER BY jour DESC LIMIT 7""").fetchall()
    print("jour        tmin  tmax  tmoy  hum%  hPa     n")
    for r in rows:
        print("{}  {:>5} {:>5} {:>5} {:>4} {:>7} {:>4}".format(*r))


def export_csv():
    db = ouvrir_db()
    w = csv.writer(sys.stdout)
    w.writerow(["ts", "temperature", "humidite", "pression"])
    w.writerows(db.execute("SELECT * FROM mesures ORDER BY ts"))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--resume", action="store_true")
    ap.add_argument("--csv", action="store_true")
    a = ap.parse_args()
    if a.resume:
        resume()
    elif a.csv:
        export_csv()
    else:
        enregistrer()
